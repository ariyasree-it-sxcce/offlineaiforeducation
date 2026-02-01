import React, { useState } from 'react';
import { ArrowLeft, Search, BookOpen, ChevronRight, Check, FileText } from 'lucide-react';
import { Grade } from '@/types/app';

interface TextbookScreenProps {
  grade: Grade;
  onBack: () => void;
}

interface Subject {
  id: string;
  name: string;
  chapters: Chapter[];
  color: string;
}

interface Chapter {
  id: string;
  name: string;
  pages: number;
  completed: boolean;
}

const TextbookScreen: React.FC<TextbookScreenProps> = ({ grade, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects: Subject[] = [
    {
      id: 'math',
      name: 'Mathematics',
      color: 'bg-primary',
      chapters: [
        { id: '1', name: 'Real Numbers', pages: 24, completed: true },
        { id: '2', name: 'Polynomials', pages: 18, completed: true },
        { id: '3', name: 'Pair of Linear Equations', pages: 32, completed: false },
        { id: '4', name: 'Quadratic Equations', pages: 28, completed: false },
        { id: '5', name: 'Arithmetic Progressions', pages: 22, completed: false },
      ]
    },
    {
      id: 'science',
      name: 'Science',
      color: 'bg-secondary',
      chapters: [
        { id: '1', name: 'Chemical Reactions', pages: 20, completed: true },
        { id: '2', name: 'Acids, Bases & Salts', pages: 26, completed: false },
        { id: '3', name: 'Metals & Non-metals', pages: 24, completed: false },
        { id: '4', name: 'Carbon Compounds', pages: 30, completed: false },
      ]
    },
    {
      id: 'social',
      name: 'Social Science',
      color: 'bg-edu-orange',
      chapters: [
        { id: '1', name: 'Rise of Nationalism', pages: 28, completed: false },
        { id: '2', name: 'Nationalism in India', pages: 32, completed: false },
        { id: '3', name: 'Making of Global World', pages: 24, completed: false },
      ]
    },
    {
      id: 'english',
      name: 'English',
      color: 'bg-edu-purple',
      chapters: [
        { id: '1', name: 'A Letter to God', pages: 12, completed: true },
        { id: '2', name: 'Nelson Mandela', pages: 16, completed: false },
        { id: '3', name: 'Two Stories about Flying', pages: 14, completed: false },
      ]
    }
  ];

  const currentSubject = subjects.find(s => s.id === selectedSubject);

  const filteredChapters = currentSubject?.chapters.filter(
    ch => ch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedSubject && currentSubject) {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <div className="px-4 py-3 bg-card border-b border-border">
          <div className="flex items-center gap-3 mb-3">
            <button 
              onClick={() => setSelectedSubject(null)}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="font-bold text-foreground">{currentSubject.name}</h1>
              <p className="text-sm text-muted-foreground">Class {grade}</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters..."
              className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Chapters */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {filteredChapters?.map((chapter, index) => (
            <button
              key={chapter.id}
              className="w-full bg-card rounded-2xl p-4 border border-border hover:border-primary/30 transition-all text-left flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl ${currentSubject.color} flex items-center justify-center text-white font-bold`}>
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{chapter.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <FileText className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{chapter.pages} pages</span>
                  {chapter.completed && (
                    <span className="flex items-center gap-1 text-xs text-secondary font-medium">
                      <Check className="w-3 h-3" />
                      Completed
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    );
  }

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
        <div className="flex-1">
          <h1 className="font-bold text-foreground">Study Textbook</h1>
          <p className="text-sm text-muted-foreground">Class {grade} • Select a subject</p>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {subjects.map((subject) => {
            const completedCount = subject.chapters.filter(c => c.completed).length;
            const progress = (completedCount / subject.chapters.length) * 100;

            return (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className="bg-card rounded-2xl p-4 border border-border hover:border-primary/30 transition-all text-left"
              >
                <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center mb-3`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-foreground">{subject.name}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {subject.chapters.length} chapters
                </p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{Math.round(progress)}%</span>
                  </div>
                  <div className="progress-edu">
                    <div className="progress-edu-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TextbookScreen;
