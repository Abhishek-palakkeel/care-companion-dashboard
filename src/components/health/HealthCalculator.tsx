import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "normal" | "warning" | "critical" | null;

const statusConfig = {
  normal: { label: "Normal", className: "bg-success/10 text-success border-success/30" },
  warning: { label: "Warning", className: "bg-warning/10 text-warning border-warning/30" },
  critical: { label: "Critical", className: "bg-danger/10 text-danger border-danger/30" },
};

export function HealthCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiStatus, setBmiStatus] = useState<Status>(null);
  const [hrStatus, setHrStatus] = useState<Status>(null);

  const calculate = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const hr = parseInt(heartRate);

    if (h > 0 && w > 0) {
      const b = +(w / (h * h)).toFixed(1);
      setBmi(b);
      if (b < 18.5 || b > 30) setBmiStatus("critical");
      else if (b < 20 || b > 25) setBmiStatus("warning");
      else setBmiStatus("normal");
    }

    if (hr > 0) {
      if (hr > 120 || hr < 50) setHrStatus("critical");
      else if (hr > 100 || hr < 60) setHrStatus("warning");
      else setHrStatus("normal");
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border/50 shadow-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Health Calculator</h3>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <Label className="text-xs text-muted-foreground">Height (cm)</Label>
          <Input type="number" placeholder="170" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1 h-9 text-sm" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Weight (kg)</Label>
          <Input type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1 h-9 text-sm" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Heart Rate</Label>
          <Input type="number" placeholder="72" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} className="mt-1 h-9 text-sm" />
        </div>
      </div>

      <Button onClick={calculate} className="w-full h-9 text-sm">Evaluate</Button>

      {(bmi !== null || hrStatus) && (
        <div className="grid grid-cols-2 gap-3 mt-4 animate-fade-in">
          {bmi !== null && bmiStatus && (
            <div className={cn("p-3 rounded-lg border text-center", statusConfig[bmiStatus].className)}>
              <p className="text-[10px] uppercase tracking-wider opacity-70">BMI</p>
              <p className="text-xl font-bold tabular-nums">{bmi}</p>
              <p className="text-xs font-medium">{statusConfig[bmiStatus].label}</p>
            </div>
          )}
          {hrStatus && (
            <div className={cn("p-3 rounded-lg border text-center", statusConfig[hrStatus].className)}>
              <p className="text-[10px] uppercase tracking-wider opacity-70">Heart Rate</p>
              <p className="text-xl font-bold tabular-nums">{heartRate} BPM</p>
              <p className="text-xs font-medium">{statusConfig[hrStatus].label}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
