import React from 'react';
import { 
  MessageCircle, 
  BookOpen, 
  Brain, 
  Download, 
  WifiOff, 
  HardDrive, 
  Cpu,
  Settings,
  Sparkles
} from 'lucide-react';
import { AIModel, Grade, Board } from '@/types/app';

interface HomeScreenProps {
  model: AIModel;
  grade: Grade;
  board: Board;
  onNavigate: (screen: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ model, grade, board, onNavigate }) => {
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const menuItems = [
    {
      id: 'chat',
      title: 'Ask Doubt',
      subtitle: 'Get instant answers offline',
      icon: MessageCircle,
      color: 'bg-primary',
      screen: 'chat'
    },
    {
      id: 'textbook',
      title: 'Study Textbook',
      subtitle: 'Read chapters & notes',
      icon: BookOpen,
      color: 'bg-secondary',
      screen: 'textbook'
    },
    {
      id: 'quiz',
      title: 'Practice Quiz',
      subtitle: 'Test your knowledge',
      icon: Brain,
      color: 'bg-edu-orange',
      screen: 'quiz'
    },
    {
      id: 'download',
      title: 'Update Content',
      subtitle: 'Download new chapters',
      icon: Download,
      color: 'bg-edu-purple',
      screen: 'download'
    },
  ];

  // Simulated storage/RAM values
  const storageUsed = 2.4;
  const storageTotal = 8;
  const ramUsed = 1.8;
  const ramTotal = 6;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 pt-2 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{getTimeGreeting()}!</h1>
            <p className="text-muted-foreground">
              Class {grade} • {board === 'cbse' ? 'CBSE' : 'State Board'}
            </p>
          </div>
          <button 
            onClick={() => onNavigate('settings')}
            className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Active Model Card */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-foreground">{model.name}</p>
                <span className="badge-offline">
                  <WifiOff className="w-3 h-3" />
                  Offline
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{model.modelName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.screen)}
              className="bg-card rounded-2xl p-4 text-left border border-border hover:border-primary/30 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-3`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{item.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Storage & RAM Indicators */}
      <div className="px-6 py-4 bg-muted/50 border-t border-border">
        <div className="space-y-3">
          {/* Storage */}
          <div className="flex items-center gap-3">
            <HardDrive className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Storage</span>
                <span className="font-medium text-foreground">{storageUsed} / {storageTotal} GB</span>
              </div>
              <div className="storage-bar">
                <div 
                  className="storage-fill" 
                  style={{ width: `${(storageUsed / storageTotal) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* RAM */}
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">RAM Usage</span>
                <span className="font-medium text-foreground">{ramUsed} / {ramTotal} GB</span>
              </div>
              <div className="ram-bar">
                <div 
                  className="ram-fill bg-secondary" 
                  style={{ width: `${(ramUsed / ramTotal) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
