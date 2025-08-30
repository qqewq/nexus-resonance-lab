import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Box, Play, Pause, RotateCcw } from "lucide-react";

interface Domain3D {
  id: string;
  name: string;
  nameEn: string;
  position: { x: number; y: number; z: number };
  knowledge: number;
  connections: string[];
  color: string;
  activity: number;
}

interface FoamState3D {
  amplitude: number;
  phase: number;
  entanglement: number;
  coherence: number;
  timestamp: number;
}

export const Enhanced3DVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeSlider, setTimeSlider] = useState([0]);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  const domains3D: Domain3D[] = [
    {
      id: "ai",
      name: "ИИ",
      nameEn: "AI",
      position: { x: 0, y: 0, z: 0 },
      knowledge: 0.9,
      connections: ["physics", "medicine"],
      color: "#3B82F6",
      activity: 0.8,
    },
    {
      id: "physics",
      name: "Физика",
      nameEn: "Physics",
      position: { x: 100, y: 50, z: -50 },
      knowledge: 0.85,
      connections: ["ai", "materials", "space"],
      color: "#8B5CF6",
      activity: 0.9,
    },
    {
      id: "materials",
      name: "Материалы",
      nameEn: "Materials",
      position: { x: -80, y: 80, z: 60 },
      knowledge: 0.7,
      connections: ["physics", "medicine"],
      color: "#10B981",
      activity: 0.7,
    },
    {
      id: "medicine",
      name: "Медицина",
      nameEn: "Medicine",
      position: { x: 50, y: -70, z: 80 },
      knowledge: 0.72,
      connections: ["ai", "materials", "biology"],
      color: "#F59E0B",
      activity: 0.85,
    },
    {
      id: "biology",
      name: "Биология",
      nameEn: "Biology",
      position: { x: -100, y: -30, z: -80 },
      knowledge: 0.75,
      connections: ["medicine"],
      color: "#EF4444",
      activity: 0.6,
    },
    {
      id: "space",
      name: "Космос",
      nameEn: "Space",
      position: { x: 120, y: 100, z: 20 },
      knowledge: 0.6,
      connections: ["physics"],
      color: "#6366F1",
      activity: 0.5,
    },
  ];

  const [foamHistory, setFoamHistory] = useState<FoamState3D[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;

    const render = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw background gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(centerX, centerY));
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.8)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // 3D transformation matrix
      const cos = Math.cos;
      const sin = Math.sin;
      const rotX = rotationX;
      const rotY = rotationY;

      const project3D = (x: number, y: number, z: number) => {
        // Rotate around Y axis
        const x1 = x * cos(rotY) - z * sin(rotY);
        const z1 = x * sin(rotY) + z * cos(rotY);
        
        // Rotate around X axis
        const y2 = y * cos(rotX) - z1 * sin(rotX);
        const z2 = y * sin(rotX) + z1 * cos(rotX);
        
        // Project to 2D
        const perspective = 300;
        const scale = perspective / (perspective + z2);
        
        return {
          x: centerX + x1 * scale * 0.8,
          y: centerY + y2 * scale * 0.8,
          scale: scale,
        };
      };

      // Draw connections first
      domains3D.forEach((domain) => {
        const sourcePos = project3D(domain.position.x, domain.position.y, domain.position.z);
        
        domain.connections.forEach((connId) => {
          const targetDomain = domains3D.find(d => d.id === connId);
          if (targetDomain) {
            const targetPos = project3D(targetDomain.position.x, targetDomain.position.y, targetDomain.position.z);
            
            // Connection strength based on knowledge levels
            const strength = (domain.knowledge + targetDomain.knowledge) / 2;
            const opacity = strength * 0.6;
            
            ctx.beginPath();
            ctx.moveTo(sourcePos.x, sourcePos.y);
            ctx.lineTo(targetPos.x, targetPos.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = strength * 3;
            ctx.stroke();
            
            // Animated particles along connections
            const time = Date.now() * 0.001;
            const particleProgress = (time % 2) / 2;
            const particleX = sourcePos.x + (targetPos.x - sourcePos.x) * particleProgress;
            const particleY = sourcePos.y + (targetPos.y - sourcePos.y) * particleProgress;
            
            ctx.beginPath();
            ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 92, 246, ${opacity * 2})`;
            ctx.fill();
          }
        });
      });

      // Sort domains by z-order for proper rendering
      const sortedDomains = [...domains3D].sort((a, b) => {
        const aPos = project3D(a.position.x, a.position.y, a.position.z);
        const bPos = project3D(b.position.x, b.position.y, b.position.z);
        return bPos.scale - aPos.scale; // Far to near
      });

      // Draw domains
      sortedDomains.forEach((domain) => {
        const pos = project3D(domain.position.x, domain.position.y, domain.position.z);
        const radius = 15 + domain.knowledge * 15;
        const scaledRadius = radius * pos.scale;
        
        // Pulsing effect based on activity
        const time = Date.now() * 0.003;
        const pulse = 1 + Math.sin(time * domain.activity * 3) * 0.2;
        const finalRadius = scaledRadius * pulse;
        
        // Draw node glow
        const glowGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, finalRadius * 2);
        glowGradient.addColorStop(0, `${domain.color}40`);
        glowGradient.addColorStop(1, `${domain.color}00`);
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, finalRadius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw node
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, finalRadius, 0, Math.PI * 2);
        ctx.fillStyle = domain.color;
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw knowledge level indicator
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, finalRadius * 0.8, 0, Math.PI * 2 * domain.knowledge);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw label
        ctx.fillStyle = "#ffffff";
        ctx.font = `${Math.max(10, 12 * pos.scale)}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(domain.name, pos.x, pos.y + finalRadius + 20);
        ctx.font = `${Math.max(8, 10 * pos.scale)}px Arial`;
        ctx.fillStyle = "#aaaaaa";
        ctx.fillText(domain.nameEn, pos.x, pos.y + finalRadius + 35);
      });

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(render);
        setRotationY(prev => prev + 0.005);
      }
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [rotationX, rotationY, isPlaying]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;
    
    setRotationY(prev => prev + deltaX * 0.01);
    setRotationX(prev => prev + deltaY * 0.01);
    
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const resetView = () => {
    setRotationX(0);
    setRotationY(0);
  };

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Box className="h-5 w-5 text-primary" />
          <div>
            <div>3D Визуализация пены разума</div>
            <div className="text-sm text-muted-foreground font-normal">
              3D Mind Foam Visualization
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlayback}
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Пауза / Pause" : "Воспроизвести / Play"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetView}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Сброс / Reset
            </Button>
            <Badge variant="outline" className="text-xs">
              Перетаскивайте для поворота / Drag to rotate
            </Badge>
          </div>

          {/* 3D Canvas */}
          <div className="relative border border-primary/30 rounded-lg overflow-hidden bg-black/20">
            <canvas
              ref={canvasRef}
              className="w-full h-96 cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>

          {/* Temporal Evolution Controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Временная эволюция / Temporal Evolution
              </span>
              <span className="text-xs text-muted-foreground">
                t = {timeSlider[0].toFixed(1)}s
              </span>
            </div>
            <Slider
              value={timeSlider}
              onValueChange={setTimeSlider}
              max={10}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Domain Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {domains3D.map((domain) => (
              <div key={domain.id} className="bg-muted/30 p-2 rounded text-center">
                <div 
                  className="w-4 h-4 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: domain.color }}
                />
                <div className="text-xs font-medium">{domain.name}</div>
                <div className="text-xs text-muted-foreground">{domain.nameEn}</div>
                <div className="text-xs mt-1">
                  {(domain.knowledge * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};