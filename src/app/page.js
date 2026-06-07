// import GraphCard from "./components/GraphCard";
import GraphReadings from "./components/GraphData";
import LiveReadings from "./components/SensorData";

export default function Home() {
  return (
    <div className="px-15 pt-8">
      <div className="pb-8">
        <h1 className="text-3xl font-bold text-title">Plant Dashboard</h1>
        <h2 className="text-subtitle">Indoor Smart Watering System</h2>
      </div>
      <LiveReadings/>
      <GraphReadings/>
    </div>
  );
}