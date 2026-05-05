import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Heart, Thermometer, Wind, ShieldAlert } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Metric {
  icon: LucideIcon;
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
  trackColor: string;
}

function CircularProgress({ value, max, size = 80, strokeWidth = 6, color, trackColor, children }: {
  value: number; max: number; size?: number; strokeWidth?: number; color: string; trackColor: string; children: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const offset = circumference * (1 - pct);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

export function HealthMetricsPanel() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { icon: Heart, label: "Heart Rate", value: 72, max: 180, unit: "BPM", color: "hsl(0 75% 55%)", trackColor: "hsl(0 20% 90%)" },
    { icon: Thermometer, label: "Body Temp", value: 36.5, max: 42, unit: "°C", color: "hsl(38 95% 50%)", trackColor: "hsl(38 30% 90%)" },
    { icon: Wind, label: "Oxygen", value: 97, max: 100, unit: "%", color: "hsl(195 85% 42%)", trackColor: "hsl(195 30% 90%)" },
    { icon: ShieldAlert, label: "Risk Score", value: 12, max: 100, unit: "pts", color: "hsl(152 70% 42%)", trackColor: "hsl(152 20% 90%)" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => prev.map((m) => {
        if (m.label === "Heart Rate") return { ...m, value: Math.floor(65 + Math.random() * 40) };
        if (m.label === "Body Temp") return { ...m, value: +(36 + Math.random() * 1.5).toFixed(1) };
        if (m.label === "Oxygen") return { ...m, value: Math.floor(94 + Math.random() * 6) };
        if (m.label === "Risk Score") return { ...m, value: Math.floor(5 + Math.random() * 35) };
        return m;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card rounded-lg border border-border/50 shadow-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-5">Health Metrics</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="flex flex-col items-center gap-2 group">
              <CircularProgress value={m.value} max={m.max} color={m.color} trackColor={m.trackColor}>
                <span className="text-lg font-bold tabular-nums text-foreground">{m.value}</span>
                <span className="text-[9px] uppercase text-muted-foreground">{m.unit}</span>
              </CircularProgress>
              <div className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-xs font-medium text-muted-foreground">{m.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
