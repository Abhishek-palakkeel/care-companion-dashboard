import { Video, Maximize2 } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { StatusChip } from "./StatusChip";
import { Button } from "@/components/ui/button";

export function LiveMonitoringPanel() {
  return (
    <DashboardCard
      title="Live Monitoring"
      subtitle="Real-time camera feed & AI tracking"
      headerAction={
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Maximize2 className="h-4 w-4" />
        </Button>
      }
      noPadding
      className="h-full"
    >
      <div className="relative aspect-video bg-gradient-to-br from-muted to-secondary rounded-b-lg overflow-hidden">
        {/* Simulated Camera Feed */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Video className="w-10 h-10 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Camera Feed Active</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Raspberry Pi • 1080p @ 30fps</p>
          </div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Status Chips */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <StatusChip label="Face Detected" variant="success" pulse />
          <StatusChip label="Pose Tracking" variant="info" pulse />
        </div>

        {/* Recording Indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-foreground/80 backdrop-blur-sm text-background px-3 py-1.5 rounded-full">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-danger" />
          </span>
          <span className="text-xs font-medium">LIVE</span>
        </div>

        {/* Timestamp */}
        <div className="absolute bottom-4 left-4 bg-foreground/60 backdrop-blur-sm text-background px-3 py-1.5 rounded-md">
          <span className="text-xs font-mono">2025-12-26 14:32:45</span>
        </div>

        {/* AI Tracking Box Simulation */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 border-2 border-primary rounded-lg opacity-60 animate-pulse-ring" />
      </div>
    </DashboardCard>
  );
}
