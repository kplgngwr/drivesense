import { NextRequest, NextResponse } from 'next/server';

// In-memory store for demo (use database in production)
let sensorData = {
  ax: 0, ay: 0, az: 0,
  gx: 0, gy: 0, gz: 0,
  hb: 0, ra: 0, mts: 0,
  timestamp: Date.now()
};

export async function GET() {
  return NextResponse.json(sensorData);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Update sensor data, preserving computed fields
    sensorData = {
      ...sensorData,
      ...data,
      timestamp: Date.now()
    };
    
    // Compute hb, ra, mts here or trigger separate computation
    computeMetrics();
    
    return NextResponse.json({ success: true, data: sensorData });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

function computeMetrics() {
  // Simple hard braking detection (threshold-based)
  const accelerationChange = Math.abs(sensorData.ax);
  sensorData.hb = accelerationChange > 1.5 ? 1 : 0;
  
  // Simple rapid acceleration detection  
  sensorData.ra = accelerationChange > 1.5 ? 1 : 0;
  
  // Simple max turnable speed calculation
  const lateralAccel = Math.abs(sensorData.ay);
  sensorData.mts = Math.sqrt(0.8 * 9.8 * 10) * (1 - lateralAccel / 10);
}