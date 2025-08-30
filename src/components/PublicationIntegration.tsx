import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Search, ExternalLink, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  relevanceScore: number;
  validationStatus: "verified" | "pending" | "disputed";
  summary: string;
  keyFindings: string[];
}

interface KnowledgeUpdate {
  domain: string;
  previousKnowledge: number;
  updatedKnowledge: number;
  newConnections: string[];
  confidenceBoost: number;
}

export const PublicationIntegration = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [knowledgeUpdates, setKnowledgeUpdates] = useState<KnowledgeUpdate[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);

  // Mock publication data
  const mockPublications: Publication[] = [
    {
      id: "pub1",
      title: "Targeted mitochondrial delivery using biocompatible nanobots for cellular regeneration",
      authors: ["Smith, J.", "Johnson, A.", "Williams, K."],
      journal: "Nature Nanotechnology",
      year: 2024,
      doi: "10.1038/nnano.2024.001",
      relevanceScore: 0.95,
      validationStatus: "verified",
      summary: "Breakthrough research on nanobots capable of penetrating mitochondrial membranes for targeted antioxidant delivery, showing 85% efficiency in cellular regeneration trials.",
      keyFindings: [
        "Optimal nanobot size: 65-75nm for mitochondrial penetration",
        "Biocompatible materials show 99.8% safety profile",
        "Cellular regeneration improved by 340% in laboratory tests"
      ]
    },
    {
      id: "pub2", 
      title: "Resonance-based optimization of nanoscale drug delivery systems",
      authors: ["Chen, L.", "Rodriguez, M.", "Taylor, R."],
      journal: "Science Robotics",
      year: 2024,
      doi: "10.1126/scirobotics.2024.002",
      relevanceScore: 0.88,
      validationStatus: "verified",
      summary: "Novel approach using resonant frequencies to optimize nanoscale drug delivery with applications in longevity medicine.",
      keyFindings: [
        "Resonance frequency optimization increases delivery efficiency by 250%",
        "Reduced side effects by 78% compared to conventional methods",
        "Potential applications in healthy life extension"
      ]
    },
    {
      id: "pub3",
      title: "Ethical frameworks for autonomous medical nanobots in preventive healthcare",
      authors: ["Davis, S.", "Miller, P.", "Anderson, C."],
      journal: "AI Ethics in Medicine",
      year: 2024,
      doi: "10.1007/aiem.2024.003",
      relevanceScore: 0.82,
      validationStatus: "pending",
      summary: "Comprehensive ethical analysis of medical nanobots with focus on autonomy, safety, and long-term health implications.",
      keyFindings: [
        "Multi-level ethical evaluation framework required",
        "Real-time monitoring systems essential for safety",
        "Threshold Γ > 0.9 recommended for medical applications"
      ]
    }
  ];

  const searchPublications = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Filter mock publications based on search query
    const filteredPubs = mockPublications.filter(pub => 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.keyFindings.some(finding => finding.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    setPublications(filteredPubs);
    
    // Generate knowledge updates based on search results
    if (filteredPubs.length > 0) {
      const updates: KnowledgeUpdate[] = [
        {
          domain: "Physics",
          previousKnowledge: 0.85,
          updatedKnowledge: 0.92,
          newConnections: ["Materials", "Medicine"],
          confidenceBoost: 0.15
        },
        {
          domain: "Medicine", 
          previousKnowledge: 0.72,
          updatedKnowledge: 0.88,
          newConnections: ["Biology", "Ethics"],
          confidenceBoost: 0.22
        },
        {
          domain: "Materials",
          previousKnowledge: 0.70,
          updatedKnowledge: 0.83,
          newConnections: ["Physics"],
          confidenceBoost: 0.18
        }
      ];
      setKnowledgeUpdates(updates);
      setLastUpdateTime(new Date());
      
      toast.success(`Найдено ${filteredPubs.length} релевантных публикаций. Знания обновлены! / Found ${filteredPubs.length} relevant publications. Knowledge updated!`);
    }
    
    setIsSearching(false);
  };

  const autoUpdateKnowledge = async () => {
    if (!autoUpdateEnabled) return;
    
    // Simulate automatic knowledge updates from PubMed/arXiv
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const randomUpdate: KnowledgeUpdate = {
      domain: ["Physics", "Medicine", "Materials", "Biology"][Math.floor(Math.random() * 4)],
      previousKnowledge: 0.7 + Math.random() * 0.2,
      updatedKnowledge: 0.8 + Math.random() * 0.15,
      newConnections: ["AI", "Space", "Ethics"].slice(0, Math.floor(Math.random() * 2) + 1),
      confidenceBoost: Math.random() * 0.2
    };
    
    setKnowledgeUpdates(prev => [randomUpdate, ...prev.slice(0, 4)]);
    setLastUpdateTime(new Date());
  };

  useEffect(() => {
    const interval = setInterval(autoUpdateKnowledge, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [autoUpdateEnabled]);

  const getValidationIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending": return <RefreshCw className="h-4 w-4 text-yellow-500" />;
      case "disputed": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getValidationText = (status: string) => {
    switch (status) {
      case "verified": return "Проверено / Verified";
      case "pending": return "На проверке / Pending";
      case "disputed": return "Спорно / Disputed";
      default: return "";
    }
  };

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <div>
            <div>Интеграция с научными публикациями</div>
            <div className="text-sm text-muted-foreground font-normal">
              Scientific Publication Integration
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Interface */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Поиск в PubMed, arXiv... / Search PubMed, arXiv..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchPublications()}
            />
            <Button 
              onClick={searchPublications}
              disabled={isSearching}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              {isSearching ? "Поиск... / Searching..." : "Поиск / Search"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Автообновление / Auto-update:
              </span>
              <Button
                variant={autoUpdateEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoUpdateEnabled(!autoUpdateEnabled)}
              >
                {autoUpdateEnabled ? "Включено / ON" : "Выключено / OFF"}
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">
              Последнее обновление / Last update: {lastUpdateTime.toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Knowledge Updates */}
        {knowledgeUpdates.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-secondary">
              Обновления знаний / Knowledge Updates
            </h3>
            <div className="grid gap-3">
              {knowledgeUpdates.map((update, index) => (
                <div key={index} className="bg-muted/30 p-3 rounded border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-primary">{update.domain}</span>
                    <Badge variant="outline" className="text-xs">
                      +{(update.confidenceBoost * 100).toFixed(1)}% уверенности / confidence
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span>Знания / Knowledge:</span>
                      <Progress 
                        value={update.previousKnowledge * 100} 
                        className="flex-1 h-2 opacity-50" 
                      />
                      <span>→</span>
                      <Progress 
                        value={update.updatedKnowledge * 100} 
                        className="flex-1 h-2" 
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Новые связи / New connections: {update.newConnections.join(", ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications List */}
        {publications.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-secondary">
              Релевантные публикации / Relevant Publications
            </h3>
            <div className="space-y-4">
              {publications.map((pub) => (
                <div key={pub.id} className="bg-muted/30 p-4 rounded border">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground leading-tight flex-1">
                      {pub.title}
                    </h4>
                    <div className="flex items-center gap-2 ml-2">
                      {getValidationIcon(pub.validationStatus)}
                      <Badge variant="outline" className="text-xs">
                        {Math.round(pub.relevanceScore * 100)}% релевантность / relevance
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-2">
                    {pub.authors.join(", ")} • {pub.journal} ({pub.year})
                  </div>
                  
                  <p className="text-sm mb-3 leading-relaxed">{pub.summary}</p>
                  
                  <div className="space-y-2 mb-3">
                    <span className="text-xs font-medium text-accent">
                      Ключевые находки / Key Findings:
                    </span>
                    <ul className="text-xs space-y-1">
                      {pub.keyFindings.map((finding, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getValidationIcon(pub.validationStatus)}
                      <span className="text-xs text-muted-foreground">
                        {getValidationText(pub.validationStatus)}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      <span className="text-xs">DOI: {pub.doi}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Integration */}
        <div className="bg-muted/20 p-4 rounded border border-accent/30">
          <h4 className="font-medium text-accent mb-2">
            Обратная связь от экспериментов / Experimental Feedback
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Система автоматически корректирует веса в матрице связей на основе результатов реальных экспериментов.
            <span className="block mt-1">
              System automatically adjusts connection matrix weights based on real experimental results.
            </span>
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Загрузить результаты / Upload Results
            </Button>
            <Button variant="outline" size="sm">
              Статистика / Statistics
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};