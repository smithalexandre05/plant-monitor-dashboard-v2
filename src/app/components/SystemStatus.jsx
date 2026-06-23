'use client'

import { useState, useEffect } from 'react'
import SysLogStatCard from '@/app/components/SysLogCard'
import { getWateringFormat, getLightingFormat, getClimateFormat } from '@/lib/formatters'

/*
 * SystemStatus
 * The "SYSTEM STATUS" block, extracted from GraphData.jsx so it can live under
 * the Overview tab on mobile. Fetches its own live reading (same endpoint and
 * 30s cadence the rest of the app uses).
 *
 * Layout: 3 across on desktop, stacks to 1 column on mobile.
 */
export default function SystemStatus() {
    const [liveReading, setLiveReading] = useState(null)

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

    const sysLogWatering = getWateringFormat(
        liveReading?.sensors?.soilState,
        liveReading?.system?.wateringCooldownOver
    )
    const sysLogLighting = getLightingFormat(
        liveReading?.system?.insideLightWindow,
        liveReading?.actuators?.growLightOn
    )
    const sysLogClimate = getClimateFormat(
        liveReading?.sensors?.temperature,
        liveReading?.sensors?.humidity
    )

    return (
        <div className="pb-2">
            <h4 className="text-xs tracking-[0.11em] text-subtitle font-bold pb-5">
                SYSTEM STATUS
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-x-5">
                <SysLogStatCard
                    bgColor={sysLogWatering.bgColor}
                    borderColor={sysLogWatering.borderColor}
                    icon={sysLogWatering.icon}
                    titleColor={sysLogWatering.titleColor}
                    title={sysLogWatering.title}
                    message={sysLogWatering.message}/>

                <SysLogStatCard
                    bgColor={sysLogLighting.bgColor}
                    borderColor={sysLogLighting.borderColor}
                    icon={sysLogLighting.icon}
                    titleColor={sysLogLighting.titleColor}
                    title={sysLogLighting.title}
                    message={sysLogLighting.message}/>

                <SysLogStatCard
                    bgColor={sysLogClimate.bgColor}
                    borderColor={sysLogClimate.borderColor}
                    icon={sysLogClimate.icon}
                    titleColor={sysLogClimate.titleColor}
                    title={sysLogClimate.title}
                    message={sysLogClimate.message}/>
            </div>
        </div>
    )
}
