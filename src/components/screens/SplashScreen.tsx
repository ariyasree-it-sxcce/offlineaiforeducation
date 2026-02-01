import React, { useEffect } from 'react';
import { BookOpen, Sparkles, WifiOff } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 bg-gradient-to-b from-primary/5 to-background">
      {/* App Icon */}
      <div 
        className="relative animate-fade-in-up"
        style={{ animationDelay: '0.1s' }}
      >
        <div className="w-28 h-28 bg-primary rounded-3xl flex items-center justify-center shadow-lg shadow-primary/30">
          <BookOpen className="w-14 h-14 text-primary-foreground" />
        </div>
        <div className="absolute -right-2 -top-2 w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shadow-md">
          <Sparkles className="w-5 h-5 text-secondary-foreground" />
        </div>
      </div>

      {/* App Name */}
      <h1 
        className="mt-8 text-2xl font-bold text-foreground animate-fade-in-up"
        style={{ animationDelay: '0.3s' }}
      >
        Offline Assistant AI
      </h1>

      {/* Tagline */}
      <p 
        className="mt-3 text-muted-foreground text-center text-lg animate-fade-in-up"
        style={{ animationDelay: '0.5s' }}
      >
        Learn Anytime, Without Internet
      </p>

      {/* Offline indicator */}
      <div 
        className="mt-8 flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full animate-fade-in-up"
        style={{ animationDelay: '0.7s' }}
      >
        <WifiOff className="w-4 h-4 text-secondary" />
        <span className="text-sm font-medium text-secondary">100% Offline</span>
      </div>

      {/* Loading dots */}
      <div 
        className="mt-12 flex gap-2 animate-fade-in-up"
        style={{ animationDelay: '0.9s' }}
      >
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
};

export default SplashScreen;
