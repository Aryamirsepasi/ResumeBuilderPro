import React from 'react';
import { Resume } from '../../../../types/resume';
import ModernTemplatePDF from './ModernTemplatePDF';
import ClassicTemplatePDF from './ClassicTemplatePDF';
import CreativeTemplatePDF from './CreativeTemplatePDF';
import MinimalTemplatePDF from './MinimalTemplatePDF';

interface PDFDocumentProps {
  resume: Resume;
  language: 'en' | 'de';
}

const PDFDocument: React.FC<PDFDocumentProps> = ({ resume, language }) => {
  const props = { resume, language };

  switch (resume.selectedTemplate) {
    case 'classic':
      return <ClassicTemplatePDF {...props} />;
    case 'creative':
      return <CreativeTemplatePDF {...props} />;
    case 'minimal':
      return <MinimalTemplatePDF {...props} />;
    default:
      return <ModernTemplatePDF {...props} />;
  }
};

export default PDFDocument;