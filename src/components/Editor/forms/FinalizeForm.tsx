import React from 'react';
import { Download, Eye, Palette, Sparkles } from 'lucide-react';
import { useResume } from '../../../contexts/ResumeContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAI } from '../../../contexts/AIContext';

const templates = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
  { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
  { id: 'creative', name: 'Creative', description: 'Stand out with unique styling' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant design' }
];

const FinalizeForm: React.FC = () => {
  const { state, setTemplate, togglePreview } = useResume();
  const { t, language } = useLanguage();
  const { openModal } = useAI();

  const handleDownload = () => {
    alert(`Downloading ${language === 'de' ? 'German' : 'English'} resume as PDF...`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Finalize Your Resume</h2>

      {/* Template Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Template</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => setTemplate(template.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                state.resume.selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-16 bg-gray-100 rounded border flex items-center justify-center">
                  <Palette className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t(`templates.${template.id.toLowerCase()}`)}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Language Format Info */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Format</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            {language === 'de' 
              ? 'Your resume will be formatted according to German CV (Lebenslauf) standards with appropriate cultural conventions.'
              : 'Your resume will be formatted according to American resume standards with ATS optimization.'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={togglePreview}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Eye className="w-5 h-5" />
          <span>{state.isPreviewMode ? 'Edit Mode' : 'Full Preview'}</span>
        </button>

        <button
          onClick={openModal}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          <span>AI Optimize</span>
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>{t('button.download')}</span>
        </button>
      </div>

      {/* Resume Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{state.resume.workExperience.length}</div>
          <div className="text-sm text-gray-600">Work Experiences</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{state.resume.skills.length}</div>
          <div className="text-sm text-gray-600">Skills</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{state.resume.projects.length}</div>
          <div className="text-sm text-gray-600">Projects</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{state.resume.certifications.length}</div>
          <div className="text-sm text-gray-600">Certifications</div>
        </div>
      </div>
    </div>
  );
};

export default FinalizeForm;
