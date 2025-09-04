import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Brain, Zap, Target, Atom, Network, Lightbulb, Play, Pause } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface Domain {
  id: string;
  name: string;
  knowledge_level: number;
  connections: string[];
  color: string;
  resonance_frequency: number;
  semantic_similarity: number;
  quantum_entanglement: number;
  coherence_factor: number;
  stability: number;
}

interface ResonancePoint {
  frequency: number;
  amplitude: number;
  domain_id: string;
  criticality: number;
  phase: number;
}

interface MindFoamState {
  psi: number;
  amplitude: number;
  phase: number;
  entanglement: number;
  coherence: number;
  depth: number;
  growth: number;
  timestamp: number;
}

export const AutoDomainSelection = () => {
  const { t } = useLanguage();
  const [targetGoal, setTargetGoal] = useState("");
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [resonancePoints, setResonancePoints] = useState<ResonancePoint[]>([]);
  const [mindFoamState, setMindFoamState] = useState<MindFoamState>({
    psi: 0.5,
    amplitude: 0.3,
    phase: 0,
    entanglement: 0.2,
    coherence: 0.4,
    depth: 1.2,
    growth: 0.1,
    timestamp: Date.now()
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState("");
  const [targetProbability, setTargetProbability] = useState([85]);
  const [maxDomains, setMaxDomains] = useState([5]);
  const [isSimulating, setIsSimulating] = useState(false);

  const ALL_DOMAINS: Omit<Domain, 'resonance_frequency' | 'semantic_similarity' | 'quantum_entanglement' | 'coherence_factor' | 'stability'>[] = [
    {
      id: "genetics",
      name: "Генетика",
      knowledge_level: 0.7,
      connections: ["medicine", "bioinformatics", "nanotechnology"],
      color: "#10B981"
    },
    {
      id: "nanotechnology", 
      name: "Нанотехнологии",
      knowledge_level: 0.6,
      connections: ["genetics", "materials", "ai"],
      color: "#3B82F6"
    },
    {
      id: "ai",
      name: "Искусственный интеллект",
      knowledge_level: 0.8,
      connections: ["bioinformatics", "quantum", "mathematics"],
      color: "#8B5CF6"
    },
    {
      id: "quantum",
      name: "Квантовая физика",
      knowledge_level: 0.5,
      connections: ["ai", "mathematics", "materials"],
      color: "#F59E0B"
    },
    {
      id: "bioinformatics",
      name: "Биоинформатика", 
      knowledge_level: 0.65,
      connections: ["genetics", "ai", "medicine"],
      color: "#EF4444"
    },
    {
      id: "mathematics",
      name: "Математика",
      knowledge_level: 0.9,
      connections: ["quantum", "ai", "materials"],
      color: "#06B6D4"
    },
    {
      id: "medicine",
      name: "Медицина",
      knowledge_level: 0.75,
      connections: ["genetics", "bioinformatics", "nanotechnology"],
      color: "#84CC16"
    },
    {
      id: "materials",
      name: "Материаловедение",
      knowledge_level: 0.55,
      connections: ["nanotechnology", "quantum", "mathematics"],
      color: "#F97316"
    }
  ];

  // Расчет резонансной частоты для домена
  const calculateResonanceFrequency = (domain: any, goal: string): number => {
    const base_frequency = 432; // Базовая частота
    const goal_vector = generateSemanticVector(goal);
    const domain_vector = generateSemanticVector(domain.name);
    const similarity = calculateCosineSimilarity(goal_vector, domain_vector);
    
    // Учет связей домена
    const connection_boost = domain.connections.length * 0.1;
    const knowledge_factor = domain.knowledge_level;
    
    return base_frequency * (1 + similarity * 2 + connection_boost + knowledge_factor);
  };

  // Генерация семантического вектора (упрощенная версия)
  const generateSemanticVector = (text: string): number[] => {
    const words = text.toLowerCase().split(/\s+/);
    const vector = new Array(100).fill(0);
    
    words.forEach((word, index) => {
      const hash = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      vector[hash % 100] = Math.sin(hash * 0.1) * Math.cos(index * 0.2);
    });
    
    return vector;
  };

  // Расчет косинусного сходства
  const calculateCosineSimilarity = (vec1: number[], vec2: number[]): number => {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const norm1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const norm2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    
    return norm1 && norm2 ? dotProduct / (norm1 * norm2) : 0;
  };

  // Расчет квантовой запутанности между доменами
  const calculateQuantumEntanglement = (domain1: Domain, domain2: Domain): number => {
    const shared_connections = domain1.connections.filter(conn => 
      domain2.connections.includes(conn)
    ).length;
    
    const knowledge_correlation = 1 - Math.abs(domain1.knowledge_level - domain2.knowledge_level);
    
    return (shared_connections * 0.3 + knowledge_correlation * 0.7) * Math.random() * 0.3 + 0.1;
  };

  // Расчет фактора когерентности
  const calculateCoherenceFactor = (domain: Domain, selectedDomains: Domain[]): number => {
    if (selectedDomains.length === 0) return 0.5;
    
    const avg_entanglement = selectedDomains.reduce((sum, selected) => 
      sum + calculateQuantumEntanglement(domain, selected), 0
    ) / selectedDomains.length;
    
    return Math.min(avg_entanglement * 2, 1.0);
  };

  // Расчет стабильности домена
  const calculateStability = (domain: Domain): number => {
    const base_stability = domain.knowledge_level * 0.6;
    const connection_stability = Math.min(domain.connections.length * 0.1, 0.4);
    const random_factor = Math.sin(Date.now() * 0.001) * 0.1;
    
    return Math.max(0.1, Math.min(1.0, base_stability + connection_stability + random_factor));
  };

  // Автоматический выбор доменов через резонансный анализ
  const autoSelectDomains = async (goal: string): Promise<Domain[]> => {
    if (!goal.trim()) return [];

    setAnalysisStep("Генерация семантических векторов...");
    await new Promise(resolve => setTimeout(resolve, 500));

    // Расчет резонансных параметров для каждого домена
    const domainsWithResonance: Domain[] = ALL_DOMAINS.map(domain => {
      const resonance_frequency = calculateResonanceFrequency(domain, goal);
      const semantic_similarity = calculateCosineSimilarity(
        generateSemanticVector(goal),
        generateSemanticVector(domain.name)
      );
      
      return {
        ...domain,
        resonance_frequency,
        semantic_similarity: Math.abs(semantic_similarity),
        quantum_entanglement: 0,
        coherence_factor: 0,
        stability: calculateStability(domain as Domain)
      };
    });

    setAnalysisStep("Расчет резонансных частот...");
    await new Promise(resolve => setTimeout(resolve, 400));

    // Сортировка по резонансной частоте и семантической близости
    const sorted = domainsWithResonance.sort((a, b) => {
      const scoreA = a.resonance_frequency * 0.6 + a.semantic_similarity * 1000 * 0.4;
      const scoreB = b.resonance_frequency * 0.6 + b.semantic_similarity * 1000 * 0.4;
      return scoreB - scoreA;
    });

    setAnalysisStep("Выбор оптимального подмножества доменов...");
    await new Promise(resolve => setTimeout(resolve, 300));

    // Выбор оптимального подмножества
    const selected: Domain[] = [];
    let current_probability = 0;
    const target_prob = targetProbability[0] / 100;

    for (const domain of sorted) {
      if (selected.length >= maxDomains[0]) break;
      if (current_probability >= target_prob) break;

      // Проверка этической совместимости (упрощенная)
      const ethical_compatible = domain.semantic_similarity > 0.1;
      
      if (ethical_compatible) {
        // Расчет квантовой запутанности с уже выбранными
        const quantum_entanglement = selected.length > 0 ? 
          selected.reduce((sum, sel) => sum + calculateQuantumEntanglement(domain, sel), 0) / selected.length : 0.2;
        
        const coherence_factor = calculateCoherenceFactor(domain, selected);
        
        const enhanced_domain = {
          ...domain,
          quantum_entanglement,
          coherence_factor
        };

        selected.push(enhanced_domain);
        
        // Обновление общей вероятности успеха
        const domain_contribution = domain.semantic_similarity * domain.stability;
        current_probability = 1 - (1 - current_probability) * (1 - domain_contribution);
      }
    }

    setAnalysisStep("Генерация резонансных точек...");
    await new Promise(resolve => setTimeout(resolve, 400));

    // Генерация резонансных точек
    const points: ResonancePoint[] = selected.map(domain => ({
      frequency: domain.resonance_frequency,
      amplitude: domain.semantic_similarity * domain.stability,
      domain_id: domain.id,
      criticality: domain.coherence_factor * domain.quantum_entanglement,
      phase: Math.random() * 2 * Math.PI
    }));

    setResonancePoints(points);
    return selected;
  };

  // Обработчик автоматического анализа
  const handleAutoAnalysis = async () => {
    if (!targetGoal.trim()) return;

    setIsAnalyzing(true);
    setAnalysisStep("Инициализация резонансного анализа...");
    
    const selected = await autoSelectDomains(targetGoal);
    setSelectedDomains(selected);
    setDomains(ALL_DOMAINS.map(d => ({ ...d, resonance_frequency: 0, semantic_similarity: 0, quantum_entanglement: 0, coherence_factor: 0, stability: 0 })));
    
    setIsAnalyzing(false);
    setAnalysisStep("");
  };

  // Симуляция эволюции "пены разума"
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setMindFoamState(prev => {
        const time = Date.now() * 0.001;
        const evolution_rate = 0.02;
        
        return {
          psi: 0.5 + 0.3 * Math.sin(time * 0.1) * (1 + prev.growth),
          amplitude: 0.3 + 0.2 * Math.cos(time * 0.15) * prev.coherence,
          phase: (prev.phase + 0.1) % (2 * Math.PI),
          entanglement: Math.max(0.1, Math.min(0.9, 
            prev.entanglement + evolution_rate * Math.sin(time * 0.2)
          )),
          coherence: Math.max(0.2, Math.min(0.95,
            prev.coherence + evolution_rate * Math.cos(time * 0.25)
          )),
          depth: Math.max(1.0, Math.min(3.0,
            prev.depth + evolution_rate * Math.sin(time * 0.3)
          )),
          growth: Math.max(0.05, Math.min(0.5,
            prev.growth + evolution_rate * 0.1 * Math.cos(time * 0.4)
          )),
          timestamp: Date.now()
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const getResonanceColor = (frequency: number) => {
    const normalized = (frequency - 400) / 400;
    if (normalized > 0.8) return "text-red-600";
    if (normalized > 0.5) return "text-yellow-600";
    if (normalized > 0.2) return "text-blue-600";
    return "text-green-600";
  };

  const getCriticalityColor = (criticality: number) => {
    if (criticality > 0.7) return "bg-red-100 text-red-800";
    if (criticality > 0.4) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Atom className="h-5 w-5 text-primary" />
            {t('autoDomains.title')}
          </CardTitle>
          <CardDescription>
            {t('autoDomains.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Целевая задача:</label>
            <textarea
              placeholder="Например: Увеличение продолжительности жизни человека через генетические модификации"
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value)}
              className="w-full p-3 border rounded-lg resize-none h-20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Целевая вероятность успеха: {targetProbability[0]}%
              </label>
              <Slider
                value={targetProbability}
                onValueChange={setTargetProbability}
                max={95}
                min={50}
                step={5}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Максимум доменов: {maxDomains[0]}
              </label>
              <Slider
                value={maxDomains}
                onValueChange={setMaxDomains}
                max={8}
                min={3}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <Button 
            onClick={handleAutoAnalysis}
            disabled={!targetGoal.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Zap className="mr-2 h-4 w-4 animate-spin" />
                Анализ...
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                Запустить резонансный анализ
              </>
            )}
          </Button>

          {isAnalyzing && (
            <Alert>
              <Brain className="h-4 w-4" />
              <AlertDescription>{analysisStep}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Текущее состояние "пены разума" */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              Квантовое состояние "пены разума"
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSimulating(!isSimulating)}
            >
              {isSimulating ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Пауза
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Симуляция
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-4 bg-secondary rounded-lg">
            <div className="text-lg font-mono">
              Ψ(t) = {mindFoamState.psi.toFixed(3)} × e^(i × {mindFoamState.phase.toFixed(2)})
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Квантовая волновая функция междоменного обучения
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {(mindFoamState.amplitude * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Амплитуда</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(mindFoamState.entanglement * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Запутанность</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {(mindFoamState.coherence * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Когерентность</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {mindFoamState.depth.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Глубина</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Выбранные домены */}
      {selectedDomains.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Автоматически выбранные домены
            </CardTitle>
            <CardDescription>
              Оптимальный набор доменов, отобранных алгоритмом резонансного анализа
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedDomains.map((domain, index) => (
                <div key={domain.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium" style={{ color: domain.color }}>
                      {domain.name}
                    </h3>
                    <Badge variant="secondary">#{index + 1}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Резонансная частота:</span>
                      <span className={getResonanceColor(domain.resonance_frequency)}>
                        {domain.resonance_frequency.toFixed(1)} Гц
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Семантическая близость:</span>
                      <span>{(domain.semantic_similarity * 100).toFixed(1)}%</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Квантовая запутанность:</span>
                      <span>{(domain.quantum_entanglement * 100).toFixed(1)}%</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Фактор когерентности:</span>
                      <span>{(domain.coherence_factor * 100).toFixed(1)}%</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Стабильность:</span>
                      <span>{(domain.stability * 100).toFixed(1)}%</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Связи:</div>
                    <div className="flex flex-wrap gap-1">
                      {domain.connections.map(conn => (
                        <Badge key={conn} variant="outline" className="text-xs">
                          {ALL_DOMAINS.find(d => d.id === conn)?.name || conn}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Резонансные точки */}
      {resonancePoints.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Критические резонансные точки
            </CardTitle>
            <CardDescription>
              Ключевые частоты для междоменного резонанса и знаниевых корреляций
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resonancePoints.map((point, index) => {
                const domain = selectedDomains.find(d => d.id === point.domain_id);
                return (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: domain?.color }}
                      />
                      <div>
                        <div className="font-medium">{domain?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {point.frequency.toFixed(1)} Гц, фаза: {point.phase.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm">Амплитуда: {(point.amplitude * 100).toFixed(1)}%</div>
                        <Progress value={point.amplitude * 100} className="w-20 h-2" />
                      </div>
                      
                      <Badge className={getCriticalityColor(point.criticality)}>
                        Критичность: {(point.criticality * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};