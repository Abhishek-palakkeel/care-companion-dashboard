import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";

interface LogEntry {
  id: number;
  time: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

const logMessages: { message: string; type: LogEntry["type"] }[] = [
  { message: "Heartbeat updated: 72 BPM", type: "info" },
  { message: "Temperature recorded: 36.5°C", type: "success" },
  { message: "User movement detected — normal", type: "info" },
  { message: "Fall alert triggered!", type: "error" },
  { message: "Emergency message sent to caregiver", type: "warning" },
  { message: "Oxygen level checked: 97%", type: "success" },
  { message: "System health check: OK", type: "info" },
  { message: "Robot patrol route updated", type: "info" },
  { message: "Heartbeat updated: 78 BPM", type: "info" },
  { message: "Face recognition scan completed", type: "success" },
  { message: "Battery level: 84%", type: "info" },
  { message: "Elevated heart rate: 105 BPM", type: "warning" },
];

const typeColors = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-danger",
};

const typePrefix = {
  info: "[INFO]",
  success: "[OK]",
  warning: "[WARN]",
  error: "[ERR!]",
};

export function SystemLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const counter = useRef(0);

  useEffect(() => {
    const addLog = () => {
      const template = logMessages[Math.floor(Math.random() * logMessages.length)];
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", { hour12: false });
      counter.current += 1;
      setLogs((prev) => [...prev.slice(-40), { id: counter.current, time, ...template }]);
    };

    addLog();
    const interval = setInterval(addLog, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  return (
    <div className="bg-[hsl(220,25%,8%)] rounded-lg border border-border/30 shadow-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20 bg-[hsl(220,20%,10%)]">
        <Terminal className="w-4 h-4 text-success" />
        <h3 className="text-sm font-semibold text-[hsl(210,20%,90%)]">System Logs</h3>
        <span className="ml-auto text-[10px] font-mono text-muted-foreground animate-pulse">● LIVE</span>
      </div>
      <div ref={scrollRef} className="h-[260px] overflow-y-auto p-3 font-mono text-xs space-y-1 scrollbar-thin">
        {logs.map((log) => (
          <div key={log.id} className="animate-fade-in flex gap-2 leading-relaxed">
            <span className="text-muted-foreground shrink-0">{log.time}</span>
            <span className={cn("font-bold shrink-0", typeColors[log.type])}>{typePrefix[log.type]}</span>
            <span className="text-[hsl(210,15%,75%)]">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
