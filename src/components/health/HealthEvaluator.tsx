import { cn } from "@/lib/utils";
import { Activity, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

type RiskLevel = "normal" | "moderate" | "critical";

interface EvalState {
  heartRate: number;
  temperature: number;
  fallDetected: boolean;
  risk: RiskLevel;
  summary: string;
}

function evaluate(hr: number, temp: number, fall: boolean): { risk: RiskLevel; summary: string } {
  if (fall || hr > 120 || hr < 45 || temp > 39 || temp < 35) {
    return { risk: "critical", summary: "Immediate attention required — abnormal vitals detected." };
  }
  if (hr > 100 || hr < 55 || temp > 37.8 || temp < 36) {
    return { risk: "moderate", summary: "Mild irregularities detected — monitoring closely." };
  }
  return { risk: "normal", summary: "Patient condition stable — all vitals within range." };
}

const riskConfig = {
  normal: { label: "Normal", color: "text-success", bg: "bg-success/10 border-success/30", icon: CheckCircle },
  moderate: { label: "Moderate Risk", color: "text-warning", bg: "bg-warning/10 border-warning/30", icon: AlertTriangle },
  critical: { label: "Critical Condition", color: "text-danger", bg: "bg-danger/10 border-danger/30", icon: XCircle },
};

export function HealthEvaluator() {
  const [state, setState] = useState<EvalState>({
    heartRate: 72,
    temperature: 36.5,
    fallDetected: false,
    risk: "normal",
    summary: "Patient condition stable — all vitals within range.",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const hr = Math.floor(60 + Math.random() * 50);
      const temp = +(35.5 + Math.random() * 3).toFixed(1);
      const fall = Math.random() < 0.05;
      const { risk, summary } = evaluate(hr, temp, fall);
      setState({ heartRate: hr, temperature: temp, fallDetected: fall, risk, summary });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const cfg = riskConfig[state.risk];
  const Icon = cfg.icon;

  return (
    <div className="bg-card rounded-lg border border-border/50 shadow-card p-5 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Health Evaluator</h3>
      </div>

      <div className={cn("flex items-center gap-3 p-3 rounded-lg border transition-all duration-500", cfg.bg)}>
        <Icon className={cn("w-8 h-8 shrink-0", cfg.color)} />
        <div>
          <p className={cn("text-sm font-bold", cfg.color)}>{cfg.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{state.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { label: "Heart Rate", value: `${state.heartRate} BPM` },
          { label: "Temperature", value: `${state.temperature}°C` },
          { label: "Fall", value: state.fallDetected ? "DETECTED" : "None" },
        ].map((m) => (
          <div key={m.label} className="text-center p-2 rounded-md bg-muted/50">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</p>
            <p className={cn("text-sm font-bold tabular-nums mt-0.5", m.value === "DETECTED" ? "text-danger" : "text-foreground")}>
              {m.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
