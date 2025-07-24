import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import Sidebar from '../Sidebar/Sidebar';
import Editor from '../Editor/Editor';
import Preview from '../Preview/Preview';

const MainContent: React.FC = () => {
  const { state } = useResume();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex overflow-hidden">
        {!state.isPreviewMode ? (
          <>
            <div className="flex-1 overflow-y-auto">
              <Editor />
            </div>
            <div className="w-1/2 border-l border-gray-200 bg-white">
              <Preview />
            </div>
          </>
        ) : (
          <div className="flex-1 bg-white">
            <Preview />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;