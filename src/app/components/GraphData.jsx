'use client'

import { useState, useEffect } from 'react'
import GraphCard from '@/app/components/GraphCard'
import { Droplets, Thermometer, Sun, Power, Lightbulb } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { formatDecimal, lightRawToPerc, soilRawToPerc, milliToString, milliToTime } from '@/lib/formatters';

export default function GraphReadings() {

    const [oneDayGraphData, setOneDayGraphData] = useState([]);
    const [liveReading, setLiveReading] = useState(null);
    const [actuatorData, setActuatorData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/telemetry/history')
            const json = await response.json()
            setOneDayGraphData(json.oneDayData)
        }
        fetchData()
        // No interval for now, only activates on page load...
    }, [])

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

    useEffect(() => {
        const fetchActuatorData = async () => {
            const response = await fetch('/api/telemetry/actuators')
            const json = await response.json()
            const growLightData = json.outputGL;
            const pumpData = json.outputWP;
            setActuatorData(json)
        }
        fetchActuatorData()
            const interval = setInterval(fetchActuatorData, 60000)
            return () => clearInterval(interval)
    }, [])

    // Converting Soil Readings to percentages
    const percSoilReading = oneDayGraphData.map((reading) => ({
    ...reading,
    avgSoil: soilRawToPerc(reading.avgSoil)
    }))

    // Converting string timestamps to Date objects
    let timelineData = actuatorData?.outputGL?.map((item) => ({
    ...item,
    period: [new Date(item.period[0]).getTime(), new Date(item.period[1]).getTime()]
}   )) || []

    // Actuator Card Data - Supplemental Light
    let suppLight = (timelineData) => {
            let duration = 0;
            for (let i = 0; i < timelineData.length; i++) {
                if (timelineData[i].actuator === "Grow Light") {
                    duration += timelineData[i].period[1] - timelineData[i].period[0];
                }
            }
            return duration
    }

    // Actuator Card Data - Last Grow Light Activation
    let lastGlActive = (timelineData) => {
        if (timelineData.length > 0) {
            return (timelineData[timelineData.length - 1].period[0])
        } else { return "None"}
    }

    // Actuator Data - Natural light
    let naturalLight = (liveReading, timelineData) => {
        let lightTime = ((liveReading?.system?.upperWindowTimeLimit) - (liveReading?.system?.lowerWindowTimeLimit)) * 3600000;
        return lightTime - suppLight(timelineData);
    }

    // Actuator Data - Water Delivery (in ml) (hardcoded...)
    let waterDelivered = () => {
    const activations = actuatorData?.outputWP?.activations;
        if (activations) {
            return activations * 80;
        } else { return 0 }
    }   

    // Actuator Data - Number of Activations
    let activationNumber = () => {
        const activations = actuatorData?.outputWP?.activations;
        if (activations) {
            return activations
        } else { return 0 }
    }

    function ActuatorStatus({ icon, title, items }) {
    return (
        <div className='h-full flex flex-col justify-center'>
            <div className='flex flex-row items-center'>
                <div>{icon}</div>
                <h2 className='text-lg text-title font-semibold pl-3'>{title}</h2>
            </div>
            <div className='flex flex-col gap-4 pt-5'>
                {items.map((item) => (
                    <div key={item.label}>
                        <h2 className='text-subtitle pl-4'>{item.label}</h2>
                        <p className='text-title pl-4 font-bold'>{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            <h4 className="lg:col-span-full text-xs tracking-[0.11em] text-subtitle font-bold">TRENDS · PAST 24 HOURS</h4>

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
            graphLiveReading={`${lightRawToPerc(liveReading?.sensors?.lightRaw)}%`}
            chart={
            <ResponsiveContainer>
                <AreaChart data={oneDayGraphData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                    <defs>
                        <linearGradient id="lightGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#facc15" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#facc15" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" vertical={false} />
                <XAxis
                    dataKey="_id"
                    tickFormatter={(value) => new Date(value).getHours() + ":00"}
                    stroke="#52525b"
                    tick={{ fill: "#a1a1aa", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}/>
                <YAxis
                    stroke="#52525b"
                    tick={{ fill: "#a1a1aa", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    width={40}
                    domain={[0, 100]}/>
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #2a2a2a",
                        borderRadius: "8px",
                        color: "#f4f4f5" }}
                    labelFormatter={(value) => new Date(value).getHours() + ":00"}
                    formatter={(value) => `${formatDecimal(value)}%`}/>
                <Area
                    type="monotone"
                    dataKey="avgLight"
                    stroke="#facc15"
                    strokeWidth={2}
                    fill="url(#lightGradient)"
                    name="Light Level"/>
                </AreaChart>
            </ResponsiveContainer>}
            readingNote="Light readings are relative to this sensor and show brightness trends rather than exact lux values."/>

            <div className='w-full h-auto sm:h-80 bg-card border-2 border-border rounded-2xl p-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 h-full relative gap-6 sm:gap-0'>
                    {/* Left column — Grow Light */}
                    <div className='sm:pr-6'>
                        <ActuatorStatus
                            icon={<Lightbulb size={26} strokeWidth={1.5} className="text-svg"/>}
                            title="Grow Light"
                            items={[
                                { label: "Supplemental Light", value: milliToString(suppLight(timelineData)) },
                                { label: "Natural Light", value: milliToString(naturalLight(liveReading, timelineData)) },
                                { label: "Last Activation", value: milliToTime(lastGlActive(timelineData)) },
                            ]}
                        />
                    </div>

                    {/* Divider: vertical on desktop, horizontal on mobile */}
                    <div className='hidden sm:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2'></div>

                    <div className='sm:pl-6'>
                        <ActuatorStatus
                            icon={<Power size={26} strokeWidth={1.5} className='text-svg'/>}
                            title="Water Pump"
                            items={[
                                { label: "Activations", value: activationNumber() },
                                { label: "Water Delivered", value: `${waterDelivered()} ml` },
                                { label: "Last Activation", value: actuatorData?.outputWP?.lastActivation ? milliToTime(actuatorData?.outputWP?.lastActivation) : "None" },
                            ]}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
