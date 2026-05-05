import { AlertTriangle, Clock, CheckCircle2, Camera } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { StatusChip } from "./StatusChip";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface FallEvent {
  id: string;
  message_text: string | null;
  image_url: string | null;
  confirmed: boolean;
  dismissed: boolean;
  created_at: string;
}

export function AlertCard() {
  const [latestEvent, setLatestEvent] = useState<FallEvent | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLatest = async () => {
    const { data } = await supabase
      .from("fall_events")
      .select("*")
      .eq("confirmed", false)
      .eq("dismissed", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setLatestEvent(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLatest();

    const channel = supabase
      .channel("fall-events-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "fall_events" },
        () => {
          fetchLatest();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleConfirm = async () => {
    if (!latestEvent) return;
    await supabase
      .from("fall_events")
      .update({ confirmed: true })
      .eq("id", latestEvent.id);
  };

  const handleDismiss = async () => {
    if (!latestEvent) return;
    await supabase
      .from("fall_events")
      .update({ dismissed: true })
      .eq("id", latestEvent.id);
  };

  const hasActiveAlert = !!latestEvent;
  const timestamp = latestEvent
    ? new Date(latestEvent.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <DashboardCard
      title="Active Alert"
      subtitle={hasActiveAlert ? "Requires immediate attention" : "No active alerts"}
      headerAction={
        hasActiveAlert ? (
          <StatusChip label="Pending" variant="danger" pulse />
        ) : (
          <StatusChip label="All Clear" variant="success" />
        )
      }
    >
      <div className="space-y-4">
        {/* Alert Image Preview */}
        <div className="relative aspect-video bg-gradient-to-br from-danger-light to-muted rounded-lg overflow-hidden">
          {latestEvent?.image_url ? (
            <img
              src={latestEvent.image_url}
              alt="Fall detection snapshot"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-8 h-8 text-danger/40 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">
                  {hasActiveAlert ? "No image attached" : "Waiting for alerts..."}
                </p>
              </div>
            </div>
          )}
          {hasActiveAlert && (
            <div className="absolute top-2 left-2">
              <StatusChip label="Fall Detected" variant="danger" pulse />
            </div>
          )}
        </div>

        {/* Alert Details */}
        <div
          className={`flex items-start gap-3 p-3 rounded-lg border ${
            hasActiveAlert
              ? "bg-danger-light/50 border-danger/10"
              : "bg-success-light/50 border-success/10"
          }`}
        >
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
              hasActiveAlert ? "bg-danger/10" : "bg-success/10"
            }`}
          >
            {hasActiveAlert ? (
              <AlertTriangle className="w-5 h-5 text-danger" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-success" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">
              {hasActiveAlert
                ? latestEvent.message_text || "Fall detected"
                : "No incidents detected"}
            </p>
            {hasActiveAlert && (
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{timestamp}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {hasActiveAlert && (
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
              onClick={handleConfirm}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Confirm
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleDismiss}>
              Dismiss
            </Button>
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
