const fs = require('fs');

class MaxTurnableSpeed {
  constructor(frictionCoefficient, turnRadius) {
    this.tireFrictionCoefficient = frictionCoefficient;
    this.turnRadius = turnRadius;
    this.gravitationalAcceleration = 9.8; // m/s²
    this.sensorValue = null;
  }

  updateSensorData() {
    fs.readFile('public/data.json', 'utf8', (err, data) => {
      if (err) {
        console.log("Error reading data from file:", err);
        return;
      }

      try {
        const jsonData = JSON.parse(data);
        const lateralAcceleration = jsonData.ay;  // Assuming 'ay' exists in data.json

        this.sensorValue = {
          un: { linearAcceleration: { x: 0, y: lateralAcceleration, z: 0 } }
        };

        const maxSpeed = this.calculateMaxTurnableSpeed();
        jsonData.mts = maxSpeed;  // Save the max turnable speed to jsonData

        this.saveDataToFile(jsonData);
      } catch (parseErr) {
        console.log("Error parsing JSON data:", parseErr);
      }
    });
  }

  calculateMaxTurnableSpeed() {
    if (!this.isSensorDataValid(this.sensorValue)) {
      console.log("Sensor data is invalid for speed calculation.");
      return 0.0;  // Return a safe speed value
    }

    const lateralAcceleration = this.sensorValue.un.linearAcceleration.y;
    const dynamicFriction = this.calculateDynamicFriction(lateralAcceleration);

    return Math.sqrt(dynamicFriction * this.gravitationalAcceleration * this.turnRadius);
  }

  calculateDynamicFriction(lateralAcceleration) {
    const safetyFactor = 0.8;
    const effectiveFriction = this.tireFrictionCoefficient * (1 - Math.abs(lateralAcceleration) / (this.gravitationalAcceleration * safetyFactor));
    return Math.max(effectiveFriction, 0.1);  // Ensure friction doesn't drop below a minimum threshold
  }

  isSensorDataValid(data) {
    return Math.abs(data.un.linearAcceleration.x) < 50 &&
           Math.abs(data.un.linearAcceleration.y) < 50 &&
           Math.abs(data.un.linearAcceleration.z) < 50;
  }

  saveDataToFile(jsonData) {
    fs.writeFile('public/data.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.log("Error saving data to file:", err);
      } else {
        console.log("Data saved to data.json:", jsonData);
      }
    });
  }
}

const maxTurnableSpeed = new MaxTurnableSpeed(0.8, 10);

setInterval(() => {
  maxTurnableSpeed.updateSensorData();
}, 100);
