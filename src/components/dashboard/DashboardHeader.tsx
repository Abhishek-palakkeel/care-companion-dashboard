import { Bot, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-glow">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">CareMate</h1>
            <p className="text-xs text-muted-foreground">AI Elderly Care Companion</p>
          </div>
        </div>

        {/* Status & Time */}
        <div className="hidden md:flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Patient: John Smith</p>
            <p className="text-xs text-muted-foreground">Room 204 • Age 78</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-right">
            <p className="text-sm font-medium text-foreground tabular-nums">14:32:45</p>
            <p className="text-xs text-muted-foreground">Dec 26, 2025</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
