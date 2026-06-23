import GraphReadings from "./components/GraphData";
import LiveReadings from "./components/SensorData";
import SystemStatus from "./components/SystemStatus";
import MobileTabs from "./components/MobileTabs";
import PlantCard from "./components/PlantCard";

export default function Home() {
  return (
    <div className="px-4 sm:px-8 lg:px-15 pt-7 pb-5">

      {/* Header: title row, plant card drops below on mobile, sits inline on desktop */}
      <div className="pb-5 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start lg:gap-0 lg:pb-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-title">Plant Dashboard</h1>
          <h2 className="text-subtitle text-sm sm:text-base">Indoor Smart Watering System</h2>
        </div>
        <div className="w-full lg:w-auto">
          <PlantCard/>
        </div>
      </div>

      <MobileTabs
        overview={
          <>
            <h4 className="text-xs tracking-[0.11em] text-subtitle font-bold pb-5">LIVE READINGS</h4>
            <LiveReadings/>
            <div className="pt-4">
              <SystemStatus/>
            </div>
          </>
        }
        trends={<GraphReadings/>}
      />
    </div>
  );
}
