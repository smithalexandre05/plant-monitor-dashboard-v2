export default function SensorCard({title, icon, data, soilFont, iconBgColor}) {
    return (
        <div className="w-full h-32 bg-card border-2 border-border rounded-2xl p-4 pl-6 flex flex-col justify-between">
            <div className="flex items-center">
                <div className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center`}>{icon}</div>
                <h1 className="text-sm tracking-[0.05em] text-subtitle font-semibold pl-4">{title}</h1>
            </div>
            <h1 className={`text-2xl font-bold pt-1 ${soilFont}`}>{data}</h1>
        </div>
    )
}