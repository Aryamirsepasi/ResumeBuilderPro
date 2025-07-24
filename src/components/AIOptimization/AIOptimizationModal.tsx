import React, { useState } from 'react';
import { Sparkles, X, Loader } from 'lucide-react';
import { useAI } from '../../contexts/AIContext';
import { useResume } from '../../contexts/ResumeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Mistral } from '@mistralai/mistralai';
import { resumeSchema } from '../../types/resume';
import { zodToJsonSchema } from 'zod-to-json-schema';

const AIOptimizationModal: React.FC = () => {
    const { isModalOpen, closeModal, apiKey, setApiKey } = useAI();
    const { state: resumeState, loadResume } = useResume();
    const { language } = useLanguage();

    const [jobDescription, setJobDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleOptimize = async () => {
        if (!jobDescription.trim()) {
            setError('Please provide a job description for optimization.');
            return;
        }

        const effectiveApiKey = apiKey || import.meta.env.VITE_MISTRAL_API_KEY;
        if (!effectiveApiKey) {
            setError(
                'Mistral API key is not provided. Please add it in the input or set it up for the application.'
            );
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
            const mistral = new Mistral({ apiKey: apiKey });
            const jsonSchema = zodToJsonSchema(resumeSchema, 'resumeSchema');

            const systemPrompt = `You are an expert resume optimizer for ATS (Applicant Tracking Systems). Your task is to refine the provided resume to be highly effective for a specific job description.
      The output must be a valid JSON object that strictly follows the provided JSON schema. Do not add any extra text, explanations, or markdown formatting outside of the JSON structure.
      Optimize the content in ${language === 'de' ? 'German' : 'English'
                }.
      - Rewrite the professional summary to align with the key requirements of the job description.
      - Refine work experience responsibilities and achievements to highlight relevant accomplishments using the STAR method.
      - Suggest relevant skills from the job description that the user might have.
      - Return only the JSON object of the complete, optimized resume.
      
      JSON Schema to follow:
      ---
      ${JSON.stringify(jsonSchema, null, 2)}
      ---
      `;

            const userPrompt = `
        Job Description:
        ---
        ${jobDescription}
        ---
        Current Resume Data (JSON):
        ---
        ${JSON.stringify(resumeState.resume)}
        ---
      `;

            // Call Mistral API directly from the browser
            const response = await mistral.chat.complete({
                model: 'mistral-large-latest',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt },
                ],
                responseFormat: { type: 'json_object' },
            });

            // Parse and validate the response
            const messageContent = response.choices[0].message.content;

            if (typeof messageContent !== 'string') {
                throw new Error('AI response is not in the expected format.');
            }

            const jsonContent = JSON.parse(messageContent);
            const optimizedResume = resumeSchema.parse(jsonContent);

            loadResume(optimizedResume);
            alert('Your resume has been optimized successfully!');
            closeModal();
        } catch (err: any) {
            console.error('Error optimizing resume with Mistral AI:', err);
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                        <h2 className="text-2xl font-bold text-gray-900">AI Resume Optimization</h2>
                    </div>
                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Description
                        </label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            rows={8}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            placeholder="Paste the job description here to tailor your resume..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Mistral API Key (optional)
                        </label>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Overrides the default server key"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            If you provide a key here, it will be used for this optimization request. Otherwise, the application's default key will be used.
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 text-sm">
                        {error}
                    </div>
                )}

                <div className="mt-8 flex justify-end space-x-4">
                    <button
                        onClick={closeModal}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleOptimize}
                        disabled={isLoading}
                        className="flex items-center justify-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-300"
                    >
                        {isLoading ? (
                            <>
                                <Loader className="w-5 h-5 animate-spin mr-2" />
                                Optimizing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5 mr-2" />
                                Optimize with AI
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIOptimizationModal;
