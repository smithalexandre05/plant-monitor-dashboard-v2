import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET() {

    const oneDayinMilli = 1000 * 60 * 60 * 24;
    const oneDayAgo = new Date(Date.now() - oneDayinMilli);

    try {
        const collection = await getCollection("telemetry");
        const data = await collection.find(
            { timestamp: { $gte: oneDayAgo } },
            { projection: { timestamp: 1, "actuators.growLightOn": 1, "actuators.pumpActivated": 1, _id: 0 } }
            ).sort({ timestamp: 1 }).toArray()

            let outputGL = [];
            let outputWP = null;
            let startTimeGL = null;
            let wpCounter = 0;
            let lastWPActivation = null;

            for (let i = 1; i < data.length; i++) {
                const currentGLState = data[i].actuators.growLightOn;
                const previousGLState = data[i - 1].actuators.growLightOn;
                const currentWPState = data[i].actuators.pumpActivated;
                const previousWPState = data[i - 1].actuators.pumpActivated;

                if (previousGLState === false && currentGLState === true) {
                    startTimeGL = data[i].timestamp;
                }
                if (previousGLState === true && currentGLState === false) {
                    outputGL.push({ actuator: "Grow Light", period: [startTimeGL, data[i].timestamp] })
                    startTimeGL = null;
                }
                if (previousWPState === false && currentWPState === true) {
                    wpCounter++;
                    lastWPActivation = new Date(data[i].timestamp).getTime();
                }
            }

            if (startTimeGL !== null) {
                const lastTimestamp = data[data.length - 1].timestamp;
                outputGL.push({ actuator: "Grow Light", period: [startTimeGL, lastTimestamp] });
            }
            if (wpCounter !== 0) {
                outputWP = { activations: wpCounter, lastActivation: lastWPActivation };
            }

        return NextResponse.json({ outputGL, outputWP }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error fetching Actuator data' }, { status: 500 }); 
    }
}