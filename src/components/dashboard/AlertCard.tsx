import { AlertTriangle, Clock, CheckCircle2, Camera } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { StatusChip } from "./StatusChip";
import { Button } from "@/components/ui/button";

interface Alert {
  id: string;
  type: "fall" | "warning" | "info";
  message: string;
  timestamp: string;
  confirmed: boolean;
  imageUrl?: string;
}

const mockAlert: Alert = {
  id: "1",
  type: "fall",
  message: "Fall detected in living room",
  timestamp: "10:42 AM",
  confirmed: false,
};

export function AlertCard() {
  return (
    <DashboardCard
      title="Active Alert"
      subtitle="Requires immediate attention"
      headerAction={<StatusChip label="Pending" variant="danger" pulse />}
    >
      <div className="space-y-4">
        {/* Alert Image Preview */}
        <div className="relative aspect-video bg-gradient-to-br from-danger-light to-muted rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Camera className="w-8 h-8 text-danger/40 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Snapshot captured</p>
            </div>
          </div>
          <div className="absolute top-2 left-2">
            <StatusChip label="Fall Detected" variant="danger" pulse />
          </div>
        </div>

        {/* Alert Details */}
        <div className="flex items-start gap-3 p-3 bg-danger-light/50 rounded-lg border border-danger/10">
          <div className="w-9 h-9 rounded-lg bg-danger/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-danger" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{mockAlert.message}</p>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{mockAlert.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1 bg-success hover:bg-success/90 text-success-foreground">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Confirm
          </Button>
          <Button variant="outline" className="flex-1">
            Dismiss
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
}
