import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, Brain, CheckCircle, AlertCircle, Zap } from "lucide-react";

interface Hypothesis {
  id: string;
  text: string;
  confidence: number;
  domain: string;
  ethicalScore: number;
  resonanceAlignment: number;
  pathToSolution: string[];
}

export const HypothesisGenerator = () => {
  const [problem, setProblem] = useState("");
  const [hypotheses, setHypotheses] = useState<Hypothesis[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const domains = [
    "Медицина", "Физика", "Космические технологии", 
    "Материаловедение", "Биология", "Химия", "ИИ"
  ];

  const generateHypotheses = async () => {
    if (!problem.trim()) return;
    
    setIsGenerating(true);
    
    // Симуляция ИИ-генерации гипотез
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const generatedHypotheses: Hypothesis[] = [
      {
        id: "1",
        text: "Применение квантовых эффектов для создания новых лекарственных препаратов с улучшенной биодоступностью",
        confidence: 87,
        domain: "Медицина",
        ethicalScore: 95,
        resonanceAlignment: 92,
        pathToSolution: [
          "Анализ квантовых свойств молекул",
          "Моделирование взаимодействий с биологическими системами",
          "Оптимизация структуры препарата",
          "Испытания на клеточных культурах",
          "Доклинические исследования"
        ]
      },
      {
        id: "2", 
        text: "Разработка биомиметических материалов на основе фрактальных структур для космических применений",
        confidence: 79,
        domain: "Космические технологии",
        ethicalScore: 88,
        resonanceAlignment: 85,
        pathToSolution: [
          "Изучение природных фрактальных структур",
          "Математическое моделирование",
          "Синтез прототипов материалов",
          "Тестирование в космических условиях",
          "Масштабирование производства"
        ]
      },
      {
        id: "3",
        text: "Междоменный подход к лечению нейродегенеративных заболеваний через физику плазмы",
        confidence: 72,
        domain: "Физика",
        ethicalScore: 91,
        resonanceAlignment: 78,
        pathToSolution: [
          "Анализ плазменных процессов в нервной ткани",
          "Разработка неинвазивных методов воздействия",
          "Компьютерное моделирование эффектов",
          "Эксперименты на животных моделях",
          "Клинические исследования"
        ]
      }
    ];

    setHypotheses(generatedHypotheses);
    setIsGenerating(false);
  };

  const toggleDomain = (domain: string) => {
    setSelectedDomains(prev => 
      prev.includes(domain) 
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-accent";
    if (score >= 70) return "text-primary";
    if (score >= 50) return "text-yellow-400";
    return "text-destructive";
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-secondary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 gradient-text">
          <Lightbulb className="h-6 w-6" />
          Генератор научных гипотез
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Гибридная архитектура RL + GAN + Transformer
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium text-primary mb-2 block">
            Описание научной проблемы
          </label>
          <Textarea
            placeholder="Опишите проблему, которую нужно решить..."
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-primary mb-2 block">
            Домены для анализа
          </label>
          <div className="flex flex-wrap gap-2">
            {domains.map(domain => (
              <Badge
                key={domain}
                variant={selectedDomains.includes(domain) ? "default" : "outline"}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => toggleDomain(domain)}
              >
                {domain}
              </Badge>
            ))}
          </div>
        </div>

        <Button 
          onClick={generateHypotheses}
          disabled={isGenerating || !problem.trim()}
          variant="neural"
          size="lg"
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Brain className="h-4 w-4 animate-spin" />
              Генерация гипотез...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              Сгенерировать гипотезы
            </>
          )}
        </Button>

        {hypotheses.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">
              Сгенерированные гипотезы
            </h3>
            
            {hypotheses.map((hypothesis) => (
              <Card key={hypothesis.id} className="bg-muted/30 border-accent/20">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">
                          {hypothesis.domain}
                        </Badge>
                        <p className="text-foreground leading-relaxed">
                          {hypothesis.text}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <CheckCircle className="h-3 w-3 text-accent" />
                          <span className="text-muted-foreground">Уверенность</span>
                        </div>
                        <div className={`font-semibold ${getScoreColor(hypothesis.confidence)}`}>
                          {hypothesis.confidence}%
                        </div>
                        <Progress value={hypothesis.confidence} className="h-1 mt-1" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <AlertCircle className="h-3 w-3 text-primary" />
                          <span className="text-muted-foreground">Этичность</span>
                        </div>
                        <div className={`font-semibold ${getScoreColor(hypothesis.ethicalScore)}`}>
                          {hypothesis.ethicalScore}%
                        </div>
                        <Progress value={hypothesis.ethicalScore} className="h-1 mt-1" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Zap className="h-3 w-3 text-secondary" />
                          <span className="text-muted-foreground">Резонанс</span>
                        </div>
                        <div className={`font-semibold ${getScoreColor(hypothesis.resonanceAlignment)}`}>
                          {hypothesis.resonanceAlignment}%
                        </div>
                        <Progress value={hypothesis.resonanceAlignment} className="h-1 mt-1" />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2">
                        Путь к решению:
                      </h4>
                      <ol className="space-y-1 text-sm text-muted-foreground">
                        {hypothesis.pathToSolution.map((step, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-accent font-mono text-xs mt-0.5">
                              {index + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};