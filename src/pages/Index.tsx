import React, { useState } from 'react';
import PhoneFrame from '@/components/PhoneFrame';
import SplashScreen from '@/components/screens/SplashScreen';
import LanguageScreen from '@/components/screens/LanguageScreen';
import BoardGradeScreen from '@/components/screens/BoardGradeScreen';
import ModelSelectionScreen from '@/components/screens/ModelSelectionScreen';
import HomeScreen from '@/components/screens/HomeScreen';
import ChatScreen from '@/components/screens/ChatScreen';
import TextbookScreen from '@/components/screens/TextbookScreen';
import QuizScreen from '@/components/screens/QuizScreen';
import SettingsScreen from '@/components/screens/SettingsScreen';
import { Language, Board, Grade, AIModel } from '@/types/app';

type Screen = 'splash' | 'language' | 'boardGrade' | 'modelSelection' | 'home' | 'chat' | 'textbook' | 'quiz' | 'settings' | 'download';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [language, setLanguage] = useState<Language>('english');
  const [board, setBoard] = useState<Board>('state');
  const [grade, setGrade] = useState<Grade>(10);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);

  const detectedRam = 6; // Simulated RAM detection

  const handleSplashComplete = () => {
    setCurrentScreen('language');
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setCurrentScreen('boardGrade');
  };

  const handleBoardGradeComplete = (selectedBoard: Board, selectedGrade: Grade) => {
    setBoard(selectedBoard);
    setGrade(selectedGrade);
    setCurrentScreen('modelSelection');
  };

  const handleModelSelect = (model: AIModel) => {
    setSelectedModel(model);
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      
      case 'language':
        return <LanguageScreen onSelect={handleLanguageSelect} />;
      
      case 'boardGrade':
        return (
          <BoardGradeScreen 
            onComplete={handleBoardGradeComplete}
            onBack={() => setCurrentScreen('language')}
          />
        );
      
      case 'modelSelection':
        return (
          <ModelSelectionScreen
            detectedRam={detectedRam}
            onSelect={handleModelSelect}
            onBack={() => setCurrentScreen('boardGrade')}
          />
        );
      
      case 'home':
        return (
          <HomeScreen
            model={selectedModel!}
            grade={grade}
            board={board}
            onNavigate={handleNavigate}
          />
        );
      
      case 'chat':
        return (
          <ChatScreen
            model={selectedModel!}
            onBack={() => setCurrentScreen('home')}
          />
        );
      
      case 'textbook':
        return (
          <TextbookScreen
            grade={grade}
            onBack={() => setCurrentScreen('home')}
          />
        );
      
      case 'quiz':
        return <QuizScreen onBack={() => setCurrentScreen('home')} />;
      
      case 'settings':
        return (
          <SettingsScreen
            language={language}
            grade={grade}
            board={board}
            model={selectedModel!}
            onBack={() => setCurrentScreen('home')}
          />
        );
      
      case 'download':
        return (
          <div className="h-full flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 bg-edu-purple/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">📥</span>
            </div>
            <h2 className="text-xl font-bold text-foreground">Content Updates</h2>
            <p className="text-muted-foreground mt-2">
              Connect to WiFi to download new chapters and updates
            </p>
            <button 
              onClick={() => setCurrentScreen('home')}
              className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold"
            >
              Go Back
            </button>
          </div>
        );
      
      default:
        return <SplashScreen onComplete={handleSplashComplete} />;
    }
  };

  return (
    <PhoneFrame>
      {renderScreen()}
    </PhoneFrame>
  );
};

export default Index;
