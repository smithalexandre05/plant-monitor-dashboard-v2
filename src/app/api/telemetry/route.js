import { NextResponse } from 'next/server';
import { getCollection } from "@/lib/mongodb";

export async function POST(request) {

    const arduinoData = await request.json();
    arduinoData.timestamp = new Date(arduinoData.timestamp);
    const collection = await getCollection("telemetry");
    
    try { 
        await collection.insertOne(arduinoData);
        return NextResponse.json({ message: 'Data received' }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error saving data' }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const collection = await getCollection("telemetry");
        const data = await collection.findOne({}, { sort: { _id: -1 } });
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error fetching Sensor data' }, { status: 500 });
    }
}