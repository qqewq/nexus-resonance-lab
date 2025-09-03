import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Target, Shield, Zap, FileText, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormalGoal {
  objective: string;
  constraints: string[];
  domains: DomainSelection[];
  metrics: string[];
  ethical_constraints: string[];
  confidence: number;
}

interface DomainSelection {
  name: string;
  relevance_score: number;
  resonance_frequency: number;
  reasoning: string;
}

export const AutoFormulation = () => {
  const [naturalInput, setNaturalInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formalGoal, setFormalGoal] = useState<FormalGoal | null>(null);
  const [processingStep, setProcessingStep] = useState("");
  const { t } = useLanguage();

  const ALL_DOMAINS = [
    { name: "Генетика", keywords: ["ген", "ДНК", "наследственность", "мутация", "эволюция"] },
    { name: "Нанотехнологии", keywords: ["нано", "молекула", "атом", "материал", "синтез"] },
    { name: "Биоинформатика", keywords: ["био", "данные", "анализ", "последовательность", "алгоритм"] },
    { name: "Искусственный интеллект", keywords: ["ИИ", "машинное обучение", "нейросеть", "алгоритм"] },
    { name: "Квантовая физика", keywords: ["квант", "частица", "энергия", "поле", "суперпозиция"] },
    { name: "Математика", keywords: ["формула", "уравнение", "функция", "модель", "расчет"] },
    { name: "Медицина", keywords: ["лечение", "болезнь", "терапия", "диагностика", "здоровье"] },
    { name: "Экология", keywords: ["окружающая среда", "природа", "устойчивость", "экосистема"] }
  ];

  const extractObjective = (text: string): string => {
    // Поиск главной цели в тексте
    const goalPatterns = [
      /найти способ (.+?)(?:\s+через|\s+с помощью|\s+для|\.|$)/i,
      /создать (.+?)(?:\s+для|\s+с|\.|$)/i,
      /разработать (.+?)(?:\s+для|\s+с|\.|$)/i,
      /увеличить (.+?)(?:\s+на|\s+до|\s+через|\.|$)/i,
      /улучшить (.+?)(?:\s+на|\s+до|\s+через|\.|$)/i
    ];

    for (const pattern of goalPatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return text.split('.')[0]; // Первое предложение как цель
  };

  const extractConstraints = (text: string): string[] => {
    const constraints: string[] = [];
    
    // Поиск временных ограничений
    if (text.match(/в течение .+?(?:дн|мес|лет|год)/i)) {
      const timeMatch = text.match(/(в течение .+?(?:дн|мес|лет|год))/i);
      if (timeMatch) constraints.push(`Временное ограничение: ${timeMatch[1]}`);
    }

    // Поиск количественных ограничений
    if (text.match(/на \d+%/)) {
      const quantMatch = text.match(/(на \d+%)/);
      if (quantMatch) constraints.push(`Количественная цель: ${quantMatch[1]}`);
    }

    // Поиск методологических ограничений
    if (text.match(/через (.+?)(?:\s+и|\s+или|\.|$)/i)) {
      const methodMatch = text.match(/через (.+?)(?:\s+и|\s+или|\.|$)/i);
      if (methodMatch) constraints.push(`Методологическое ограничение: ${methodMatch[1]}`);
    }

    // Поиск этических ограничений
    if (text.match(/безопасн|этичн|гуманн|экологичн/i)) {
      constraints.push("Этическое ограничение: Безопасность и этичность решения");
    }

    return constraints.length > 0 ? constraints : ["Ограничения не выявлены"];
  };

  const calculateDomainRelevance = (text: string, domain: any): number => {
    const lowerText = text.toLowerCase();
    let score = 0;
    
    for (const keyword of domain.keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        score += 0.2;
      }
    }

    // Бонусы за контекстуальную релевантность
    if (domain.name === "Генетика" && lowerText.includes("жизн")) score += 0.3;
    if (domain.name === "ИИ" && lowerText.includes("автоматизац")) score += 0.3;
    if (domain.name === "Медицина" && lowerText.includes("здоровь")) score += 0.3;

    return Math.min(score, 1.0);
  };

  const calculateResonanceFrequency = (relevance: number): number => {
    // Резонансная частота как функция релевантности
    const base_frequency = 432; // Базовая частота в Гц
    return base_frequency * (1 + relevance * 2);
  };

  const selectOptimalDomains = (text: string): DomainSelection[] => {
    const domainScores = ALL_DOMAINS.map(domain => {
      const relevance = calculateDomainRelevance(text, domain);
      return {
        name: domain.name,
        relevance_score: relevance,
        resonance_frequency: calculateResonanceFrequency(relevance),
        reasoning: relevance > 0.3 ? "Высокая семантическая близость" : 
                  relevance > 0.1 ? "Умеренная релевантность" : "Низкая релевантность"
      };
    });

    // Сортировка по релевантности и выбор топ-5
    return domainScores
      .sort((a, b) => b.relevance_score - a.relevance_score)
      .slice(0, 5)
      .filter(domain => domain.relevance_score > 0.1);
  };

  const defineSuccessMetrics = (domains: DomainSelection[]): string[] => {
    const metrics = ["Точность прогноза ≥ 85%", "Этическая приемлемость ≥ 80%"];
    
    if (domains.some(d => d.name.includes("Генетика"))) {
      metrics.push("Биологическая безопасность ≥ 95%");
    }
    
    if (domains.some(d => d.name.includes("ИИ"))) {
      metrics.push("Вычислительная эффективность ≥ 90%");
    }
    
    metrics.push("Резонансная согласованность ≥ 70%");
    
    return metrics;
  };

  const analyzeEthicalRequirements = (text: string): string[] => {
    const requirements = [];
    
    if (text.includes("человек") || text.includes("жизн")) {
      requirements.push("Безопасность для человека");
      requirements.push("Информированное согласие");
    }
    
    if (text.includes("генетик") || text.includes("ДНК")) {
      requirements.push("Генетическая безопасность");
      requirements.push("Предотвращение дискриминации");
    }
    
    if (text.includes("ИИ") || text.includes("автомат")) {
      requirements.push("Контролируемость ИИ");
      requirements.push("Прозрачность решений");
    }
    
    requirements.push("Соответствие международным стандартам");
    
    return requirements;
  };

  const autoFormulateGoal = async (input: string): Promise<FormalGoal> => {
    const objective = extractObjective(input);
    const constraints = extractConstraints(input);
    const domains = selectOptimalDomains(input);
    const metrics = defineSuccessMetrics(domains);
    const ethical_constraints = analyzeEthicalRequirements(input);
    
    // Расчет общей уверенности на основе качества извлечения
    const confidence = Math.min(
      (objective.length > 10 ? 0.3 : 0.1) +
      (constraints.length > 1 ? 0.2 : 0.1) +
      (domains.length > 2 ? 0.3 : 0.2) +
      (domains.reduce((sum, d) => sum + d.relevance_score, 0) / domains.length) * 0.2,
      0.95
    ) * 100;

    return {
      objective,
      constraints,
      domains,
      metrics,
      ethical_constraints,
      confidence
    };
  };

  const handleAutoFormulation = async () => {
    if (!naturalInput.trim()) return;

    setIsProcessing(true);
    setProcessingStep("Анализ естественно-языкового ввода...");
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setProcessingStep("Извлечение целей и ограничений...");
    
    await new Promise(resolve => setTimeout(resolve, 600));
    setProcessingStep("Выбор оптимальных доменов через резонансный анализ...");
    
    await new Promise(resolve => setTimeout(resolve, 700));
    setProcessingStep("Формализация научной задачи...");
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setProcessingStep("Определение метрик успеха и этических ограничений...");
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const formalizedGoal = await autoFormulateGoal(naturalInput);
    setFormalGoal(formalizedGoal);
    setIsProcessing(false);
    setProcessingStep("");
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600";
    if (confidence >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 0.7) return "bg-green-100 text-green-800";
    if (score >= 0.4) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            {t('autoFormulation.title')}
          </CardTitle>
          <CardDescription>
            {t('autoFormulation.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('autoFormulation.inputLabel')}:
            </label>
            <Textarea
              placeholder={t('autoFormulation.inputPlaceholder')}
              value={naturalInput}
              onChange={(e) => setNaturalInput(e.target.value)}
              className="min-h-24"
            />
          </div>

          <Button 
            onClick={handleAutoFormulation}
            disabled={!naturalInput.trim() || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Zap className="mr-2 h-4 w-4 animate-spin" />
                Формализация...
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                Автоматически формализовать задачу
              </>
            )}
          </Button>

          {isProcessing && (
            <Alert>
              <Brain className="h-4 w-4" />
              <AlertDescription>
                {processingStep}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {formalGoal && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Формализованная научная задача
            </CardTitle>
            <CardDescription>
              Автоматически извлеченные параметры исследования
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Общая уверенность */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Уверенность формализации</span>
                <span className={`text-sm font-bold ${getConfidenceColor(formalGoal.confidence)}`}>
                  {formalGoal.confidence.toFixed(1)}%
                </span>
              </div>
              <Progress value={formalGoal.confidence} className="w-full" />
            </div>

            {/* Основная цель */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Извлеченная цель:
              </label>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm">{formalGoal.objective}</p>
              </div>
            </div>

            {/* Автоматически выбранные домены */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Автоматически выбранные домены знаний:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formalGoal.domains.map((domain, index) => (
                  <div key={index} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{domain.name}</span>
                      <Badge className={getRelevanceColor(domain.relevance_score)}>
                        {(domain.relevance_score * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Резонансная частота: {domain.resonance_frequency.toFixed(1)} Гц
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {domain.reasoning}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ограничения */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Выявленные ограничения:
              </label>
              <div className="space-y-1">
                {formalGoal.constraints.map((constraint, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-1">
                    {constraint}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Метрики успеха */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Метрики успеха:
              </label>
              <div className="space-y-1">
                {formalGoal.metrics.map((metric, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-1">
                    {metric}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Этические ограничения */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Этические требования:
              </label>
              <div className="space-y-1">
                {formalGoal.ethical_constraints.map((requirement, index) => (
                  <Badge key={index} variant="destructive" className="mr-2 mb-1">
                    {requirement}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};