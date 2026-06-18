'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import SensorCard from "@/app/components/SensorCard"
import { Droplets, Thermometer, Bubbles, Power, Lightbulb } from 'lucide-react';
import { stringConversion, formatDecimal, getSoilStyles, getGLStyles } from '@/lib/formatters';

export default function LiveReadings() {

    const [sensorData, setSensorData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/telemetry')
            const json = await response.json()
            setSensorData(json.data)
        }

        fetchData()
        const interval = setInterval(fetchData, 30000)
        return () => clearInterval(interval)
    }, [])

    console.log(sensorData);
    const soilStyles = getSoilStyles(sensorData?.sensors?.soilState);
    const glStyles = getGLStyles(sensorData?.actuators?.growLightOn);

    return (
    <div className="grid grid-cols-5 col-span-full gap-x-5 pb-3">

        <SensorCard title="SOIL MOISTURE" icon={<Droplets size={26} strokeWidth={1.5} 
            className={soilStyles.iconColor}/>} 
            iconBgColor={soilStyles.bgColor} 
            soilFont={soilStyles.fontColor} 
            data={sensorData?.sensors?.soilState}/>

        <SensorCard title="TEMPERATURE" icon={<Thermometer size={26} strokeWidth={1.5} className='text-svg'/>}
            iconBgColor="bg-icon"
            soilFont="text-title" 
            data={`${formatDecimal(sensorData?.sensors?.temperature)}°C`}/>

        <SensorCard title="HUMIDITY" icon={<Bubbles size={26} strokeWidth={1.5} className='text-svg'/>} 
            iconBgColor="bg-icon"
            soilFont="text-title" 
            data={`${formatDecimal(sensorData?.sensors?.humidity)}%`}/>

        <SensorCard title="PUMP STATUS" icon={<Power size={26} strokeWidth={1.5} className='text-valInactive'/>}
            iconBgColor="bg-icon"
            soilFont="text-valInactive" 
            data={stringConversion(sensorData?.actuators?.pumpActivated)}/>

        <SensorCard title="GROW LIGHT" icon={<Lightbulb size={26} strokeWidth={1.5} className={glStyles.iconColor}/>}
            iconBgColor={glStyles.bgColor}
            soilFont={glStyles.fontColor} 
            data={stringConversion(sensorData?.actuators?.growLightOn)}/>
    </div>
    )
}
