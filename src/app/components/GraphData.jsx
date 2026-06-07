'use client'

import { useState, useEffect } from 'react'
import GraphCard from '@/app/components/GraphCard'
import { Droplets, Thermometer, Sun} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import { formatDecimal, soilRawToPerc } from '@/lib/formatters';

export default function GraphReadings() {

    const [oneDayGraphData, setOneDayGraphData] = useState([]);
    const [liveReading, setLiveReading] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/telemetry/history')
            const json = await response.json()
            setOneDayGraphData(json.oneDayData)
        }
        fetchData()
    }, [])

    // Duplicate fetch but acceptable for now
    useEffect(() => {
    const fetchLiveReading = async () => {
            const response = await fetch('/api/telemetry')
            const json = await response.json()
            setLiveReading(json.data)
    }
        fetchLiveReading()
            const interval = setInterval(fetchLiveReading, 30000)
            return () => clearInterval(interval)
    }, [])

    console.log(oneDayGraphData);

    const percSoilReading = oneDayGraphData.map((reading) => ({
    ...reading,
    avgSoil: soilRawToPerc(reading.avgSoil)
}))

    return (
        <div className="grid grid-cols-2 gap-6 mt-6">
            <GraphCard icon={<Droplets size={26} strokeWidth={1.5} className="text-svg"/>}
            graphTitle="Soil Moisture"
            graphLiveReading={`${soilRawToPerc(liveReading?.sensors?.soilRaw)}%`} 
            chart={
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={percSoilReading} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                        <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="_id"
                            tickFormatter={(value) => new Date(value).getHours() + ":00"}
                            stroke="#52525b"
                            tick={{ fill: "#a1a1aa", fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#52525b"
                            tick={{ fill: "#a1a1aa", fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                            width={40}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1a1a1a",
                                border: "1px solid #2a2a2a",
                                borderRadius: "8px",
                                color: "#f4f4f5"
                            }}
                            labelFormatter={(value) => new Date(value).getHours() + ":00"}
                            formatter={(value) => formatDecimal(value)}
                        />
                        <Line
                            type="monotone"
                            dataKey="avgSoil"
                            stroke="#38bdf8"
                            strokeWidth={2}
                            dot={false}
                            name="Soil Moisture"
                        />
                    </LineChart>
                </ResponsiveContainer>
            }/>

            <GraphCard icon={<Thermometer size={26} strokeWidth={1.5} className='text-svg'/>}
            graphTitle="Temperature & Humidity"
            chart={<ResponsiveContainer>
                <AreaChart data={oneDayGraphData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                {/* <Legend wrapperStyle={{ color: "#a1a1aa", fontSize: "12px" }} /> */}
                <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="humGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0} />
                    </linearGradient>
                </defs>
                    <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="_id"
                        tickFormatter={(value) => new Date(value).getHours() + ":00"}
                        stroke="#52525b"
                        tick={{ fill: "#a1a1aa", fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#52525b"
                        tick={{ fill: "#a1a1aa", fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                        width={40}
                    />
                    <Tooltip
                            contentStyle={{
                                backgroundColor: "#1a1a1a",
                                border: "1px solid #2a2a2a",
                                borderRadius: "8px",
                                color: "#f4f4f5"
                            }}
                            labelFormatter={(value) => new Date(value).getHours() + ":00"}
                            formatter={(value) => formatDecimal(value)}
                        />
                    <Area type="monotone" dataKey="avgTemp" stroke="#f97316" fill="url(#tempGradient)" fillOpacity={0.2} strokeWidth={2} name="Temperature" />
                    <Area type="monotone" dataKey="avgHum" stroke="#2dd4bf" fill="url(#humGradient)" fillOpacity={0.2} strokeWidth={2} name="Humidity" />
                </AreaChart>
            </ResponsiveContainer>}/>

            <GraphCard icon={<Sun size={26} strokeWidth={1.5} className='text-svg'/>}
            graphTitle="Light Level"
            graphLiveReading={liveReading?.sensors?.lightRaw}
            chart={
                <ResponsiveContainer>
                    <AreaChart>
                    </AreaChart>
                </ResponsiveContainer>
            }/>

            <GraphCard/>

        </div>
    )
}