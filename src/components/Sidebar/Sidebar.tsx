import React, { useState } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  FolderOpen,
  Eye,
  Upload,
  Download,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAI } from '../../contexts/AIContext';
import { parseResumeFile } from '../../services/resumeParser';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from '../Preview/templates/pdf/PDFDocument';

const steps = [
  { id: 0, key: 'personal', icon: User },
  { id: 1, key: 'experience', icon: Briefcase },
  { id: 2, key: 'education', icon: GraduationCap },
  { id: 3, key: 'skills', icon: Award },
  { id: 4, key: 'projects', icon: FolderOpen },
  { id: 5, key: 'finalize', icon: Code },
];

const Sidebar: React.FC = () => {
  const { state, setStep, togglePreview, loadResume } = useResume();
  const { t, language } = useLanguage();
  const { apiKey, openModal } = useAI();
  const [isParsing, setIsParsing] = useState(false);

  const handleUploadResume = () => {
    if (!apiKey) {
      alert(
        'Please set your Mistral API key first. You can add it in the AI Customize section.',
      );
      openModal();
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.docx';
    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        setIsParsing(true);
        try {
          const parsedData = await parseResumeFile(file, apiKey);
          loadResume(parsedData);
          alert('Resume parsed successfully! The fields have been populated.');
          setStep(0);
        } catch (error) {
          console.error('Failed to parse resume:', error);
          const errorMessage =
            typeof error === 'object' && error !== null && 'message' in error
              ? (error as { message: string }).message
              : String(error);
          alert(`Error parsing resume: ${errorMessage}`);
        } finally {
          setIsParsing(false);
        }
      }
    };
    input.click();
  };

  const handleAICustomize = () => {
    openModal();
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Resume Sections
        </h2>
        <div className="space-y-2 mb-6">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = state.currentStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setStep(step.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}
                />
                <span className="font-medium">{t(`steps.${step.key}`)}</span>
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          <button
            onClick={handleUploadResume}
            disabled={isParsing}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isParsing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm font-medium">Parsing...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {t('button.upload')}
                </span>
              </>
            )}
          </button>
          <button
            onClick={handleAICustomize}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{t('button.customize')}</span>
          </button>
        </div>
      </div>
      <div className="flex-1 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Quick Actions
        </h3>
        <div className="space-y-2">
          <button
            onClick={togglePreview}
            className="w-full flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm">
              {state.isPreviewMode ? 'Edit Mode' : t('nav.preview')}
            </span>
          </button>

          <PDFDownloadLink
            document={
              <PDFDocument resume={state.resume} language={language} />
            }
            fileName={`${state.resume.personalInfo.firstName}_${state.resume.personalInfo.lastName}_Resume.pdf`}
            className="w-full flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {({ loading }) =>
              loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span className="text-sm">{t('button.download')}</span>
                </>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;