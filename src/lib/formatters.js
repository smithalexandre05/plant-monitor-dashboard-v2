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
        soilStyle.fontColor = "font-medium text-smDry";
    } else if (pathToSoilState === "MOIST") {
        soilStyle.iconColor = "text-smMoist";
        soilStyle.bgColor = "bg-smMoistBg";
        soilStyle.fontColor = "font-medium text-smMoist";
    } else {
        soilStyle.iconColor = "text-smWet";
        soilStyle.bgColor = "bg-smWetBg";
        soilStyle.fontColor = "font-medium text-smWet";
    }
    return soilStyle;
}

export function getGLStyles(pathToGLState) {
    let glStyle = { iconColor: "", bgColor: "", fontColor: ""};

    if (pathToGLState === true) {
        glStyle.iconColor = "text-glActive";
        glStyle.bgColor = "bg-glActiveBg";
        glStyle.fontColor = "font-medium text-title";
    } else {
        glStyle.iconColor = "text-valInactive";
        glStyle.bgColor = "bg-icon";
        glStyle.fontColor = " font-medium text-valInactive";
    }
    return glStyle;
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