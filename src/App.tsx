import React from 'react';
import { ResumeProvider } from './contexts/ResumeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AIProvider } from './contexts/AIContext';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import AIOptimizationModal from './components/AIOptimization/AIOptimizationModal';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <ResumeProvider>
        <AIProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <MainContent />
            <AIOptimizationModal />
          </div>
        </AIProvider>
      </ResumeProvider>
    </LanguageProvider>
  );
}

export default App;
