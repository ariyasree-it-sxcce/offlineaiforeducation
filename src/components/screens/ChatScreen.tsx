import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, WifiOff, Sparkles, BookOpen } from 'lucide-react';
import { AIModel, ChatMessage } from '@/types/app';

interface ChatScreenProps {
  model: AIModel;
  onBack: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ model, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your offline AI tutor. Ask me any question from your syllabus, and I'll help you understand it better. 📚",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (question: string) => {
    setIsTyping(true);
    
    // Simulate processing time
    setTimeout(() => {
      const responses: Record<string, string> = {
        default: "Based on your textbook, here's what I found:\n\nThis topic is covered in Chapter 3 of your syllabus. The key concept is that understanding the fundamentals helps you solve complex problems step by step.\n\nWould you like me to explain any specific part in more detail?",
        math: "Let me solve this step by step:\n\nStep 1: Identify the given values\nStep 2: Apply the formula\nStep 3: Calculate the result\n\nThe answer follows from your Class 10 Mathematics textbook, Chapter 2. Would you like more examples?",
        science: "According to your Science textbook:\n\nThis is an important concept from Chapter 5. The key points are:\n• First principle\n• Related formula\n• Real-world application\n\nShall I explain the underlying theory?"
      };

      const responseKey = question.toLowerCase().includes('math') ? 'math' : 
                         question.toLowerCase().includes('science') ? 'science' : 'default';

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responses[responseKey],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    simulateAIResponse(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "Explain photosynthesis",
    "Solve quadratic equations",
    "What is democracy?"
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
        <div className="flex-1">
          <h1 className="font-bold text-foreground">Ask Doubt</h1>
          <div className="flex items-center gap-1.5 text-xs text-secondary">
            <WifiOff className="w-3 h-3" />
            <span>Offline Mode Active</span>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-lg">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-xs font-medium text-primary">{model.name}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div
              className={`max-w-[80%] ${
                message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="chat-bubble-ai">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions (show only initially) */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="px-3 py-1.5 bg-muted rounded-full text-sm text-foreground hover:bg-muted/80"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 bg-card border-t border-border">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
            className="flex-1 px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Responses based on your syllabus only
        </p>
      </div>
    </div>
  );
};

export default ChatScreen;
