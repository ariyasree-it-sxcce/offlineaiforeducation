import React, { useState } from 'react';
import { Cpu, Zap, Rocket, Star, Check, ChevronRight, HardDrive } from 'lucide-react';
import { AIModel } from '@/types/app';
import { Button } from '@/components/ui/button';

interface ModelSelectionScreenProps {
  detectedRam: number;
  onSelect: (model: AIModel) => void;
  onBack: () => void;
}

const ModelSelectionScreen: React.FC<ModelSelectionScreenProps> = ({ 
  detectedRam, 
  onSelect, 
  onBack 
}) => {
  const models: AIModel[] = [
    {
      id: 'ultra-lite',
      name: 'Ultra-Lite Tutor',
      modelName: 'LLaMA-3.2-1B (3-bit)',
      minRam: 2,
      maxRam: 4,
      badge: 'Low RAM Optimized',
      description: 'Fast responses, works on all devices'
    },
    {
      id: 'balanced',
      name: 'Balanced Tutor',
      modelName: 'Phi-3.5-Mini (4-bit)',
      minRam: 5,
      maxRam: 8,
      badge: 'Best Balance',
      description: 'Good accuracy with reasonable speed'
    },
    {
      id: 'pro',
      name: 'Pro Tutor',
      modelName: 'LLaMA-3.1-8B (4-bit)',
      minRam: 10,
      maxRam: 16,
      badge: 'High Accuracy',
      description: 'Most accurate answers for complex topics'
    },
  ];

  const getRecommendedModel = () => {
    if (detectedRam <= 4) return 'ultra-lite';
    if (detectedRam <= 8) return 'balanced';
    return 'pro';
  };

  const recommendedId = getRecommendedModel();
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(
    models.find(m => m.id === recommendedId) || null
  );

  const getModelIcon = (id: string) => {
    switch (id) {
      case 'ultra-lite': return Zap;
      case 'balanced': return Cpu;
      case 'pro': return Rocket;
      default: return Cpu;
    }
  };

  const getRamColor = (model: AIModel) => {
    if (detectedRam >= model.minRam) return 'text-secondary';
    return 'text-ram-low';
  };

  const isModelCompatible = (model: AIModel) => {
    return detectedRam >= model.minRam;
  };

  return (
    <div className="h-full flex flex-col px-6 py-4">
      {/* Header */}
      <div className="text-center mt-2 mb-4">
        <h1 className="text-2xl font-bold text-foreground">Choose Your AI Tutor</h1>
        <p className="text-muted-foreground mt-1">Select the best model for your device</p>
      </div>

      {/* RAM Detection */}
      <div className="bg-muted rounded-2xl p-4 mb-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <HardDrive className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Detected RAM</p>
          <p className="text-lg font-bold text-foreground">{detectedRam} GB</p>
        </div>
        <div className="badge-offline">
          <Check className="w-3 h-3" />
          Auto-detected
        </div>
      </div>

      {/* Model Cards */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {models.map((model) => {
          const Icon = getModelIcon(model.id);
          const isRecommended = model.id === recommendedId;
          const isSelected = selectedModel?.id === model.id;
          const compatible = isModelCompatible(model);

          return (
            <button
              key={model.id}
              onClick={() => compatible && setSelectedModel(model)}
              disabled={!compatible}
              className={`w-full model-card text-left transition-all ${
                isRecommended ? 'recommended' : ''
              } ${isSelected ? 'selected ring-2 ring-primary' : ''} ${
                !compatible ? 'opacity-50' : ''
              }`}
            >
              {/* Recommended Badge */}
              {isRecommended && (
                <div className="flex items-center gap-1 text-secondary text-xs font-semibold mb-2">
                  <Star className="w-3 h-3 fill-current" />
                  Recommended for your device
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-foreground">{model.name}</h3>
                    <span className={`badge-ram ${
                      model.id === 'ultra-lite' ? 'bg-edu-green-light text-edu-green' :
                      model.id === 'balanced' ? 'bg-edu-blue-light text-edu-blue' :
                      'bg-edu-purple-light text-edu-purple'
                    }`}>
                      {model.badge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{model.modelName}</p>
                  <p className="text-sm text-muted-foreground mt-1">{model.description}</p>
                  <p className={`text-xs mt-2 font-medium ${getRamColor(model)}`}>
                    Requires {model.minRam}+ GB RAM
                  </p>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Offline Note */}
      <div className="py-3 text-center">
        <p className="text-sm text-muted-foreground">
          ✨ Model runs fully offline on your device
        </p>
      </div>

      {/* Footer */}
      <div className="pt-2 pb-2 space-y-3">
        <Button
          onClick={() => selectedModel && onSelect(selectedModel)}
          disabled={!selectedModel}
          className="w-full btn-large bg-primary hover:bg-primary/90"
        >
          Start Learning
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

export default ModelSelectionScreen;
