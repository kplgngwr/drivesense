const fs = require('fs');

class RapidAcceleration {
    constructor(accelerationThreshold) {
        this.accelerationThreshold = accelerationThreshold;
        this.lastAccelerationX = 0.0;
        this.lastUpdateTime = 0;
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

                const isRapidAcceleration = this.isRapidAccelerationDetected(currentAccelerationX);

                jsonData.ra = isRapidAcceleration ? 1 : 0;  // Update rapid acceleration value (ra)

                this.saveDataToFile(jsonData);
            } catch (parseErr) {
                console.log("Error parsing JSON data:", parseErr);
            }
        });
    }

    updateSensorDataFromAcceleration(currentAccelerationX) {
        const currentTime = Date.now();
        if (currentTime - this.lastUpdateTime > 1000) {  // Update once per second
            this.lastAccelerationX = currentAccelerationX;
            this.lastUpdateTime = currentTime;
        }
    }

    isRapidAccelerationDetected(currentAccelerationX) {
        const accelerationChange = Math.abs(currentAccelerationX - this.lastAccelerationX);
        return accelerationChange > this.accelerationThreshold;  // Detect rapid acceleration if threshold exceeded
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

const rapidAcceleration = new RapidAcceleration(1.5);  // Threshold set to 1.5

setInterval(() => {
    rapidAcceleration.updateSensorData();
}, 100);
