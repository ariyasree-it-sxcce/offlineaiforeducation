import React, { useState } from 'react';
import { GraduationCap, School, ChevronRight, Check } from 'lucide-react';
import { Board, Grade } from '@/types/app';
import { Button } from '@/components/ui/button';

interface BoardGradeScreenProps {
  onComplete: (board: Board, grade: Grade) => void;
  onBack: () => void;
}

const BoardGradeScreen: React.FC<BoardGradeScreenProps> = ({ onComplete, onBack }) => {
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);

  const boards = [
    { id: 'state' as Board, name: 'State Board', icon: School, description: 'Tamil Nadu State Board' },
    { id: 'cbse' as Board, name: 'CBSE', icon: GraduationCap, description: 'Central Board' },
  ];

  const grades: Grade[] = [6, 7, 8, 9, 10, 11, 12];

  const handleContinue = () => {
    if (selectedBoard && selectedGrade) {
      onComplete(selectedBoard, selectedGrade);
    }
  };

  return (
    <div className="h-full flex flex-col px-6 py-4">
      {/* Header */}
      <div className="text-center mt-2 mb-6">
        <h1 className="text-2xl font-bold text-foreground">Setup Your Profile</h1>
        <p className="text-muted-foreground mt-1">Select your board and class</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Board Selection */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Select Board
          </h2>
          <div className="space-y-3">
            {boards.map((board) => (
              <button
                key={board.id}
                onClick={() => setSelectedBoard(board.id)}
                className={`w-full selection-card flex items-center gap-4 ${
                  selectedBoard === board.id ? 'selected' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedBoard === board.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <board.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">{board.name}</p>
                  <p className="text-sm text-muted-foreground">{board.description}</p>
                </div>
                {selectedBoard === board.id && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grade Selection */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Select Class
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`py-4 rounded-xl font-semibold text-lg transition-all ${
                  selectedGrade === grade
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                    : 'bg-card border-2 border-border text-foreground hover:border-primary/30'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 pb-2 space-y-3">
        <Button
          onClick={handleContinue}
          disabled={!selectedBoard || !selectedGrade}
          className="w-full btn-large bg-primary hover:bg-primary/90 disabled:opacity-50"
        >
          Continue
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
        <button
          onClick={onBack}
          className="w-full py-3 text-muted-foreground font-medium"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BoardGradeScreen;
