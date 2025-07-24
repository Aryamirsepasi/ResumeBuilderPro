import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import PersonalInfoForm from './forms/PersonalInfoForm';
import WorkExperienceForm from './forms/WorkExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import FinalizeForm from './forms/FinalizeForm';

const Editor: React.FC = () => {
  const { state } = useResume();

  const renderCurrentForm = () => {
    switch (state.currentStep) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <WorkExperienceForm />;
      case 2:
        return <EducationForm />;
      case 3:
        return <SkillsForm />;
      case 4:
        return <ProjectsForm />;
      case 5:
        return <FinalizeForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {renderCurrentForm()}
      </div>
    </div>
  );
};

export default Editor;