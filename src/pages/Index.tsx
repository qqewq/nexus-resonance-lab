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
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            ИИ-ученый для генерации научных гипотез и междоменного обучения
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="text-primary border-primary">
              Снижение сложности O(2^n) → O(n²)
            </Badge>
            <Badge variant="outline" className="text-secondary border-secondary">
              Ускорение в 2621 раз
            </Badge>
            <Badge variant="outline" className="text-accent border-accent">
              Этическая безопасность
            </Badge>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="quantum" 
              size="lg"
              onClick={() => setActiveTab("formulation")}
            >
              <FileText className="h-5 w-5" />
              Поставить задачу
            </Button>
            <Button 
              variant="neural" 
              size="lg"
              onClick={() => setActiveTab("hypothesis")}
            >
              <Lightbulb className="h-5 w-5" />
              Генерировать гипотезы
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            Компоненты системы
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Интегрированная платформа для научных исследований с использованием 
            квантовых принципов и этического ИИ
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8">
            <TabsTrigger value="formulation" className="text-xs">
              <FileText className="h-4 w-4 mr-1" />
              Постановка
            </TabsTrigger>
            <TabsTrigger value="overview" className="text-xs">
              <Atom className="h-4 w-4 mr-1" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="resonance" className="text-xs">
              <Zap className="h-4 w-4 mr-1" />
              Резонанс
            </TabsTrigger>
            <TabsTrigger value="hypothesis" className="text-xs">
              <Lightbulb className="h-4 w-4 mr-1" />
              Гипотезы
            </TabsTrigger>
            <TabsTrigger value="ethics" className="text-xs">
              <Shield className="h-4 w-4 mr-1" />
              Этика
            </TabsTrigger>
            <TabsTrigger value="learning" className="text-xs">
              <Network className="h-4 w-4 mr-1" />
              Обучение
            </TabsTrigger>
          </TabsList>

          <TabsContent value="formulation">
            <ProblemFormulation />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 resonance-pulse">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Резонансный анализ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Выявление критических точек где малые изменения дают значительный эффект
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
                    Гибридная архитектура
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    RL + GAN + Transformer для генерации и оптимизации научных гипотез
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
                    Пена разума
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Междоменное обучение для создания прорывных решений
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
                    Этическая система
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Безопасная проверка решений с защитными механизмами
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
                    Применения
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Медицина, физика, космос, новые материалы
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Лечение</Badge>
                    <Badge variant="outline" className="text-xs">Материалы</Badge>
                    <Badge variant="outline" className="text-xs">Космос</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent" />
                    Производительность
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Работает на простом оборудовании (Raspberry Pi)
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
        </Tabs>
      </section>
    </div>
  );
};

export default Index;
