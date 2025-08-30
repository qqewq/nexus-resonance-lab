import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Target, AlertTriangle } from "lucide-react";

interface ResonancePoint {
  frequency: number;
  amplitude: number;
  domain: string;
  criticalLevel: number;
}

export const ResonanceAnalyzer = () => {
  const [dimension, setDimension] = useState<number>(3.14);
  const [quantumProperties, setQuantumProperties] = useState<number[]>([1.2, 0.8, 2.1]);
  const [effectiveMasses, setEffectiveMasses] = useState<number[]>([0.5, 1.0, 0.3]);
  const [resonanceFrequency, setResonanceFrequency] = useState<number>(0);
  const [resonancePoints, setResonancePoints] = useState<ResonancePoint[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const calculateResonanceFrequency = () => {
    if (quantumProperties.length !== effectiveMasses.length) return 0;
    
    const sum = quantumProperties.reduce((acc, q, i) => {
      return acc + (q / effectiveMasses[i]);
    }, 0);
    
    return sum / dimension;
  };

  const generateResonancePoints = () => {
    const domains = ["Медицина", "Физика", "Космос", "Материалы", "Биология"];
    const points: ResonancePoint[] = [];
    
    for (let i = 0; i < 5; i++) {
      points.push({
        frequency: resonanceFrequency * (0.8 + Math.random() * 0.4),
        amplitude: Math.random() * 10 + 1,
        domain: domains[i],
        criticalLevel: Math.random() * 100
      });
    }
    
    return points.sort((a, b) => b.criticalLevel - a.criticalLevel);
  };

  const analyzeResonance = async () => {
    setIsAnalyzing(true);
    const freq = calculateResonanceFrequency();
    setResonanceFrequency(freq);
    
    // Симуляция анализа
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const points = generateResonancePoints();
    setResonancePoints(points);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    const freq = calculateResonanceFrequency();
    setResonanceFrequency(freq);
  }, [dimension, quantumProperties, effectiveMasses]);

  const getCriticalityColor = (level: number) => {
    if (level > 80) return "text-destructive";
    if (level > 60) return "text-orange-400";
    if (level > 40) return "text-yellow-400";
    return "text-accent";
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 gradient-text">
          <Zap className="h-6 w-6" />
          <div>
            <div>Резонансный анализатор ГРА</div>
            <div className="text-lg text-muted-foreground font-normal">HRA Resonance Analyzer</div>
          </div>
        </CardTitle>
        <div className="text-sm text-muted-foreground math-formula">
          ω<sub>рез</sub> = (1/D) ∑<sub>k=1</sub><sup>N</sup> (q<sub>k</sub>/m<sub>k</sub>)
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-primary">
              Фрактальная размерность (D) / Fractal Dimension
            </label>
            <Input
              type="number"
              step="0.01"
              value={dimension}
              onChange={(e) => setDimension(parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-primary">
              Квантовые свойства (q<sub>k</sub>) / Quantum Properties
            </label>
            <Input
              placeholder="1.2, 0.8, 2.1"
              value={quantumProperties.join(", ")}
              onChange={(e) => {
                const values = e.target.value.split(",").map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
                setQuantumProperties(values);
              }}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-primary">
              Эффективные массы (m<sub>k</sub>) / Effective Masses
            </label>
            <Input
              placeholder="0.5, 1.0, 0.3"
              value={effectiveMasses.join(", ")}
              onChange={(e) => {
                const values = e.target.value.split(",").map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
                setEffectiveMasses(values);
              }}
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">
            <span className="text-muted-foreground">Резонансная частота / Resonance Frequency: </span>
            <span className="text-primary math-formula">
              {resonanceFrequency.toFixed(4)} Гц
            </span>
          </div>
          <Button 
            onClick={analyzeResonance} 
            disabled={isAnalyzing}
            variant="quantum"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Brain className="h-4 w-4 animate-spin" />
                Анализ... / Analyzing...
              </>
            ) : (
              <>
                <Target className="h-4 w-4" />
                Найти резонансы / Find Resonances
              </>
            )}
          </Button>
        </div>

        {resonancePoints.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">
              Критические резонансные точки / Critical Resonance Points
            </h3>
            <div className="grid gap-3">
              {resonancePoints.map((point, index) => (
                <Card key={index} className="bg-muted/30 border-primary/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-accent">
                          {point.domain}
                        </Badge>
                        <span className="text-sm font-mono">
                          {point.frequency.toFixed(3)} Гц
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`h-4 w-4 ${getCriticalityColor(point.criticalLevel)}`} />
                        <span className={`text-sm font-semibold ${getCriticalityColor(point.criticalLevel)}`}>
                          {point.criticalLevel.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${point.amplitude * 10}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};