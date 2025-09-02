import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResonanceAnalyzer } from "@/components/ResonanceAnalyzer";
import { HypothesisGenerator } from "@/components/HypothesisGenerator";
import { EthicalAnalyzer } from "@/components/EthicalAnalyzer";
import { InterdomainLearning } from "@/components/InterdomainLearning";
import { ProblemFormulation } from "@/components/ProblemFormulation";
import { Enhanced3DVisualization } from "@/components/Enhanced3DVisualization";
import { PublicationIntegration } from "@/components/PublicationIntegration";
import { AutoFormulation } from "@/components/AutoFormulation";
import { Brain, Zap, Target, Network, Shield, Atom, Lightbulb, Rocket, FileText } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="quantum-wave">
            <Brain className="h-16 w-16 text-primary mx-auto mb-6" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Гибридный Резонансный Алгоритм
            <span className="block text-3xl md:text-4xl mt-2 text-muted-foreground">
              Hybrid Resonant Algorithm
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            ИИ-ученый для генерации научных гипотез и междоменного обучения
            <span className="block text-lg md:text-xl mt-2">
              AI Scientist for Scientific Hypothesis Generation and Interdomain Learning
            </span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="text-primary border-primary">
              Снижение сложности O(2^n) → O(n²) / Complexity Reduction
            </Badge>
            <Badge variant="outline" className="text-secondary border-secondary">
              Ускорение в 2621 раз / 2621x Speedup
            </Badge>
            <Badge variant="outline" className="text-accent border-accent">
              Этическая безопасность / Ethical Safety
            </Badge>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="quantum" 
              size="lg"
              onClick={() => setActiveTab("formulation")}
            >
              <FileText className="h-5 w-5" />
              Поставить задачу / Formulate Problem
            </Button>
            <Button 
              variant="neural" 
              size="lg"
              onClick={() => setActiveTab("hypothesis")}
            >
              <Lightbulb className="h-5 w-5" />
              Генерировать гипотезы / Generate Hypotheses
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            Компоненты системы / System Components
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Интегрированная платформа для научных исследований с использованием 
            квантовых принципов и этического ИИ
            <span className="block text-lg mt-2">
              Integrated platform for scientific research using quantum principles and ethical AI
            </span>
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-9 mb-8">
            <TabsTrigger value="auto-formulation" className="text-xs flex flex-col">
              <Brain className="h-4 w-4 mb-1" />
              <span>Авто-постановка</span>
              <span className="text-[10px] opacity-70">Auto-formulation</span>
            </TabsTrigger>
            <TabsTrigger value="formulation" className="text-xs flex flex-col">
              <FileText className="h-4 w-4 mb-1" />
              <span>Постановка</span>
              <span className="text-[10px] opacity-70">Formulation</span>
            </TabsTrigger>
            <TabsTrigger value="overview" className="text-xs flex flex-col">
              <Atom className="h-4 w-4 mb-1" />
              <span>Обзор</span>
              <span className="text-[10px] opacity-70">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="resonance" className="text-xs flex flex-col">
              <Zap className="h-4 w-4 mb-1" />
              <span>Резонанс</span>
              <span className="text-[10px] opacity-70">Resonance</span>
            </TabsTrigger>
            <TabsTrigger value="hypothesis" className="text-xs flex flex-col">
              <Lightbulb className="h-4 w-4 mb-1" />
              <span>Гипотезы</span>
              <span className="text-[10px] opacity-70">Hypotheses</span>
            </TabsTrigger>
            <TabsTrigger value="ethics" className="text-xs flex flex-col">
              <Shield className="h-4 w-4 mb-1" />
              <span>Этика</span>
              <span className="text-[10px] opacity-70">Ethics</span>
            </TabsTrigger>
            <TabsTrigger value="learning" className="text-xs flex flex-col">
              <Network className="h-4 w-4 mb-1" />
              <span>Обучение</span>
              <span className="text-[10px] opacity-70">Learning</span>
            </TabsTrigger>
            <TabsTrigger value="visualization" className="text-xs flex flex-col">
              <Atom className="h-4 w-4 mb-1" />
              <span>3D Визуализация</span>
              <span className="text-[10px] opacity-70">3D Visualization</span>
            </TabsTrigger>
            <TabsTrigger value="publications" className="text-xs flex flex-col">
              <FileText className="h-4 w-4 mb-1" />
              <span>Публикации</span>
              <span className="text-[10px] opacity-70">Publications</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="auto-formulation">
            <AutoFormulation />
          </TabsContent>

          <TabsContent value="formulation">
            <ProblemFormulation />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 resonance-pulse">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <div>
                      <div>Резонансный анализ</div>
                      <div className="text-sm text-muted-foreground font-normal">Resonance Analysis</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Выявление критических точек где малые изменения дают значительный эффект
                    <span className="block text-xs mt-1 opacity-80">
                      Identifying critical points where small changes produce significant effects
                    </span>
                  </p>
                  <div className="math-formula text-xs bg-muted/30 p-2 rounded">
                    ω<sub>рез</sub> = (1/D) ∑<sub>k=1</sub><sup>N</sup> (q<sub>k</sub>/m<sub>k</sub>)
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-secondary/20 neural-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-secondary" />
                    <div>
                      <div>Гибридная архитектура</div>
                      <div className="text-sm text-muted-foreground font-normal">Hybrid Architecture</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    RL + GAN + Transformer для генерации и оптимизации научных гипотез
                    <span className="block text-xs mt-1 opacity-80">
                      RL + GAN + Transformer for scientific hypothesis generation and optimization
                    </span>
                  </p>
                  <div className="flex gap-1">
                    <Badge variant="outline" className="text-xs">RL</Badge>
                    <Badge variant="outline" className="text-xs">GAN</Badge>
                    <Badge variant="outline" className="text-xs">Transformer</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-accent/20 quantum-wave">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-accent" />
                    <div>
                      <div>Пена разума</div>
                      <div className="text-sm text-muted-foreground font-normal">Mind Foam</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Междоменное обучение для создания прорывных решений
                    <span className="block text-xs mt-1 opacity-80">
                      Interdomain learning for breakthrough solutions
                    </span>
                  </p>
                  <div className="math-formula text-xs bg-muted/30 p-2 rounded">
                    |Ψ<sub>пена</sub>⟩ = ∑ c<sub>i</sub> |ψ<sub>i</sub>⟩ ⊗ |G<sub>общ</sub>⟩
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <div>Этическая система</div>
                      <div className="text-sm text-muted-foreground font-normal">Ethical System</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Безопасная проверка решений с защитными механизмами
                    <span className="block text-xs mt-1 opacity-80">
                      Safe solution verification with protective mechanisms
                    </span>
                  </p>
                  <div className="math-formula text-xs bg-muted/30 p-2 rounded">
                    Γ = ∑ sign(dI<sub>i</sub>/dt) · γ<sub>ij</sub>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-secondary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-secondary" />
                    <div>
                      <div>Применения</div>
                      <div className="text-sm text-muted-foreground font-normal">Applications</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Медицина, физика, космос, новые материалы
                    <span className="block text-xs mt-1 opacity-80">
                      Medicine, physics, space, new materials
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Лечение / Medicine</Badge>
                    <Badge variant="outline" className="text-xs">Материалы / Materials</Badge>
                    <Badge variant="outline" className="text-xs">Космос / Space</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent" />
                    <div>
                      <div>Производительность</div>
                      <div className="text-sm text-muted-foreground font-normal">Performance</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Работает на простом оборудовании (Raspberry Pi)
                    <span className="block text-xs mt-1 opacity-80">
                      Runs on simple hardware (Raspberry Pi)
                    </span>
                  </p>
                  <div className="text-2xl font-bold text-accent">
                    2621x быстрее
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resonance">
            <ResonanceAnalyzer />
          </TabsContent>

          <TabsContent value="hypothesis">
            <HypothesisGenerator />
          </TabsContent>

          <TabsContent value="ethics">
            <EthicalAnalyzer />
          </TabsContent>

          <TabsContent value="learning">
            <InterdomainLearning />
          </TabsContent>

          <TabsContent value="visualization">
            <Enhanced3DVisualization />
          </TabsContent>

          <TabsContent value="publications">
            <PublicationIntegration />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Index;
