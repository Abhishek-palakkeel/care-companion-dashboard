import { DashboardCard } from "./DashboardCard";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LogEntry {
  id: string;
  time: string;
  event: string;
  type: "info" | "warning" | "danger" | "success";
}

const mockLogs: LogEntry[] = [
  { id: "1", time: "10:45", event: "Caregiver confirmed emergency response", type: "success" },
  { id: "2", time: "10:43", event: "Telegram alert sent to caregiver", type: "info" },
  { id: "3", time: "10:42", event: "Fall detected - Emergency protocol initiated", type: "danger" },
  { id: "4", time: "10:38", event: "Heart rate elevated: 95 BPM", type: "warning" },
  { id: "5", time: "10:30", event: "Routine health check completed", type: "info" },
  { id: "6", time: "10:15", event: "Face recognition successful - Patient identified", type: "success" },
  { id: "7", time: "10:00", event: "Morning tracking session started", type: "info" },
  { id: "8", time: "09:55", event: "System boot completed", type: "info" },
];

const typeStyles = {
  info: "bg-info/10 border-info/20",
  warning: "bg-warning/10 border-warning/20",
  danger: "bg-danger/10 border-danger/20",
  success: "bg-success/10 border-success/20",
};

const dotStyles = {
  info: "bg-info",
  warning: "bg-warning",
  danger: "bg-danger",
  success: "bg-success",
};

export function ActivityLog() {
  return (
    <DashboardCard title="Activity Log" subtitle="System events & notifications" noPadding>
      <ScrollArea className="h-[280px]">
        <div className="px-5 py-3">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-border" />

            {/* Log Entries */}
            <div className="space-y-3">
              {mockLogs.map((log, index) => (
                <div
                  key={log.id}
                  className={cn(
                    "flex items-start gap-4 p-3 rounded-lg border transition-all duration-200 hover:shadow-sm animate-fade-in",
                    typeStyles[log.type]
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-mono text-muted-foreground font-medium">
                      {log.time}
                    </span>
                    <div className={cn("w-2 h-2 rounded-full", dotStyles[log.type])} />
                  </div>
                  <p className="text-sm text-foreground flex-1">{log.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </DashboardCard>
  );
}
