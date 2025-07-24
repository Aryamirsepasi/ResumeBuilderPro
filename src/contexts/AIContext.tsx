import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AIContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <AIContext.Provider value={{ isModalOpen, openModal, closeModal, apiKey, setApiKey }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
