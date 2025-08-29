import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, XCircle, Brain } from "lucide-react";

interface EthicalFactor {
  name: string;
  value: number;
  weight: number;
  impact: "positive" | "negative" | "neutral";
}

interface EthicalAnalysis {
  totalScore: number;
  factors: EthicalFactor[];
  recommendations: string[];
  risks: string[];
  safeguards: string[];
}

export const EthicalAnalyzer = () => {
  const [analysis, setAnalysis] = useState<EthicalAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hypothesis, setHypothesis] = useState("");

  const runEthicalAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Симуляция этического анализа
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockAnalysis: EthicalAnalysis = {
      totalScore: 78,
      factors: [
        { name: "Безопасность для человека", value: 85, weight: 0.3, impact: "positive" },
        { name: "Экологическое воздействие", value: 72, weight: 0.2, impact: "positive" },
        { name: "Социальная справедливость", value: 88, weight: 0.2, impact: "positive" },
        { name: "Потенциальное злоупотребление", value: 25, weight: 0.15, impact: "negative" },
        { name: "Экономическая доступность", value: 65, weight: 0.15, impact: "neutral" }
      ],
      recommendations: [
        "Усилить протоколы безопасности на всех этапах разработки",
        "Создать независимый комитет по этике для наблюдения",
        "Разработать план обеспечения доступности технологии",
        "Установить строгие ограничения на использование"
      ],
      risks: [
        "Возможность неконтролируемого распространения технологии",
        "Потенциальное неравенство в доступе к решению",
        "Непредвиденные долгосрочные последствия"
      ],
      safeguards: [
        "Многоуровневая система контроля доступа",
        "Постоянный мониторинг применения",
        "Механизм экстренной остановки",
        "Регулярные этические аудиты"
      ]
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const calculateEthicalCoefficient = (factors: EthicalFactor[]) => {
    return factors.reduce((sum, factor) => {
      const sign = factor.impact === "negative" ? -1 : 1;
      return sum + (sign * factor.value * factor.weight);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-accent";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-yellow-400";
    return "text-destructive";
  };

  const getImpactIcon = (impact: "positive" | "negative" | "neutral") => {
    switch (impact) {
      case "positive":
        return <CheckCircle className="h-4 w-4 text-accent" />;
      case "negative":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 gradient-text">
          <Shield className="h-6 w-6" />
          Этический анализатор
        </CardTitle>
        <div className="text-sm text-muted-foreground math-formula">
          Γ = ∑ sign(dI<sub>i</sub>/dt) · γ<sub>ij</sub>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Button 
            onClick={runEthicalAnalysis}
            disabled={isAnalyzing}
            variant="resonance"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Brain className="h-4 w-4 animate-spin" />
                Анализ этичности...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Запустить анализ
              </>
            )}
          </Button>
        </div>

        {analysis && (
          <div className="space-y-6">
            {/* Общий этический рейтинг */}
            <Card className="bg-muted/20 border-primary/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-primary">
                    Общий этический рейтинг
                  </h3>
                  <span className={`text-2xl font-bold ${getScoreColor(analysis.totalScore)}`}>
                    {analysis.totalScore}/100
                  </span>
                </div>
                <Progress value={analysis.totalScore} className="h-3" />
                <div className="text-xs text-muted-foreground mt-1">
                  Коэффициент Γ = {calculateEthicalCoefficient(analysis.factors).toFixed(2)}
                </div>
              </CardContent>
            </Card>

            {/* Факторы анализа */}
            <div>
              <h3 className="text-lg font-semibold text-secondary mb-3">
                Этические факторы
              </h3>
              <div className="grid gap-3">
                {analysis.factors.map((factor, index) => (
                  <Card key={index} className="bg-muted/20 border-primary/5">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getImpactIcon(factor.impact)}
                          <span className="font-medium">{factor.name}</span>
                          <Badge variant="outline" className="text-xs">
                            вес: {(factor.weight * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <span className={`font-semibold ${getScoreColor(factor.value)}`}>
                          {factor.value}%
                        </span>
                      </div>
                      <Progress value={factor.value} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Рекомендации */}
            <div>
              <h3 className="text-lg font-semibold text-accent mb-3">
                Рекомендации
              </h3>
              <div className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/20 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Риски */}
            <div>
              <h3 className="text-lg font-semibold text-destructive mb-3">
                Выявленные риски
              </h3>
              <div className="space-y-2">
                {analysis.risks.map((risk, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{risk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Меры защиты */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">
                Меры защиты
              </h3>
              <div className="space-y-2">
                {analysis.safeguards.map((safeguard, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{safeguard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};