export default function GraphCard({icon, graphTitle, graphLiveReading, chart, readingNote}) {
    return (
         <div className="w-full h-72 sm:h-80 bg-card border-2 border-border rounded-2xl p-4 sm:p-6 flex flex-col">
            {/* div for header of graph cards, will include toggle switch later... */}
            <div className="flex items-center">
                <div className="shrink-0">{icon}</div>
                <h2 className="text-base sm:text-lg text-title font-semibold pl-3">{graphTitle}</h2>
            </div>
            {/* Div for live reading */}
            <div className="text-title pt-3">
                <h2 className="text-2xl sm:text-3xl font-semibold">{graphLiveReading}</h2>
            </div>
            <div className="flex-1 min-h-0 pt-5">{chart}</div>
            <div>
                <p className="text-subtitle text-xs sm:text-[13px] mt-2 text-center">{readingNote}</p>
            </div>
        </div>
    )   
}
