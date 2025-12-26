import { Heart, Thermometer, ShieldAlert, Smile } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { LiveMonitoringPanel } from "@/components/dashboard/LiveMonitoringPanel";
import { HealthMetricCard } from "@/components/dashboard/HealthMetricCard";
import { RobotControlPanel } from "@/components/dashboard/RobotControlPanel";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { ActivityLog } from "@/components/dashboard/ActivityLog";
import { SystemStatusBar } from "@/components/dashboard/SystemStatusBar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col gradient-mesh">
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Health Metrics Grid - Top Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <HealthMetricCard
              icon={Heart}
              label="Heart Rate"
              value={72}
              unit="BPM"
              subtext="Resting • Last 5 min avg"
              status="normal"
            />
            <HealthMetricCard
              icon={Thermometer}
              label="Body Temp"
              value={36.5}
              unit="°C"
              subtext="Stable range"
              status="normal"
            />
            <HealthMetricCard
              icon={ShieldAlert}
              label="Fall Status"
              value="Normal"
              subtext="No incidents today"
              status="normal"
            />
            <HealthMetricCard
              icon={Smile}
              label="Emotion"
              value="—"
              subtext="Coming Soon"
              status="normal"
            />
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column - Live Monitoring (60%) */}
            <div className="lg:col-span-3">
              <LiveMonitoringPanel />
            </div>

            {/* Right Column - Alerts & Control (40%) */}
            <div className="lg:col-span-2 space-y-6">
              <AlertCard />
              <RobotControlPanel />
            </div>
          </div>

          {/* Bottom Section - Activity Log */}
          <div className="mt-6">
            <ActivityLog />
          </div>
        </div>
      </main>

      {/* System Status Bar */}
      <SystemStatusBar />
    </div>
  );
};

export default Index;
