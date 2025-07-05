const os = require('os');
const net = require('net');
const axios = require('axios');

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
        socket.setTimeout(2000); // 2-second timeout for better reliability

        socket.on('connect', () => {
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
 * Tests FNK Vision specific RTSP URLs to identify cameras
 * @param {string} ip - The IP address to test
 * @param {number} port - The port to test
 * @returns {Promise<object|null>} Camera info if identified, null otherwise
 */
async function testFNKVisionRTSP(ip, port) {
    const fnkUrls = [
        `rtsp://${ip}:${port}/user=admin_password=admin_channel=1_stream=0.sdp`,
        `rtsp://${ip}:${port}/user=admin_password=password_channel=1_stream=0.sdp`,
        `rtsp://${ip}:${port}/user=admin_password=admin_channel=0_stream=1.sdp`,
        `rtsp://${ip}:${port}/live`,
        `rtsp://${ip}:${port}/stream1`,
        `rtsp://${ip}:${port}/`
    ];

    for (const url of fnkUrls) {
        try {
            // Simple RTSP connection test - we'll just try to connect
            const testSocket = new net.Socket();
            const connected = await new Promise((resolve) => {
                testSocket.setTimeout(1000);
                testSocket.on('connect', () => {
                    testSocket.write('OPTIONS ' + url + ' RTSP/1.0\r\nCSeq: 1\r\n\r\n');
                    resolve(true);
                });
                testSocket.on('timeout', () => resolve(false));
                testSocket.on('error', () => resolve(false));
                testSocket.connect(port, ip);
            });

            testSocket.destroy();

            if (connected) {
                console.log(`[RTSP SUCCESS] Found FNK Vision camera at ${ip}:${port} with URL: ${url}`);
                return {
                    ip,
                    port,
                    model: 'FNK Vision Camera',
                    streamUrl: url,
                    type: 'rtsp',
                    brand: 'FNK Vision'
                };
            }
        } catch (error) {
            // Continue to next URL
        }
    }
    return null;
}

/**
 * Tests HTTP endpoints commonly used by IP cameras
 * @param {string} ip - The IP address to test
 * @param {number} port - The port to test
 * @returns {Promise<object|null>} Camera info if identified, null otherwise
 */
async function testHTTPCamera(ip, port) {
    const httpPaths = [
        '/snapshot.jpg',
        '/videostream.cgi',
        '/cgi-bin/snapshot.cgi',
        '/image.jpg',
        '/video.mjpg',
        '/'
    ];

    for (const path of httpPaths) {
        try {
            const url = `http://${ip}:${port}${path}`;
            const response = await axios.get(url, {
                timeout: 2000,
                auth: {
                    username: 'admin',
                    password: 'admin'
                },
                validateStatus: () => true // Accept all status codes
            });

            // Check for camera-specific headers or content
            const headers = response.headers;
            const contentType = headers['content-type'] || '';
            const server = headers['server'] || '';

            if (contentType.includes('image/jpeg') || 
                contentType.includes('multipart/x-mixed-replace') ||
                server.toLowerCase().includes('camera') ||
                server.toLowerCase().includes('ipcam')) {
                
                console.log(`[HTTP SUCCESS] Found IP camera at ${ip}:${port}${path}`);
                return {
                    ip,
                    port,
                    model: 'IP Camera (HTTP)',
                    streamUrl: url,
                    type: 'http',
                    brand: 'Generic/FNK Vision'
                };
            }
        } catch (error) {
            // Continue to next path
        }
    }
    return null;
}

/**
 * Attempts to identify if an open port belongs to a camera.
 * Tests both RTSP and HTTP protocols with FNK Vision specific configurations.
 * @param {string} ip - The IP address of the device.
 * @param {number} port - The open port on the device.
 * @returns {Promise<object|null>} A camera object if identified, otherwise null.
 */
async function identifyCamera(ip, port) {
    console.log(`[PROBE] Investigating ${ip}:${port} for camera services...`);
    
    // Test RTSP first (port 554 is most likely)
    if (port === 554) {
        const rtspResult = await testFNKVisionRTSP(ip, port);
        if (rtspResult) return rtspResult;
    }
    
    // Test HTTP for web-based cameras
    if (port === 80 || port === 8080 || port === 8000) {
        const httpResult = await testHTTPCamera(ip, port);
        if (httpResult) return httpResult;
    }
    
    // If port 554 wasn't tested above, test it now
    if (port !== 554) {
        const rtspResult = await testFNKVisionRTSP(ip, port);
        if (rtspResult) return rtspResult;
    }
    
    return null;
}

/**
 * Main function to discover cameras on the local network.
 * "The Force is strong with this network. I sense... cameras."
 */
async function discoverCameras() {
    console.log("🔍 ANUBIS GUARDIAN: Initiating camera discovery...");
    console.log("🌟 'These are the droids we're looking for' - searching for FNK Vision cameras");
    
    const networkRange = getNetworkRange();
    if (!networkRange) {
        console.error("❌ Could not determine network range. Check network connection.");
        return [];
    }

    console.log(`📡 Scanning network range: ${networkRange}1-254`);
    const cameraPorts = [554, 80, 8080, 8000]; // Common RTSP and HTTP ports
    const scanPromises = [];

    // Parallel port scanning - "The Clone Army approach"
    for (let i = 1; i < 255; i++) {
        const ip = `${networkRange}${i}`;
        for (const port of cameraPorts) {
            scanPromises.push(scanPort(ip, port));
        }
    }

    console.log("⚡ Executing parallel network scan...");
    const results = await Promise.all(scanPromises);
    const openPorts = results.filter(r => r.status === 'open');
    
    console.log(`📊 Scan complete. Found ${openPorts.length} open port(s).`);
    
    if (openPorts.length === 0) {
        console.log("🤖 'These aren't the droids you're looking for' - No camera ports detected.");
        return [];
    }

    const foundCameras = [];
    console.log("🕵️ Investigating open ports for camera services...");

    // Camera identification phase
    for (const portInfo of openPorts) {
        console.log(`🔎 Checking ${portInfo.ip}:${portInfo.port}...`);
        const camera = await identifyCamera(portInfo.ip, portInfo.port);
        if (camera) {
            console.log(`✅ CAMERA DETECTED: ${camera.brand} ${camera.model} at ${camera.ip}:${camera.port}`);
            console.log(`📹 Stream URL: ${camera.streamUrl}`);
            foundCameras.push(camera);
        }
    }

    // Final results
    if (foundCameras.length > 0) {
        console.log(`\n🎉 DISCOVERY COMPLETE: Found ${foundCameras.length} camera(s)!`);
        console.log("🌟 'The Force is strong with these cameras'");
        foundCameras.forEach((cam, index) => {
            console.log(`${index + 1}. ${cam.brand} ${cam.model} - ${cam.streamUrl}`);
        });
    } else {
        console.log("\n🤷 'I have a bad feeling about this' - No cameras identified.");
        console.log("💡 Try checking:");
        console.log("   - Camera power and network connection");
        console.log("   - Default credentials (admin/admin, admin/password)");
        console.log("   - Camera IP address settings");
    }

    return foundCameras;
}

// "This is where the fun begins."
if (require.main === module) {
    discoverCameras().then(cameras => {
        if (cameras.length > 0) {
            console.log("\n🚀 Ready to set up surveillance system with discovered cameras!");
        }
    });
}

module.exports = { discoverCameras, testFNKVisionRTSP, testHTTPCamera }; 