'use client'

import { useState } from 'react'

/*
 * MobileTabs
 * On mobile (< lg): renders an Overview / Trends toggle and shows only the
 * selected panel. On desktop (>= lg): the toggle is hidden and BOTH panels
 * are shown stacked, exactly like the original desktop layout.
 *
 * Usage:
 *   <MobileTabs
 *     overview={<>...live readings + system status...</>}
 *     trends={<>...graphs...</>}
 *   />
 */
export default function MobileTabs({ overview, trends }) {
    const [tab, setTab] = useState('overview')

    return (
        <div>
            {/* Toggle — mobile only */}
            <div className="lg:hidden grid grid-cols-2 gap-2 bg-card border-2 border-border rounded-2xl p-1 mb-6">
                <button
                    type="button"
                    onClick={() => setTab('overview')}
                    aria-pressed={tab === 'overview'}
                    className={`rounded-xl py-2 text-sm font-semibold transition-colors ${
                        tab === 'overview'
                            ? 'bg-icon text-title'
                            : 'text-subtitle'
                    }`}>
                    Overview
                </button>
                <button
                    type="button"
                    onClick={() => setTab('trends')}
                    aria-pressed={tab === 'trends'}
                    className={`rounded-xl py-2 text-sm font-semibold transition-colors ${
                        tab === 'trends'
                            ? 'bg-icon text-title'
                            : 'text-subtitle'
                    }`}>
                    Trends
                </button>
            </div>

            {/* Overview panel: visible on desktop always; on mobile only when selected */}
            <div className={tab === 'overview' ? 'block' : 'hidden lg:block'}>
                {overview}
            </div>

            {/* Trends panel: visible on desktop always; on mobile only when selected */}
            <div className={tab === 'trends' ? 'block' : 'hidden lg:block'}>
                {trends}
            </div>
        </div>
    )
}
