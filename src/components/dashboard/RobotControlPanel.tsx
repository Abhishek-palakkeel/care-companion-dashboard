import { Play, Square, Mic, Gamepad2 } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ControlButtonProps {
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "success" | "danger" | "secondary";
  onClick?: () => void;
}

function ControlButton({ icon, label, variant = "default", onClick }: ControlButtonProps) {
  const variantStyles = {
    default: "bg-primary hover:bg-primary/90 text-primary-foreground",
    success: "bg-success hover:bg-success/90 text-success-foreground",
    danger: "bg-danger hover:bg-danger/90 text-danger-foreground",
    secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border",
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        "flex-1 h-auto py-4 flex flex-col items-center gap-2 transition-all duration-200 hover:-translate-y-0.5",
        variantStyles[variant]
      )}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
}

export function RobotControlPanel() {
  return (
    <DashboardCard title="Robot Control" subtitle="System commands & operations">
      <div className="grid grid-cols-2 gap-3">
        <ControlButton
          icon={<Play className="w-5 h-5" />}
          label="Start Tracking"
          variant="success"
        />
        <ControlButton
          icon={<Square className="w-5 h-5" />}
          label="Stop Tracking"
          variant="danger"
        />
        <ControlButton
          icon={<Mic className="w-5 h-5" />}
          label="Voice Command"
          variant="default"
        />
        <ControlButton
          icon={<Gamepad2 className="w-5 h-5" />}
          label="Manual Control"
          variant="secondary"
        />
      </div>
    </DashboardCard>
  );
}
