import React from 'react';
import { Languages, ChevronRight } from 'lucide-react';
import { Language } from '@/types/app';

interface LanguageScreenProps {
  onSelect: (language: Language) => void;
}

const LanguageScreen: React.FC<LanguageScreenProps> = ({ onSelect }) => {
  const languages = [
    { id: 'english' as Language, name: 'English', native: 'English', icon: '🇬🇧' },
    { id: 'tamil' as Language, name: 'Tamil', native: 'தமிழ்', icon: '🇮🇳' },
  ];

  return (
    <div className="h-full flex flex-col px-6 py-4">
      {/* Header */}
      <div className="text-center mt-4 mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
          <Languages className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Choose Language</h1>
        <p className="text-muted-foreground mt-2">Select your preferred language</p>
      </div>

      {/* Language Options */}
      <div className="flex-1 space-y-4">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onSelect(lang.id)}
            className="w-full selection-card flex items-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <span className="text-4xl">{lang.icon}</span>
            <div className="flex-1 text-left">
              <p className="text-lg font-semibold text-foreground">{lang.name}</p>
              <p className="text-muted-foreground">{lang.native}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="py-4 text-center">
        <p className="text-sm text-muted-foreground">You can change this later in settings</p>
      </div>
    </div>
  );
};

export default LanguageScreen;
