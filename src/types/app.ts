export type Language = 'english' | 'tamil';

export type Board = 'state' | 'cbse';

export type Grade = 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface AIModel {
  id: 'ultra-lite' | 'balanced' | 'pro';
  name: string;
  modelName: string;
  minRam: number;
  maxRam: number;
  badge: string;
  description: string;
}

export interface AppState {
  language: Language | null;
  board: Board | null;
  grade: Grade | null;
  selectedModel: AIModel | null;
  detectedRam: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  chaptersCount: number;
}

export interface Chapter {
  id: string;
  name: string;
  subject: string;
  completed: boolean;
  progress: number;
}
