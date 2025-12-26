import { Battery, Wifi, Cpu, HardDrive, ThermometerSun } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  status?: "good" | "warning" | "error";
}

function StatusItem({ icon, label, value, status = "good" }: StatusItemProps) {
  const statusColors = {
    good: "text-success",
    warning: "text-warning",
    error: "text-danger",
  };

  return (
    <div className="flex items-center gap-2">
      <span className={cn("text-muted-foreground", statusColors[status])}>
        {icon}
      </span>
      <span className="text-xs text-muted-foreground">{label}:</span>
      <span className={cn("text-xs font-medium", statusColors[status])}>
        {value}
      </span>
    </div>
  );
}

export function SystemStatusBar() {
  return (
    <div className="bg-card border-t border-border px-6 py-3">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <StatusItem
            icon={<Battery className="w-4 h-4" />}
            label="Battery"
            value="87%"
            status="good"
          />
          <StatusItem
            icon={<Wifi className="w-4 h-4" />}
            label="Network"
            value="Connected"
            status="good"
          />
          <StatusItem
            icon={<Cpu className="w-4 h-4" />}
            label="RPi Status"
            value="Active"
            status="good"
          />
        </div>

        <div className="flex items-center gap-6">
          <StatusItem
            icon={<HardDrive className="w-4 h-4" />}
            label="Storage"
            value="12.4 GB free"
            status="good"
          />
          <StatusItem
            icon={<ThermometerSun className="w-4 h-4" />}
            label="CPU Temp"
            value="42°C"
            status="good"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>All systems operational</span>
        </div>
      </div>
    </div>
  );
}
