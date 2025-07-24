import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';
import { Mistral } from '@mistralai/mistralai';
import { Resume, resumeSchema } from '../types/resume';
import { zodToJsonSchema } from 'zod-to-json-schema';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/**
 * Extracts raw text from a File object (PDF or DOCX).
 * @param file The file to extract text from.
 * @returns A promise that resolves with the extracted text.
 */
async function extractTextFromFile(file: File): Promise<string> {
    if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item: any) => item.str).join(' ');
        }
        return text;
    } else if (
        file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    } else {
        throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
    }
}

/**
 * Generates a JSON schema from our Zod validation schema to guide the AI.
 * @returns The JSON schema object.
 */
function getResumeJsonSchema() {
    return zodToJsonSchema(resumeSchema, 'resumeSchema');
}

/**
 * Parses a resume file using Mistral AI to structure the data.
 * @param file The resume file (PDF or DOCX).
 * @param apiKey The Mistral AI API key.
 * @returns A promise that resolves with the structured resume data.
 */
export async function parseResumeFile(
    file: File,
    apiKey: string,
): Promise<Partial<Resume>> {
    if (!apiKey) {
        throw new Error('Mistral API key is required for parsing.');
    }

    console.log('Extracting text from file...');
    const text = await extractTextFromFile(file);
    console.log('Text extracted successfully.');

    const mistral = new Mistral({ apiKey: apiKey });
    const jsonSchema = getResumeJsonSchema();

    const prompt = `
    You are an expert resume parser. Your task is to extract information from the
    following resume text and convert it into a structured JSON object.

    The JSON object MUST strictly conform to the following JSON schema:
    ${JSON.stringify(jsonSchema, null, 2)}

    Important Instructions:
    - Generate a unique string for all 'id' fields.
    - Format dates as 'YYYY-MM'. If only a year is present, use 'YYYY-01'.
    - For 'current' work experience, set 'current' to true and 'endDate' to an empty string.
    - Do not invent information. If a field is not present, omit it from the JSON object.
    - 'responsibilities' and 'achievements' should be arrays of strings, with each bullet point as a separate string.
    - 'technologies' for projects should be an array of strings.

    Resume Text:
    ---
    ${text}
    ---

    Now, provide the structured JSON object.
  `;

    console.log('Sending request to Mistral AI...');
    const response = await mistral.chat.complete({
        model: 'mistral-large-latest',
        responseFormat: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }],
    });
    console.log('AI response received.');

    const messageContent = response.choices[0].message.content;

    if (typeof messageContent !== 'string') {
        throw new Error('AI response is not in the expected format.');
    }

    const parsedJson = JSON.parse(messageContent);
    return parsedJson as Partial<Resume>;
}