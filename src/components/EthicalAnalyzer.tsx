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
  // Multi-level ethical evaluation
  basicLevel: number;     // Γ₁ = ∑ sign(dI_i/dt)·γ_ij
  contextualLevel: number; // Γ₂ = Γ₁·C(x)
  longTermLevel: number;   // Γ₃ = ∫₀^T Γ₁(t)·e^(-λt) dt
  realTimeMonitoring: number; // dΓ/dt
}

export const EthicalAnalyzer = () => {
  const [analysis, setAnalysis] = useState<EthicalAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hypothesis, setHypothesis] = useState("");

  const runEthicalAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Enhanced multi-level ethical analysis
    const basicLevel = 0.75; // Γ₁ = ∑ sign(dI_i/dt)·γ_ij
    const contextMultiplier = hypothesis.includes("nanobot") || hypothesis.includes("наноботы") ? 1.2 : 1.0;
    const contextualLevel = basicLevel * contextMultiplier; // Γ₂ = Γ₁·C(x)
    const timeDecay = 0.95; // λ parameter for long-term evaluation
    const longTermLevel = contextualLevel * timeDecay; // Simplified Γ₃
    const realTimeMonitoring = (contextualLevel - basicLevel) / 1; // dΓ/dt approximation
    
    // For medical tasks, increase ethical threshold to Γ > 0.9
    const medicalTaskBonus = hypothesis.toLowerCase().includes("medic") || hypothesis.includes("медицин") ? 0.1 : 0;
    const finalScore = Math.min(98, (longTermLevel + medicalTaskBonus) * 100);
    
    const mockAnalysis: EthicalAnalysis = {
      totalScore: finalScore,
      basicLevel,
      contextualLevel,
      longTermLevel,
      realTimeMonitoring,
      factors: [
        { name: "Безопасность / Safety", value: 95, weight: 0.3, impact: "positive" },
        { name: "Конфиденциальность / Privacy", value: 85, weight: 0.25, impact: "positive" },
        { name: "Справедливость / Fairness", value: 88, weight: 0.2, impact: "positive" },
        { name: "Прозрачность / Transparency", value: 82, weight: 0.15, impact: "neutral" },
        { name: "Подотчетность / Accountability", value: 90, weight: 0.1, impact: "positive" },
        { name: "Долгосрочные последствия / Long-term Impact", value: longTermLevel * 100, weight: 0.25, impact: "positive" },
      ],
      recommendations: [
        "Внедрить многоуровневую систему этического контроля / Implement multi-level ethical control system",
        "Настроить мониторинг в реальном времени (dΓ/dt) / Set up real-time monitoring (dΓ/dt)",
        "Повысить порог для медицинских задач до Γ > 0.9 / Raise threshold for medical tasks to Γ > 0.9",
        "Добавить контекстуальную корректировку C(x) / Add contextual adjustment C(x)"
      ],
      risks: [
        "Превышение этического порога при медицинских применениях / Exceeding ethical threshold in medical applications",
        "Временная деградация этических показателей / Temporal degradation of ethical metrics",
        "Контекстуальные искажения в оценке / Contextual distortions in evaluation"
      ],
      safeguards: [
        "Автоматическое отключение при Γ < 0.7 / Automatic shutdown when Γ < 0.7",
        "Интегральная оценка долгосрочных последствий / Integral long-term impact assessment",
        "Адаптивная корректировка весов γ_ij / Adaptive weight adjustment γ_ij",
        "Непрерывный мониторинг dΓ/dt в реальном времени / Continuous real-time dΓ/dt monitoring"
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
          <div>
            <div>Этический анализатор</div>
            <div className="text-lg text-muted-foreground font-normal">Ethical Analyzer</div>
          </div>
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
                Анализ этичности... / Analyzing Ethics...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Запустить анализ / Run Analysis
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
                    Общий этический рейтинг / Overall Ethical Rating
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
                Этические факторы / Ethical Factors
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
                Рекомендации / Recommendations
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
                Выявленные риски / Identified Risks
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
                Меры защиты / Safeguards
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