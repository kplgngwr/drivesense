const dgram = require('dgram');
const fs = require('fs');
const path = require('path');

const server = dgram.createSocket('udp4');
const DATA_FILE = path.join(__dirname, 'public', 'data.json');
const PORT = 41234;

// Read existing data.json safely
function readExisting() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function persistData(patch) {
  const base = {
    ax: 0, ay: 0, az: 0,
    gx: 0, gy: 0, gz: 0,
  };
  const current = readExisting();
  const merged = { ...base, ...current, ...patch };
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(merged, null, 2));
    console.log('Updated public/data.json:', merged);
  } catch (err) {
    console.error('Error writing to data.json', err);
  }
}

server.on('error', (err) => {
  console.error(`UDP server error: ${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  const raw = msg.toString().trim();
  console.log(`Message received from ${rinfo.address}:${rinfo.port} -> ${raw}`);

  // Try JSON first
  try {
    const obj = JSON.parse(raw);
    const patch = {};
    if (obj.acceleration) {
      patch.ax = Number(obj.acceleration.x) || 0;
      patch.ay = Number(obj.acceleration.y) || 0;
      patch.az = Number(obj.acceleration.z) || 0;
    }
    if (obj.gyroscope) {
      patch.gx = Number(obj.gyroscope.x) || 0;
      patch.gy = Number(obj.gyroscope.y) || 0;
      patch.gz = Number(obj.gyroscope.z) || 0;
    }
    if (Object.keys(patch).length > 0) {
      persistData(patch);
      return;
    }
  } catch (_) {
    // not JSON, fall through to CSV parsing
  }

  // CSV parsing: "Rotation,i,j,k" or "Linear Accel,x,y,z"
  const parts = raw.split(',').map((s) => s.trim());
  if (parts.length === 4) {
    const tag = parts[0].toLowerCase();
    const a = parseFloat(parts[1]);
    const b = parseFloat(parts[2]);
    const c = parseFloat(parts[3]);
    if ([a, b, c].some((v) => Number.isNaN(v))) {
      console.warn('Skipping payload with non-numeric values');
      return;
    }

    if (tag === 'rotation') {
      persistData({ gx: a, gy: b, gz: c });
    } else if (tag.startsWith('linear')) {
      persistData({ ax: a, ay: b, az: c });
    } else {
      console.warn('Unknown sensor type:', parts[0]);
    }
  } else {
    console.warn('Skipping unexpected payload format');
  }
});

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.bind(PORT, '0.0.0.0');