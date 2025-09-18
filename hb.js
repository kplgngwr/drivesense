const fs = require('fs');

class HardBraking {
    constructor(decelerationThreshold) {
        this.decelerationThreshold = decelerationThreshold;  // Threshold to detect hard braking
        this.lastAccelerationX = 0;  // Last recorded X-axis acceleration
        this.lastUpdateTime = 0;  // Last update time for acceleration
    }

    updateSensorData() {
        fs.readFile('public/data.json', 'utf8', (err, data) => {
            if (err) {
                console.log("Error reading data from file:", err);
                return;
            }

            try {
                const jsonData = JSON.parse(data);
                const currentAccelerationX = jsonData.ax;  // Get 'ax' from the file

                this.updateSensorDataFromAcceleration(currentAccelerationX);

                // Check if hard braking is detected
                const isHardBraking = this.isHardBrakingDetected(currentAccelerationX);

                // Update 'hb' value based on hard braking detection
                jsonData.hb = isHardBraking ? 1 : 0;

                this.saveDataToFile(jsonData);
            } catch (parseErr) {
                console.log("Error parsing JSON data:", parseErr);
            }
        });
    }

    updateSensorDataFromAcceleration(currentAccelerationX) {
        const currentTime = Date.now();
        if (currentTime - this.lastUpdateTime > 1000) {  // Update once per second
            this.lastAccelerationX = currentAccelerationX;  // Update last acceleration X
            this.lastUpdateTime = currentTime;
        }
    }

    isHardBrakingDetected(currentAccelerationX) {
        // Calculate deceleration (change in acceleration)
        const deceleration = this.lastAccelerationX - currentAccelerationX;

        // If the deceleration is greater than the threshold, hard braking is detected
        return deceleration > this.decelerationThreshold;  // If deceleration exceeds threshold
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

// Example usage:
const hardBraking = new HardBraking(1.5);  // Deceleration threshold set to 2.5

// Update sensor data every 100 ms
setInterval(() => {
    hardBraking.updateSensorData();
}, 100);
