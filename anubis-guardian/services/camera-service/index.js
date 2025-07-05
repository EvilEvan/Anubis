const os = require('os');
const net = require('net');

/**
 * Gets the local network IP address and subnet to determine the scan range.
 * @returns {string|null} The base IP range to scan (e.g., '192.168.1.').
 */
function getNetworkRange() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            const { address, family, internal, cidr } = iface;
            if (family === 'IPv4' && !internal) {
                // Return the base network part of the IP address from the CIDR
                const [ip, subnet] = cidr.split('/');
                const ipParts = ip.split('.');
                return `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.`;
            }
        }
    }
    return null;
}

/**
 * Scans a specific IP address and port to see if it's open.
 * @param {string} ip - The IP address to scan.
 * @param {number} port - The port to scan.
 * @returns {Promise<object>} A promise that resolves with the scan result.
 */
function scanPort(ip, port) {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(1000); // 1-second timeout

        socket.on('connect', () => {
            console.log(`[+] Port ${port} is open on ${ip}`);
            socket.destroy();
            resolve({ ip, port, status: 'open' });
        });

        socket.on('timeout', () => {
            socket.destroy();
            resolve({ ip, port, status: 'closed' });
        });

        socket.on('error', () => {
            socket.destroy();
            resolve({ ip, port, status: 'closed' });
        });

        socket.connect(port, ip);
    });
}

/**
 * Attempts to identify if an open port belongs to a camera.
 * For now, it just confirms the port is open. Later, we'll add RTSP/HTTP checks.
 * @param {string} ip - The IP address of the device.
 * @param {number} port - The open port on the device.
 * @returns {object|null} A camera object if identified, otherwise null.
 */
function identifyCamera(ip, port) {
    // Placeholder for actual camera identification logic
    // e.g., try connecting with FNK Vision RTSP URL
    console.log(`[?] Found open port ${port} at ${ip}. Attempting to identify as camera...`);
    return {
        ip: ip,
        port: port,
        model: 'Unknown FNK Vision', // Placeholder
        streamUrl: `rtsp://${ip}:${port}/user=admin_password=admin_channel=1_stream=0.sdp` // Example
    };
}

/**
 * Main function to discover cameras on the local network.
 * "The Force is strong with this network. I sense... cameras."
 */
async function discoverCameras() {
    console.log("Searching for cameras on the network... May the Force be with us.");
    const networkRange = getNetworkRange();
    if (!networkRange) {
        console.error("Could not determine network range. Is this machine connected to a network?");
        return;
    }

    const cameraPorts = [554, 80, 8080, 8000]; // Common RTSP and HTTP ports
    const scanPromises = [];

    for (let i = 1; i < 255; i++) {
        const ip = `${networkRange}${i}`;
        for (const port of cameraPorts) {
            scanPromises.push(scanPort(ip, port));
        }
    }

    const results = await Promise.all(scanPromises);
    const openPorts = results.filter(r => r.status === 'open');
    const foundCameras = [];

    if (openPorts.length > 0) {
        console.log(`\nFound ${openPorts.length} open port(s). Investigating...`);
        for (const portInfo of openPorts) {
            const camera = identifyCamera(portInfo.ip, portInfo.port);
            if (camera) {
                console.log(`[SUCCESS] Found a potential camera: ${camera.model} at ${camera.ip}:${camera.port}`);
                foundCameras.push(camera);
            }
        }
    } else {
        console.log("No devices with common camera ports found.");
    }

    if (foundCameras.length > 0) {
        console.log(`\n[COMPLETE] Discovery finished. Found ${foundCameras.length} camera(s).`);
        console.log(foundCameras);
    } else {
        console.log("\n[COMPLETE] Discovery finished. No cameras were identified.");
    }

    return foundCameras;
}

// "This is where the fun begins."
discoverCameras();

module.exports = { discoverCameras }; 