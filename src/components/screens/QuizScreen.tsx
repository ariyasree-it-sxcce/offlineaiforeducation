import React, { useState } from 'react';
import { ArrowLeft, Brain, Trophy, Check, X, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizScreenProps {
  onBack: () => void;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  chapter: string;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onBack }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const questions: Question[] = [
    {
      id: '1',
      question: 'What is the process by which plants make their own food using sunlight?',
      options: ['Respiration', 'Photosynthesis', 'Digestion', 'Transpiration'],
      correctAnswer: 1,
      chapter: 'Science - Ch. 1'
    },
    {
      id: '2',
      question: 'What is the value of π (pi) approximately equal to?',
      options: ['3.14', '2.14', '4.14', '1.14'],
      correctAnswer: 0,
      chapter: 'Mathematics - Ch. 2'
    },
    {
      id: '3',
      question: 'Which gas do plants release during photosynthesis?',
      options: ['Carbon Dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'],
      correctAnswer: 2,
      chapter: 'Science - Ch. 1'
    },
    {
      id: '4',
      question: 'What is the square root of 144?',
      options: ['10', '11', '12', '13'],
      correctAnswer: 2,
      chapter: 'Mathematics - Ch. 3'
    },
    {
      id: '5',
      question: 'Which part of the plant absorbs water from the soil?',
      options: ['Leaves', 'Stem', 'Roots', 'Flowers'],
      correctAnswer: 2,
      chapter: 'Science - Ch. 2'
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    const message = percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good Job!' : 'Keep Practicing!';

    return (
      <div className="h-full flex flex-col bg-background">
        <div className="px-4 py-3 bg-card border-b border-border flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-bold text-foreground">Quiz Results</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
            <Trophy className="w-12 h-12 text-secondary" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground">{message}</h2>
          
          <div className="mt-4 text-center">
            <p className="text-5xl font-bold text-primary">{score}/{questions.length}</p>
            <p className="text-muted-foreground mt-2">Questions Correct</p>
          </div>

          <div className="w-full mt-8 space-y-3">
            {questions.map((q, idx) => (
              <div 
                key={q.id}
                className={`p-3 rounded-xl flex items-center gap-3 ${
                  answers[idx] === q.correctAnswer ? 'bg-secondary/10' : 'bg-destructive/10'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  answers[idx] === q.correctAnswer ? 'bg-secondary text-white' : 'bg-destructive text-white'
                }`}>
                  {answers[idx] === q.correctAnswer ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Q{idx + 1}: {q.question.slice(0, 30)}...</p>
                  <p className="text-xs text-muted-foreground">{q.chapter}</p>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={resetQuiz} className="w-full mt-6 btn-large">
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="px-4 py-3 bg-card border-b border-border flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-bold text-foreground">Practice Quiz</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-24 h-24 bg-edu-orange/10 rounded-full flex items-center justify-center mb-6">
            <Brain className="w-12 h-12 text-edu-orange" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground text-center">Ready to Test Your Knowledge?</h2>
          <p className="text-muted-foreground text-center mt-2">
            Answer {questions.length} questions based on your syllabus
          </p>

          <div className="w-full mt-8 bg-muted rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Questions</span>
              <span className="font-medium text-foreground">{questions.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subjects</span>
              <span className="font-medium text-foreground">Science, Math</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Mode</span>
              <span className="font-medium text-secondary">Offline</span>
            </div>
          </div>

          <Button 
            onClick={() => setQuizStarted(true)} 
            className="w-full mt-6 btn-large bg-edu-orange hover:bg-edu-orange/90"
          >
            Start Quiz
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <span className="font-bold text-foreground">
            Question {currentQuestion + 1}/{questions.length}
          </span>
          <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
            <span className="font-bold text-secondary">{score}</span>
          </div>
        </div>
        <div className="progress-edu">
          <div className="progress-edu-fill bg-edu-orange" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-4 py-6 flex flex-col">
        <span className="text-xs text-muted-foreground mb-2">{question.chapter}</span>
        <h2 className="text-xl font-bold text-foreground mb-6">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === question.correctAnswer;
            const showCorrectness = selectedAnswer !== null;

            let bgClass = 'bg-card border-border';
            if (showCorrectness) {
              if (isCorrect) bgClass = 'bg-secondary/10 border-secondary';
              else if (isSelected) bgClass = 'bg-destructive/10 border-destructive';
            } else if (isSelected) {
              bgClass = 'bg-primary/10 border-primary';
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-2xl border-2 ${bgClass} text-left transition-all flex items-center gap-3`}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                  showCorrectness && isCorrect ? 'bg-secondary border-secondary text-white' :
                  showCorrectness && isSelected ? 'bg-destructive border-destructive text-white' :
                  'border-border text-muted-foreground'
                }`}>
                  {showCorrectness && isCorrect ? <Check className="w-4 h-4" /> :
                   showCorrectness && isSelected ? <X className="w-4 h-4" /> :
                   String.fromCharCode(65 + idx)}
                </div>
                <span className="font-medium text-foreground">{option}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
