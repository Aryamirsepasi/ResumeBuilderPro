import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

const Preview: React.FC = () => {
  const { state } = useResume();
  const { language } = useLanguage();

  const renderTemplate = () => {
    const props = { resume: state.resume, language };

    switch (state.resume.selectedTemplate) {
      case 'classic':
        return <ClassicTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'minimal':
        return <MinimalTemplate {...props} />;
      default:
        return <ModernTemplate {...props} />;
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div
          id="resume-preview-content"
          className="bg-white shadow-lg rounded-lg overflow-hidden min-h-[11in]"
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default Preview;