export default function SensorCard({title, icon, data, soilFont, iconBgColor, wrapperClass = "", wide = false}) {
    if (wide) {
        // Grow Light card. Full-width on mobile: lays out as a horizontal row
        // (icon + title left, value right). At sm+ it returns to the normal
        // vertical card so it matches its neighbors in the 5-across desktop row.
        return (
            <div className={`w-full min-h-20 sm:min-h-28 sm:h-32 bg-card border-2 border-border rounded-2xl p-4 sm:pl-6 flex flex-row items-center justify-between sm:flex-col sm:items-stretch sm:justify-between ${wrapperClass}`}>
                <div className="flex items-center">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${iconBgColor} rounded-xl flex items-center justify-center shrink-0`}>{icon}</div>
                    <h1 className="text-xs sm:text-sm tracking-[0.05em] text-subtitle font-semibold pl-3 sm:pl-4">{title}</h1>
                </div>
                <h1 className={`text-xl sm:text-2xl font-bold pr-2 sm:pr-0 sm:pt-1 ${soilFont}`}>{data}</h1>
            </div>
        )
    }

    return (
        <div className={`w-full min-h-28 sm:h-32 bg-card border-2 border-border rounded-2xl p-4 sm:pl-6 flex flex-col justify-between ${wrapperClass}`}>
            <div className="flex items-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${iconBgColor} rounded-xl flex items-center justify-center shrink-0`}>{icon}</div>
                <h1 className="text-xs sm:text-sm tracking-[0.05em] text-subtitle font-semibold pl-3 sm:pl-4">{title}</h1>
            </div>
            <h1 className={`text-xl sm:text-2xl font-bold pt-1 ${soilFont}`}>{data}</h1>
        </div>
    )
}
