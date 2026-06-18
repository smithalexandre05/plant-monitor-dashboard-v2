import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET() {

    const oneDayinMilli = 1000 * 60 * 60 * 24;
    const oneDayAgo = new Date(Date.now() - oneDayinMilli);

    try {
        const collection = await getCollection("telemetry");
        const data = await collection.aggregate([
            {$match: {timestamp: {$gte: oneDayAgo}}},
            {$group: {
                _id: {$dateTrunc: { date: "$timestamp", unit: "hour"}},
                avgTemp: { $avg: "$sensors.temperature"},
                avgHum: { $avg: "$sensors.humidity"},
                avgSoil: { $avg: "$sensors.soilRaw"},
                avgLight: { $avg: "$sensors.lightRaw"}
            }},
            { $sort: {_id: 1}}
        ])
        const oneDayData = await data.toArray();
        return NextResponse.json({ oneDayData }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error fetching Graph data' }, { status: 500 }); 
    }
}