import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SystemStatusBar } from "@/components/dashboard/SystemStatusBar";
import { HealthEvaluator } from "@/components/health/HealthEvaluator";
import { SystemLogs } from "@/components/health/SystemLogs";
import { HealthMetricsPanel } from "@/components/health/HealthMetricsPanel";
import { HealthCalculator } from "@/components/health/HealthCalculator";

const HealthTools = () => {
  return (
    <div className="min-h-screen flex flex-col gradient-mesh">
      <DashboardHeader />
      <main className="flex-1 p-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Health Metrics — full width */}
          <HealthMetricsPanel />

          {/* Two-column: Evaluator + Calculator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HealthEvaluator />
            <HealthCalculator />
          </div>

          {/* System Logs — full width */}
          <SystemLogs />
        </div>
      </main>
      <SystemStatusBar />
    </div>
  );
};

export default HealthTools;
