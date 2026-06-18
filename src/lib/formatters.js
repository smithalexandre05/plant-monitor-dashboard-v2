import { preconnect } from "react-dom";

// Formatting sensor data
export function stringConversion(boolVal) {
    return boolVal === true ? "ON" : "OFF";
}

export function formatDecimal(numberValue) {
    return parseFloat(numberValue).toFixed(1);
}

export function getSoilStyles(pathToSoilState) {
    let soilStyle = { iconColor: "", bgColor: "", fontColor: "" };

    if (pathToSoilState === "DRY") {
        soilStyle.iconColor = "text-smDry";
        soilStyle.bgColor = "bg-smDryBg";
        soilStyle.fontColor = "text-smDry";
    } else if (pathToSoilState === "MOIST") {
        soilStyle.iconColor = "text-smMoist";
        soilStyle.bgColor = "bg-smMoistBg";
        soilStyle.fontColor = "text-smMoist";
    } else {
        soilStyle.iconColor = "text-smWet";
        soilStyle.bgColor = "bg-smWetBg";
        soilStyle.fontColor = "text-smWet";
    }
    return soilStyle;
}

export function getGLStyles(pathToGLState) {
    let glStyle = { iconColor: "", bgColor: "", fontColor: ""};

    if (pathToGLState === true) {
        glStyle.iconColor = "text-glActive";
        glStyle.bgColor = "bg-glActiveBg";
        glStyle.fontColor = "text-title";
    } else {
        glStyle.iconColor = "text-valInactive";
        glStyle.bgColor = "bg-icon";
        glStyle.fontColor = "text-valInactive";
    }
    return glStyle;
}

export function getWateringFormat(SoilState, CooldownOver) {
    let wateringFormat = { bgColor: "", borderColor: "", icon: "", titleColor: "", title: "", message: ""};

    if (SoilState === 'DRY') {
        if (CooldownOver === false) {
            // Dry + cooldown active - HOLDING
            wateringFormat.bgColor = "bg-[#2a2210]";
            wateringFormat.borderColor = "border-[#f59e0b]";
            wateringFormat.icon = "Clock";
            wateringFormat.titleColor = "text-[#f59e0b]";
            wateringFormat.title = "HOLDING";
            wateringFormat.message = "Soil is dry, but watering is paused — cooldown active to let water settle.";
        } else {
            // Dry + no cooldown - WATERING
            wateringFormat.bgColor = "bg-[#2a2210]";
            wateringFormat.borderColor = "border-[#f59e0b]";
            wateringFormat.icon = "Droplets";
            wateringFormat.titleColor = "text-[#f59e0b]";
            wateringFormat.title = "WATERING";
            wateringFormat.message = "Soil is dry — watering triggered. Cooldown now active.";
        }
    }  else if (SoilState === 'MOIST') {
        if (CooldownOver === false) {
            // Moist + cooldown active - SETTLING (moist)
            wateringFormat.bgColor = "bg-[#14201a]";
            wateringFormat.borderColor = "border-[#4a9d6e]";
            wateringFormat.icon = "Hourglass";
            wateringFormat.titleColor = "text-[#4a9d6e]";
            wateringFormat.title = "SETTLING";
            wateringFormat.message = "Recently watered — cooldown active while water settles in.";
        } else {
            // Moist + no cooldown - OPTIMAL
            wateringFormat.bgColor = "bg-[#14201a]";
            wateringFormat.borderColor = "border-[#4a9d6e]";
            wateringFormat.icon = "CircleCheck";
            wateringFormat.titleColor = "text-[#4a9d6e]";
            wateringFormat.title = "OPTIMAL";
            wateringFormat.message = "Soil moisture is ideal — no watering needed.";
        }
    } else if (SoilState === 'WET') {
        if (CooldownOver === false) {
            // Wet + cooldown active - SETTLING (wet)
            wateringFormat.bgColor = "bg-[#14201a]";
            wateringFormat.borderColor = "border-[#4a9d6e]";
            wateringFormat.icon = "Hourglass";
            wateringFormat.titleColor = "text-[#4a9d6e]";
            wateringFormat.title = "SETTLING";
            wateringFormat.message = "Soil is saturated — cooldown active while water settles in.";
            
        } else {
            // Wet + no cooldown - SATURATED
            wateringFormat.bgColor = "bg-[#0e2130]";
            wateringFormat.borderColor = "border-[#38bdf8]";
            wateringFormat.icon = "Waves";
            wateringFormat.titleColor = "text-[#38bdf8]";
            wateringFormat.title = "SATURATED";
            wateringFormat.message = "Soil is too wet — no watering needed.";
        }
    }
    return wateringFormat
}

export function getLightingFormat(lightWindow, glState) {
    let lightingFormat = { bgColor: "", borderColor: "", icon: "", titleColor: "", title: "", message: ""};

    if (lightWindow === true) {
        if (glState === false) {
            // NATURAL (daylight sufficient)
            lightingFormat.bgColor = "bg-[#2a2a15]";
            lightingFormat.borderColor = "border-[#facc15]/30";
            lightingFormat.icon = "Sun";
            lightingFormat.titleColor = "text-[#facc15]";
            lightingFormat.title = "NATURAL";
            lightingFormat.message = "Daylight is sufficient — grow light off, plant is lit naturally.";
        } else {
            // SUPPLEMENTING (grow light actively on)
            lightingFormat.bgColor = "bg-[#2a2510]";
            lightingFormat.borderColor = "border-[#fbbf24]/30";
            lightingFormat.icon = "Lightbulb";
            lightingFormat.titleColor = "text-[#fbbf24]";
            lightingFormat.title = "SUPPLEMENTING";
            lightingFormat.message = "Ambient light is low — grow light active to supplement.";
        }
    } else {
        // RESTING (night/outside window)
        lightingFormat.bgColor = "bg-[#1a1a22]";
        lightingFormat.borderColor = "border-[#6b7280]/30";
        lightingFormat.icon = "Moon";
        lightingFormat.titleColor = "text-[#9ca3af]";
        lightingFormat.title = "RESTING";
        lightingFormat.message = "Outside light hours — grow light off for the plant's rest period.";
    }
    return lightingFormat
}

export function getClimateFormat(temp, hum) {
    let climateFormat = { bgColor: "", borderColor: "", icon: "", titleColor: "", title: "", message: ""};
    let temperature = { min: 15, max: 24};
    let humidity = { min: 45, max: 75};
    let tempOk = temp >= temperature.min && temp <= temperature.max;
    let humOk = hum >= humidity.min && hum <= humidity.max;

    if (tempOk && humOk) {
        // HEALTHY: "Temp and humidity are both ideal for this growth stage."
        climateFormat.bgColor = "bg-[#14201a]";
        climateFormat.borderColor = "border-[#4a9d6e]/30";
        climateFormat.icon = "Leaf";
        climateFormat.titleColor = "text-[#4a9d6e]";
        climateFormat.title = "HEALTHY";
        climateFormat.message = "Temperature and humidity are both ideal for this growth stage.";
    } else if (temp >= temperature.max && humOk) {
        // TEMP ALERT: "Temperature is HIGH — humidity is fine. Monitor conditions.'
        climateFormat.bgColor = "bg-[#2a2210]";
        climateFormat.borderColor = "border-[#f59e0b]/30";
        climateFormat.icon = "Thermometer";
        climateFormat.titleColor = "text-[#f59e0b]";
        climateFormat.title = "TEMP ALERT";
        climateFormat.message = "Temperature is high — humidity is fine. Monitor conditions.";
    } else if (temp <= temperature.min && humOk) {
        // TEMP ALERT: "Temperature is LOW — humidity is fine. Monitor conditions.'
        climateFormat.bgColor = "bg-[#2a2210]";
        climateFormat.borderColor = "border-[#f59e0b]/30";
        climateFormat.icon = "Thermometer";
        climateFormat.titleColor = "text-[#f59e0b]";
        climateFormat.title = "TEMP ALERT";
        climateFormat.message = "Temperature is low — humidity is fine. Monitor conditions.";
    } else if (tempOk && hum >= humidity.max) {
        // HUMIDITY ALERT: "Humidity is HIGH — temperature is fine. Monitor conditions."
        climateFormat.bgColor = "bg-[#2a2210]";
        climateFormat.borderColor = "border-[#f59e0b]/30";
        climateFormat.icon = "Droplet";
        climateFormat.titleColor = "text-[#f59e0b]";
        climateFormat.title = "HUMIDITY ALERT";
        climateFormat.message = "Humidity is high — temperature is fine. Monitor conditions.";
    } else if (tempOk && hum <= humidity.min) {
        // HUMIDITY ALERT: "Humidity is LOW — temperature is fine. Monitor conditions."
        climateFormat.bgColor = "bg-[#2a2210]";
        climateFormat.borderColor = "border-[#f59e0b]/30";
        climateFormat.icon = "Droplet";
        climateFormat.titleColor = "text-[#f59e0b]";
        climateFormat.title = "HUMIDITY ALERT";
        climateFormat.message = "Humidity is low — temperature is fine. Monitor conditions.";
    } else {
        // STRESSED: "Both temp and humidity are out of ideal range — conditions may stress the plant."
        climateFormat.bgColor = "bg-[#2a1518]";
        climateFormat.borderColor = "border-[#f87171]/30";
        climateFormat.icon = "TriangleAlert";
        climateFormat.titleColor = "text-[#f87171]";
        climateFormat.title = "STRESSED";
        climateFormat.message = "Both temperature and humidity are out of ideal range — conditions may stress the plant.";
    }
    return climateFormat
}

export function soilRawToPerc(soilMoistureReading) {
    const dryEnd = 512
    const wetEnd = 206
    let percentage = ((dryEnd - soilMoistureReading) / (dryEnd - wetEnd)) * 100

    if (percentage > 100) {
        percentage = 100
    } else if (percentage < 0) {
        percentage = 0
    }
    return parseFloat(percentage).toFixed(2);
}

export function lightRawToPerc(lightReading) {
    const darkEnd = 0
    const brightEnd = 1023
    let percentage = ((lightReading - darkEnd) / (brightEnd - darkEnd)) * 100

    if (percentage > 100) {
        percentage = 100
    } else if (percentage < 0) {
        percentage = 0
    }
    return parseFloat(percentage).toFixed(2);
}

export function milliToString(millisecondTime) {
    let totalMinutes = Math.floor(millisecondTime / 60000);
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    if (hours === 0) {
        return `${minutes}m`;
    }
    return `${hours}h${minutes.toString().padStart(2, '0')}`;
}

export function milliToTime(msValue) {
    if (typeof msValue !== "number") return "None";
    return new Date(msValue).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}