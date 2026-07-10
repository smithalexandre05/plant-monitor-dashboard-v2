export default function SensorCard({title, icon, data, soilFont, iconBgColor, wrapperClass = "", wide = false}) {
    // Title sizing for the regular (vertical) cards: text-xs on phone, stays
    // text-xs through tablet (the 3-across layout, sm–lg) to prevent overflow,
    // returns to text-sm only at xl where the 5-across layout has room.
    // leading-tight keeps wrapped two-line labels compact.
    const titleClasses = "text-xs sm:text-xs xl:text-sm leading-tight tracking-[0.05em] text-subtitle font-semibold pl-3 sm:pl-4";

    if (wide) {
        // Grow Light card. It spans the full row width on phone AND in the
        // 3-across tablet layout (sm–lg), laying out as a horizontal bar
        // (icon + title left, value right). Only at xl does it return to a
        // normal vertical card to match its neighbors in the 5-across row.
        return (
            <div className={`w-full min-h-20 xl:min-h-28 xl:h-32 bg-card border-2 border-border rounded-2xl p-4 xl:pl-6 flex flex-row items-center justify-between xl:flex-col xl:items-stretch xl:justify-between ${wrapperClass}`}>
                <div className="flex items-center xl:items-start">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${iconBgColor} rounded-xl flex items-center justify-center shrink-0`}>{icon}</div>
                    <h1 className="text-xs sm:text-sm leading-tight tracking-[0.05em] text-subtitle font-semibold pl-3 sm:pl-4">{title}</h1>
                </div>
                <h1 className={`text-xl sm:text-2xl font-bold pr-2 xl:pr-0 xl:pt-1 ${soilFont}`}>{data}</h1>
            </div>
        )
    }

    return (
        <div className={`w-full min-h-28 sm:h-32 bg-card border-2 border-border rounded-2xl p-4 sm:pl-6 flex flex-col justify-between ${wrapperClass}`}>
            <div className="flex items-center sm:items-start">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${iconBgColor} rounded-xl flex items-center justify-center shrink-0`}>{icon}</div>
                <h1 className={titleClasses}>{title}</h1>
            </div>
            <h1 className={`text-xl sm:text-2xl font-bold pt-1 ${soilFont}`}>{data}</h1>
        </div>
    )
}
