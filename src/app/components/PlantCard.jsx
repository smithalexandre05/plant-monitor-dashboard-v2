'use client'

import { useState } from 'react'
import { Sprout, ChevronDown } from 'lucide-react'

/*
 * PlantCard
 * The plant header card. The growth stage sits on the right (balancing the
 * empty space on wide mobile), with a chevron that expands a detail panel
 * inside the card. Used in the header of page.js.
 *
 * The detail values are static placeholders for now — swap them for live data
 * (e.g. from /api/telemetry) when you have those fields.
 */
export default function PlantCard() {
    const [open, setOpen] = useState(false)

    const details = [
        { label: 'Planted', value: 'Day 23' },
        { label: 'Stage', value: 'Seedling–Vegetative' },
        { label: 'Light Target', value: '14 h / day' },
        { label: 'Ideal Temp', value: '18–24°C' },
    ]

    return (
        <div className="bg-card border-2 border-border rounded-2xl p-3 lg:justify-center">
            {/* Top row: icon + name on the left, stage + chevron on the right */}
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="w-full flex items-center justify-between text-left">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-icon rounded-xl flex items-center justify-center shrink-0">
                        <Sprout size={20} strokeWidth={1.5} className="text-[#4a9d6e]"/>
                    </div>
                    <div className="pl-3">
                        <h2 className="text-title text-sm font-semibold mb-0">Butterhead Lettuce</h2>
                        <p className="text-subtitle italic text-xs">Lactuca sativa</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 pl-3 shrink-0">
                    <div className="text-right">
                        <p className="text-[#4a9d6e] text-xs leading-tight">Seedling-Vegetative</p>
                        <p className="text-subtitle text-xs leading-tight">Day 23</p>
                    </div>
                    <ChevronDown
                        size={18}
                        strokeWidth={1.5}
                        className={`text-subtitle transition-transform duration-200 ${open ? 'rotate-180' : ''}`}/>
                </div>
            </button>

            {/* Expandable detail panel */}
            <div
                className={`grid transition-all duration-200 ease-out ${
                    open ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-border' : 'grid-rows-[0fr] opacity-0'
                }`}>
                <div className="overflow-hidden">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {details.map((d) => (
                            <div key={d.label}>
                                <p className="text-subtitle text-[11px] tracking-[0.05em] uppercase">{d.label}</p>
                                <p className="text-title text-sm font-semibold">{d.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
