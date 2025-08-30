import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { FileText, Target, Lightbulb, AlertCircle, CheckCircle, Brain, Zap } from "lucide-react";

interface ScientificProblem {
  title: string;
  description: string;
  domain: string;
  subDomains: string[];
  objectives: string[];
  hypotheses: string[];
  constraints: string[];
  successCriteria: string[];
  expectedResults: string[];
  complexity: number;
  urgency: number;
  resources: string[];
}

interface FormulationStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: any;
}

export const ProblemFormulation = () => {
  const [problem, setProblem] = useState<ScientificProblem>({
    title: "",
    description: "",
    domain: "",
    subDomains: [],
    objectives: [],
    hypotheses: [],
    constraints: [],
    successCriteria: [],
    expectedResults: [],
    complexity: 50,
    urgency: 50,
    resources: []
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isFormulating, setIsFormulating] = useState(false);
  const [formationComplete, setFormationComplete] = useState(false);

  const domains = [
    "Медицина", "Физика", "Космические технологии", "Материаловедение", 
    "Биология", "Химия", "Искусственный интеллект", "Экология", 
    "Энергетика", "Нанотехнологии"
  ];

  const subDomainMap: Record<string, string[]> = {
    "Медицина": ["Онкология", "Кардиология", "Неврология", "Фармакология", "Генетика"],
    "Физика": ["Квантовая механика", "Теория относительности", "Физика плазмы", "Ядерная физика"],
    "Космические технологии": ["Двигательные системы", "Материалы", "Навигация", "Жизнеобеспечение"],
    "Материаловедение": ["Наноматериалы", "Биоматериалы", "Композиты", "Смарт-материалы"],
    "Биология": ["Молекулярная биология", "Генетика", "Биохимия", "Клеточная биология"],
    "Химия": ["Органическая химия", "Неорганическая химия", "Физическая химия", "Аналитическая химия"]
  };

  const formulationSteps: FormulationStep[] = [
    {
      id: "description",
      title: "Описание проблемы / Problem Description",
      description: "Четкое изложение научной проблемы / Clear scientific problem statement",
      completed: !!problem.title && !!problem.description,
      icon: FileText
    },
    {
      id: "domain",
      title: "Область исследования / Research Domain",
      description: "Определение научной области и подобластей / Define scientific domain and subdomains",
      completed: !!problem.domain && problem.subDomains.length > 0,
      icon: Target
    },
    {
      id: "objectives",
      title: "Цели и задачи / Goals & Tasks",
      description: "Формулировка целей и конкретных задач / Formulate goals and specific tasks",
      completed: problem.objectives.length > 0,
      icon: Lightbulb
    },
    {
      id: "hypotheses",
      title: "Гипотезы / Hypotheses",
      description: "Предварительные гипотезы и предположения / Preliminary hypotheses and assumptions",
      completed: problem.hypotheses.length > 0,
      icon: Brain
    },
    {
      id: "constraints",
      title: "Ограничения / Constraints",
      description: "Определение ограничений и предположений / Define constraints and assumptions",
      completed: problem.constraints.length > 0,
      icon: AlertCircle
    },
    {
      id: "criteria",
      title: "Критерии успеха / Success Criteria",
      description: "Метрики для оценки успешности решения / Metrics for evaluating solution success",
      completed: problem.successCriteria.length > 0,
      icon: CheckCircle
    }
  ];

  const addToArray = (field: keyof ScientificProblem, value: string) => {
    if (value.trim()) {
      setProblem(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
    }
  };

  const removeFromArray = (field: keyof ScientificProblem, index: number) => {
    setProblem(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const completedSteps = formulationSteps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / formulationSteps.length) * 100;

  const startFormulation = async () => {
    setIsFormulating(true);
    
    // Симуляция процесса анализа постановки задачи
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setFormationComplete(true);
    setIsFormulating(false);
  };

  const canStartFormulation = completedSteps >= 4; // Минимум 4 шага должны быть завершены

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 gradient-text">
          <FileText className="h-6 w-6" />
          <div>
            <div>Постановка научной задачи</div>
            <div className="text-lg text-muted-foreground font-normal">Scientific Problem Formulation</div>
          </div>
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Структурированное формулирование проблемы для ГРА
          <span className="block text-xs mt-1 opacity-80">
            Structured problem formulation for HRA
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Прогресс */}
        <Card className="bg-muted/20 border-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Прогресс формулирования / Formulation Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedSteps}/{formulationSteps.length}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-2" />
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {formulationSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center p-2 rounded-lg border cursor-pointer transition-colors ${
                      step.completed 
                        ? "bg-accent/20 border-accent text-accent" 
                        : "bg-muted/20 border-muted text-muted-foreground"
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <Icon className="h-4 w-4 mb-1" />
                    <span className="text-xs text-center">{step.title}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Шаги формулирования */}
        <div className="space-y-6">
          {/* Шаг 1: Описание проблемы */}
          <Card className="bg-muted/20 border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                1. Описание проблемы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Название проблемы</Label>
                <Input
                  id="title"
                  value={problem.title}
                  onChange={(e) => setProblem(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Краткое название научной проблемы"
                />
              </div>
              <div>
                <Label htmlFor="description">Подробное описание</Label>
                <Textarea
                  id="description"
                  value={problem.description}
                  onChange={(e) => setProblem(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Детальное описание проблемы, её актуальности и значимости"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Шаг 2: Область исследования */}
          <Card className="bg-muted/20 border-secondary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5" />
                2. Область исследования
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Основная область</Label>
                <Select value={problem.domain} onValueChange={(value) => setProblem(prev => ({ ...prev, domain: value, subDomains: [] }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите научную область" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map(domain => (
                      <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {problem.domain && subDomainMap[problem.domain] && (
                <div>
                  <Label>Подобласти</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {subDomainMap[problem.domain].map(subDomain => (
                      <div key={subDomain} className="flex items-center space-x-2">
                        <Checkbox
                          id={subDomain}
                          checked={problem.subDomains.includes(subDomain)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setProblem(prev => ({ ...prev, subDomains: [...prev.subDomains, subDomain] }));
                            } else {
                              setProblem(prev => ({ ...prev, subDomains: prev.subDomains.filter(s => s !== subDomain) }));
                            }
                          }}
                        />
                        <Label htmlFor={subDomain} className="text-sm">{subDomain}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Шаг 3: Цели и задачи */}
          <Card className="bg-muted/20 border-accent/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5" />
                3. Цели и задачи
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Добавить цель</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Сформулируйте конкретную цель исследования"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('objectives', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addToArray('objectives', input.value);
                      input.value = '';
                    }}
                  >
                    Добавить
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                {problem.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-background/50 rounded">
                    <span className="text-sm">{objective}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromArray('objectives', index)}
                    >
                      Удалить
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Шаг 4: Гипотезы */}
          <Card className="bg-muted/20 border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="h-5 w-5" />
                4. Рабочие гипотезы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Добавить гипотезу</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Сформулируйте предварительную гипотезу"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('hypotheses', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addToArray('hypotheses', input.value);
                      input.value = '';
                    }}
                  >
                    Добавить
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                {problem.hypotheses.map((hypothesis, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-background/50 rounded">
                    <span className="text-sm">{hypothesis}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromArray('hypotheses', index)}
                    >
                      Удалить
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Шаг 5: Ограничения */}
          <Card className="bg-muted/20 border-destructive/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-5 w-5" />
                5. Ограничения и предположения
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Добавить ограничение</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Укажите ограничения (ресурсы, время, технологии)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('constraints', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addToArray('constraints', input.value);
                      input.value = '';
                    }}
                  >
                    Добавить
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                {problem.constraints.map((constraint, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-background/50 rounded">
                    <span className="text-sm">{constraint}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromArray('constraints', index)}
                    >
                      Удалить
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Шаг 6: Критерии успеха */}
          <Card className="bg-muted/20 border-accent/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle className="h-5 w-5" />
                6. Критерии успеха
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Добавить критерий</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Как будет измеряться успешность решения?"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('successCriteria', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addToArray('successCriteria', input.value);
                      input.value = '';
                    }}
                  >
                    Добавить
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                {problem.successCriteria.map((criterion, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-background/50 rounded">
                    <span className="text-sm">{criterion}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromArray('successCriteria', index)}
                    >
                      Удалить
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Запуск формулирования */}
        <div className="flex justify-center">
          <Button
            variant="quantum"
            size="lg"
            disabled={!canStartFormulation || isFormulating}
            onClick={startFormulation}
          >
            {isFormulating ? (
              <>
                <Brain className="h-4 w-4 animate-spin" />
                Анализ постановки задачи...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                Завершить постановку задачи
              </>
            )}
          </Button>
        </div>

        {/* Результат формулирования */}
        {formationComplete && (
          <Card className="bg-accent/10 border-accent/20">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <CheckCircle className="h-12 w-12 text-accent mx-auto" />
                <h3 className="text-lg font-semibold text-accent">
                  Постановка задачи завершена
                </h3>
                <p className="text-sm text-muted-foreground">
                  Задача готова для анализа с помощью Гибридного Резонансного Алгоритма.
                  Можете переходить к резонансному анализу и генерации гипотез.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <Badge variant="outline" className="text-accent">
                    Сложность: {problem.complexity}%
                  </Badge>
                  <Badge variant="outline" className="text-secondary">
                    Приоритет: {problem.urgency}%
                  </Badge>
                  <Badge variant="outline" className="text-primary">
                    Готовность: 100%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};