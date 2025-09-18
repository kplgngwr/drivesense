'use client'

import { DriverTable } from './driver-table'

// Mock data for drivers
const drivers = [
    { id: 1, name: 'Rajesh Kumar', score: 0 },
    { id: 2, name: 'Priya Sharma', score: 0 },
    { id: 3, name: 'Amit Patel', score: 0 },
    { id: 4, name: 'Sunita Gupta', score: 0 },
    { id: 5, name: 'Vikram Singh', score: 0 },
]

// Mock data for driver behavior
const driverBehavior = {
    1: { rashDriving: 2, rapidAcceleration: 3, hardBrake: 1, maxTurnableSpeed: 65 },
    2: { rashDriving: 1, rapidAcceleration: 2, hardBrake: 1, maxTurnableSpeed: 60 },
    3: { rashDriving: 5, rapidAcceleration: 7, hardBrake: 6, maxTurnableSpeed: 75 },
    4: { rashDriving: 2, rapidAcceleration: 3, hardBrake: 2, maxTurnableSpeed: 62 },
    5: { rashDriving: 0, rapidAcceleration: 1, hardBrake: 0, maxTurnableSpeed: 58 },
}

// Scoring function
function calculateDrivingScore(rashDriving: number, rapidAcceleration: number, hardBrake: number, maxTurnableSpeed: number): number {
    // Weights
    const W1 = 0.3, W2 = 0.25, W3 = 0.25, W4 = 0.2;

    // Normalize input (example normalization, adjust as needed)
    const rashScore = rashDriving / 10;
    const accelerationScore = rapidAcceleration / 10;
    const brakeScore = hardBrake / 10;
    const speedScore = (maxTurnableSpeed - 50) / 30; // Assuming 50-80 km/h range

    // Calculate score
    const score = 100 - (W1 * rashScore + W2 * accelerationScore + W3 * brakeScore + W4 * speedScore) * 100;

    // Clamp the score between 0 and 100
    return Math.max(0, Math.min(100, parseFloat(score.toFixed(2))));
}

export default function DriverPerformancePage() {
    // Calculate scores and assign them to drivers
    const driversWithScores = drivers.map(driver => {
        const behavior = driverBehavior[driver.id as keyof typeof driverBehavior];
        return {
            ...driver,
            score: calculateDrivingScore(
                behavior.rashDriving,
                behavior.rapidAcceleration,
                behavior.hardBrake,
                behavior.maxTurnableSpeed
            ),
        };
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Driver Performance</h1>
            <DriverTable drivers={driversWithScores} />
        </div>
    )
}

