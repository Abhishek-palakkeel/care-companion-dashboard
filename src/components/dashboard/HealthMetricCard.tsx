import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HealthMetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  status?: "normal" | "warning" | "danger";
  trend?: "up" | "down" | "stable";
}

const statusColors = {
  normal: "bg-success-light text-success",
  warning: "bg-warning-light text-warning",
  danger: "bg-danger-light text-danger",
};

const iconBgColors = {
  normal: "bg-primary/10 text-primary",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
};

export function HealthMetricCard({
  icon: Icon,
  label,
  value,
  unit,
  subtext,
  status = "normal",
}: HealthMetricCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border/50 shadow-card p-5 transition-all duration-200 hover:shadow-card-lg hover:-translate-y-0.5 group">
      <div className="flex items-start justify-between mb-3">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
            iconBgColors[status]
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div
          className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium",
            statusColors[status]
          )}
        >
          {status === "normal" ? "Normal" : status === "warning" ? "Caution" : "Alert"}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-3xl font-bold text-foreground tabular-nums">
            {value}
          </span>
          {unit && (
            <span className="text-sm font-medium text-muted-foreground">{unit}</span>
          )}
        </div>
        {subtext && (
          <p className="text-xs text-muted-foreground mt-1.5">{subtext}</p>
        )}
      </div>
    </div>
  );
}
