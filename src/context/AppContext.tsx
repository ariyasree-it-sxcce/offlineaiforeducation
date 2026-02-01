import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, Language, Board, Grade, AIModel } from '@/types/app';

interface AppContextType {
  state: AppState;
  setLanguage: (lang: Language) => void;
  setBoard: (board: Board) => void;
  setGrade: (grade: Grade) => void;
  setSelectedModel: (model: AIModel) => void;
}

const defaultState: AppState = {
  language: null,
  board: null,
  grade: null,
  selectedModel: null,
  detectedRam: 6, // Simulated 6GB RAM
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(defaultState);

  const setLanguage = (language: Language) => {
    setState(prev => ({ ...prev, language }));
  };

  const setBoard = (board: Board) => {
    setState(prev => ({ ...prev, board }));
  };

  const setGrade = (grade: Grade) => {
    setState(prev => ({ ...prev, grade }));
  };

  const setSelectedModel = (selectedModel: AIModel) => {
    setState(prev => ({ ...prev, selectedModel }));
  };

  return (
    <AppContext.Provider value={{ state, setLanguage, setBoard, setGrade, setSelectedModel }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
