import GraphReadings from "./components/GraphData";
import LiveReadings from "./components/SensorData";
import { Sprout } from 'lucide-react';

export default function Home() {
  return (
    <div className="px-15 pt-7 pb-5">
      <div className="pb-3 flex justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-title">Plant Dashboard</h1>
          <h2 className="text-subtitle">Indoor Smart Watering System</h2>
        </div>
        <div className="flex items-center bg-card border-2 border-border rounded-2xl p-3 justify-center">
          <div className="w-10 h-10 bg-icon rounded-xl flex items-center justify-center">
            <Sprout size={20} strokeWidth={1.5} className="text-[#4a9d6e]"/>
          </div>
          <div className="pl-3">
            <h2 className="text-title text-sm font-semibold mb-0">Butterhead Lettuce</h2>
            <p className="text-subtitle italic text-xs">Lactuca sativa</p>
            <div className="flex">
              <p className="text-[#4a9d6e] text-xs pr-1">Seedling-Vegetative</p>
              <p className="text-subtitle text-xs">· Day 23</p>
            </div>
          </div>
        </div>
      </div>
      <h4 className="text-xs tracking-[0.11em] text-subtitle font-bold pb-5">LIVE READINGS</h4>
      <LiveReadings/>
      <GraphReadings/>
    </div>
  );
}