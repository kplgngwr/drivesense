const dgram = require('dgram');
const fs = require('fs');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.error(`Server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`Message received: ${msg}`);
    const message = msg.toString();

    // Parse the message as JSON
    let parsedMessage;
    try {
        parsedMessage = JSON.parse(message);
    } catch (err) {
        console.error('Error parsing message as JSON', err);
        return;
    }

    // Initialize data object with default values
    const data = {
        ax: 0,
        ay: 0,
        az: 0,
        gx: 0,
        gy: 0,
        gz: 0
    };

    // Extract acceleration and gyroscope data
    if (parsedMessage.acceleration) {
        data.ax = parsedMessage.acceleration.x || 0;
        data.ay = parsedMessage.acceleration.y || 0;
        data.az = parsedMessage.acceleration.z || 0;
    }

    if (parsedMessage.gyroscope) {
        data.gx = parsedMessage.gyroscope.x || 0;
        data.gy = parsedMessage.gyroscope.y || 0;
        data.gz = parsedMessage.gyroscope.z || 0;
    }

    // Write data to file
    fs.writeFile('public/data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Data saved to data.json:', data);
        }
    });
});

server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening on ${address.address}:${address.port}`);
});

// Bind to a specific port
server.bind(41234);
