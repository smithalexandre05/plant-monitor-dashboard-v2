export default function GraphCard({icon, graphTitle, graphLiveReading, chart, readingNote}) {
    return (
         <div className="w-full h-80 bg-card border-2 border-border rounded-2xl p-6 flex flex-col">
            {/* div for header of graph cards, will include toggle switch later... */}
            <div className="flex">
                <div>{icon}</div>
                <h2 className="text-title text-xl pl-3 font-normal">{graphTitle}</h2>
            </div>
            {/* Div for live reading */}
            <div className="text-title pt-3">
                <h2 className="text-3xl font-medium">{graphLiveReading}</h2>
            </div>
            <div className="flex-1 min-h-0 pt-5">{chart}</div>
            <div>
                <p className="text-subtitle text-[13px] mt-2 text-center">{readingNote}</p>
            </div>
        </div>
    )   
}