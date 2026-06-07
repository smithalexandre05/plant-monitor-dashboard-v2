export default function SensorCard({title, icon, data, soilFont, iconBgColor}) {
    return (
        <div className="w-64 h-37 bg-card border-2 border-border rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex items-center">
                <div className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center`}>{icon}</div>
                <h1 className="text-subtitle pl-4 font-medium">{title}</h1>
            </div>
            <h1 className={`text-2xl ${soilFont}`}>{data}</h1>
        </div>
    )
}