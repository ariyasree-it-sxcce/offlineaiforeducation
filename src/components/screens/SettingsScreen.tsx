import React from 'react';
import { 
  ArrowLeft, 
  Languages, 
  GraduationCap, 
  Cpu, 
  HardDrive, 
  Info, 
  ChevronRight,
  WifiOff
} from 'lucide-react';
import { AIModel, Grade, Board, Language } from '@/types/app';

interface SettingsScreenProps {
  language: Language;
  grade: Grade;
  board: Board;
  model: AIModel;
  onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ 
  language, 
  grade, 
  board, 
  model, 
  onBack 
}) => {
  const storageUsed = 2.4;
  const storageTotal = 8;

  const settings = [
    {
      id: 'language',
      icon: Languages,
      title: 'Language',
      value: language === 'english' ? 'English' : 'தமிழ்',
      color: 'bg-primary'
    },
    {
      id: 'grade',
      icon: GraduationCap,
      title: 'Class & Board',
      value: `Class ${grade} • ${board === 'cbse' ? 'CBSE' : 'State Board'}`,
      color: 'bg-secondary'
    },
    {
      id: 'model',
      icon: Cpu,
      title: 'AI Model',
      value: model.name,
      color: 'bg-edu-orange'
    },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 py-3 bg-card border-b border-border flex items-center gap-3">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="font-bold text-foreground">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Settings List */}
        <div className="px-4 py-4 space-y-3">
          {settings.map((setting) => (
            <button
              key={setting.id}
              className="w-full bg-card rounded-2xl p-4 border border-border flex items-center gap-4 text-left"
            >
              <div className={`w-12 h-12 ${setting.color} rounded-xl flex items-center justify-center`}>
                <setting.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{setting.title}</p>
                <p className="text-sm text-muted-foreground truncate">{setting.value}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Storage Usage */}
        <div className="px-4 py-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Storage
          </h2>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Content Storage</p>
                <p className="text-sm text-muted-foreground">
                  {storageUsed} GB of {storageTotal} GB used
                </p>
              </div>
            </div>
            <div className="storage-bar h-3">
              <div 
                className="storage-fill" 
                style={{ width: `${(storageUsed / storageTotal) * 100}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                Textbooks: 1.8 GB
              </span>
              <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                AI Model: 0.6 GB
              </span>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="px-4 py-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            About
          </h2>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                <Info className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Offline Assistant AI</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Version 1.0.0
                </p>
                <div className="mt-3 p-3 bg-secondary/10 rounded-xl">
                  <div className="flex items-center gap-2 text-secondary">
                    <WifiOff className="w-4 h-4" />
                    <span className="text-sm font-medium">100% Offline</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    This app uses On-Device RAG (Retrieval-Augmented Generation) to provide 
                    syllabus-focused answers without internet or servers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Made for students in rural India 🇮🇳
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            No login required • No data collection
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
