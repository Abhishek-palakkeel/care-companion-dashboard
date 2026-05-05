import { Heart, Thermometer, ShieldAlert, Smile } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { LiveMonitoringPanel } from "@/components/dashboard/LiveMonitoringPanel";
import { HealthMetricCard } from "@/components/dashboard/HealthMetricCard";
import { RobotControlPanel } from "@/components/dashboard/RobotControlPanel";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { ActivityLog } from "@/components/dashboard/ActivityLog";
import { SystemStatusBar } from "@/components/dashboard/SystemStatusBar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [fallStatus, setFallStatus] = useState<"normal" | "danger">("normal");
  const [fallText, setFallText] = useState("No incidents today");

  useEffect(() => {
    const checkFall = async () => {
      const { data } = await supabase
        .from("fall_events")
        .select("*")
        .eq("confirmed", false)
        .eq("dismissed", false)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data) {
        setFallStatus("danger");
        setFallText(data.message_text || "Fall detected!");
      } else {
        setFallStatus("normal");
        setFallText("No incidents today");
      }
    };

    checkFall();

    const channel = supabase
      .channel("fall-status-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "fall_events" }, () => {
        checkFall();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col gradient-mesh">
      <DashboardHeader />
      <main className="flex-1 p-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <HealthMetricCard icon={Heart} label="Heart Rate" value={72} unit="BPM" subtext="Resting • Last 5 min avg" status="normal" />
            <HealthMetricCard icon={Thermometer} label="Body Temp" value={36.5} unit="°C" subtext="Stable range" status="normal" />
            <HealthMetricCard icon={ShieldAlert} label="Fall Status" value={fallStatus === "danger" ? "ALERT" : "Normal"} subtext={fallText} status={fallStatus} />
            <HealthMetricCard icon={Smile} label="Emotion" value="—" subtext="Coming Soon" status="normal" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <LiveMonitoringPanel />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <AlertCard />
              <RobotControlPanel />
            </div>
          </div>
          <div className="mt-6">
            <ActivityLog />
          </div>
        </div>
      </main>
      <SystemStatusBar />
    </div>
  );
};

export default Index;
