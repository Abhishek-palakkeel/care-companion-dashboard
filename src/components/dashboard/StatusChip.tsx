import { cn } from "@/lib/utils";

type StatusVariant = "success" | "warning" | "danger" | "info" | "muted";

interface StatusChipProps {
  label: string;
  variant: StatusVariant;
  pulse?: boolean;
  className?: string;
}

const variantStyles: Record<StatusVariant, string> = {
  success: "bg-success-light text-success border-success/20",
  warning: "bg-warning-light text-warning border-warning/20",
  danger: "bg-danger-light text-danger border-danger/20",
  info: "bg-info-light text-info border-info/20",
  muted: "bg-muted text-muted-foreground border-border",
};

export function StatusChip({ label, variant, pulse, className }: StatusChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              variant === "success" && "bg-success",
              variant === "warning" && "bg-warning",
              variant === "danger" && "bg-danger",
              variant === "info" && "bg-info"
            )}
          />
          <span
            className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              variant === "success" && "bg-success",
              variant === "warning" && "bg-warning",
              variant === "danger" && "bg-danger",
              variant === "info" && "bg-info"
            )}
          />
        </span>
      )}
      {label}
    </div>
  );
}
