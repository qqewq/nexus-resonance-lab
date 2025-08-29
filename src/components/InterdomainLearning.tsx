import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Network, Brain, Shuffle, Layers, Zap } from "lucide-react";

interface Domain {
  name: string;
  knowledge: number;
  connections: string[];
  color: string;
}

interface FoamState {
  psi: string;
  amplitude: number;
  phase: number;
  entanglement: number;
}

export const InterdomainLearning = () => {
  const [domains] = useState<Domain[]>([
    { name: "Медицина", knowledge: 78, connections: ["Биология", "Химия", "Физика"], color: "text-red-400" },
    { name: "Физика", knowledge: 85, connections: ["Математика", "Космос", "Материалы"], color: "text-blue-400" },
    { name: "Биология", knowledge: 72, connections: ["Медицина", "Химия", "Экология"], color: "text-green-400" },
    { name: "Химия", knowledge: 80, connections: ["Материалы", "Биология", "Медицина"], color: "text-yellow-400" },
    { name: "Космос", knowledge: 65, connections: ["Физика", "Материалы", "ИИ"], color: "text-purple-400" },
    { name: "Материалы", knowledge: 70, connections: ["Химия", "Физика", "Космос"], color: "text-orange-400" },
    { name: "ИИ", knowledge: 88, connections: ["Математика", "Космос", "Медицина"], color: "text-cyan-400" }
  ]);

  const [foamState, setFoamState] = useState<FoamState>({
    psi: "|Ψ_пена⟩",
    amplitude: 0.75,
    phase: 0,
    entanglement: 65
  });

  const [isLearning, setIsLearning] = useState(false);
  const [learningProgress, setLearningProgress] = useState(0);
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    // Анимация квантового состояния
    const interval = setInterval(() => {
      setFoamState(prev => ({
        ...prev,
        phase: (prev.phase + 0.1) % (2 * Math.PI),
        amplitude: 0.7 + 0.1 * Math.sin(prev.phase),
        entanglement: 60 + 10 * Math.sin(prev.phase * 0.5)
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const startInterdomainLearning = async () => {
    setIsLearning(true);
    setLearningProgress(0);
    setInsights([]);

    // Симуляция обучения
    const totalSteps = 100;
    for (let i = 0; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setLearningProgress(i);

      // Добавление инсайтов на определенных этапах
      if (i === 25) {
        setInsights(prev => [...prev, "Обнаружена связь между квантовой механикой и нейронными сетями"]);
      }
      if (i === 50) {
        setInsights(prev => [...prev, "Найдено применение материаловедения в медицинских имплантах"]);
      }
      if (i === 75) {
        setInsights(prev => [...prev, "Выявлена возможность использования космических технологий в биологии"]);
      }
      if (i === 100) {
        setInsights(prev => [...prev, "Создана новая междисциплинарная теория объединения домнов"]);
      }
    }

    setIsLearning(false);
  };

  const getConnectionStrength = (domain1: string, domain2: string) => {
    const connections = domains.find(d => d.name === domain1)?.connections || [];
    return connections.includes(domain2) ? 0.8 : 0.3;
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-secondary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 gradient-text">
          <Network className="h-6 w-6" />
          Междоменное обучение ("Пена разума")
        </CardTitle>
        <div className="text-sm text-muted-foreground math-formula">
          |Ψ<sub>пена</sub>⟩ = ∑ c<sub>i</sub> |ψ<sub>i</sub><sup>домен</sup>⟩ ⊗ |G<sub>общ</sub>⟩
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Квантовое состояние */}
        <Card className="bg-muted/20 border-primary/10">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <div className="text-lg font-mono quantum-wave">
                {foamState.psi}
              </div>
              <div className="text-sm text-muted-foreground">
                Амплитуда: {foamState.amplitude.toFixed(3)} | 
                Фаза: {foamState.phase.toFixed(2)} | 
                Запутанность: {foamState.entanglement.toFixed(1)}%
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full transition-all duration-100"
                  style={{ width: `${foamState.entanglement}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Домены знаний */}
        <div>
          <h3 className="text-lg font-semibold text-secondary mb-3">
            Домены знаний
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {domains.map((domain, index) => (
              <Card key={index} className="bg-muted/20 border-primary/5 hover:border-primary/20 transition-colors">
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Layers className={`h-4 w-4 ${domain.color}`} />
                      <span className="font-medium text-sm">{domain.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Знания: {domain.knowledge}%
                    </div>
                    <Progress value={domain.knowledge} className="h-1" />
                    <div className="flex flex-wrap gap-1">
                      {domain.connections.slice(0, 2).map((conn, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {conn}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Управление обучением */}
        <div className="flex gap-4">
          <Button 
            onClick={startInterdomainLearning}
            disabled={isLearning}
            variant="neural"
            size="lg"
          >
            {isLearning ? (
              <>
                <Brain className="h-4 w-4 animate-spin" />
                Обучение...
              </>
            ) : (
              <>
                <Shuffle className="h-4 w-4" />
                Запустить обучение
              </>
            )}
          </Button>
        </div>

        {/* Прогресс обучения */}
        {isLearning && (
          <Card className="bg-muted/20 border-accent/20">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Прогресс междоменного обучения</span>
                  <span className="text-sm text-muted-foreground">{learningProgress}%</span>
                </div>
                <Progress value={learningProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Инсайты */}
        {insights.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-accent mb-3">
              Полученные инсайты
            </h3>
            <div className="space-y-2">
              {insights.map((insight, index) => (
                <Card key={index} className="bg-accent/10 border-accent/20">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{insight}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Матрица связей */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-3">
            Матрица междоменных связей
          </h3>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 gap-1 text-xs">
              {/* Заголовки */}
              <div className="p-1"></div>
              {domains.map(domain => (
                <div key={domain.name} className="p-1 text-center font-medium">
                  {domain.name.slice(0, 3)}
                </div>
              ))}
              
              {/* Строки матрицы */}
              {domains.map(rowDomain => (
                <div key={rowDomain.name} className="contents">
                  <div className="p-1 font-medium">{rowDomain.name.slice(0, 3)}</div>
                  {domains.map(colDomain => {
                    const strength = getConnectionStrength(rowDomain.name, colDomain.name);
                    return (
                      <div 
                        key={`${rowDomain.name}-${colDomain.name}`}
                        className="p-1 text-center rounded"
                        style={{
                          backgroundColor: `hsl(var(--primary) / ${strength})`,
                          color: strength > 0.5 ? 'white' : 'hsl(var(--foreground))'
                        }}
                      >
                        {(strength * 100).toFixed(0)}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};