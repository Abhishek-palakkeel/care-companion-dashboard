import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DashboardCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
  noPadding?: boolean;
}

export function DashboardCard({
  title,
  subtitle,
  children,
  className,
  headerAction,
  noPadding = false,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-lg border border-border/50 shadow-card transition-all duration-200 hover:shadow-card-lg",
        className
      )}
    >
      {(title || headerAction) && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
          {headerAction}
        </div>
      )}
      <div className={cn(!noPadding && "p-5")}>{children}</div>
    </div>
  );
}
