# **ANUBIS: The Guardian's Eye - DIY Surveillance Platform**

## **Project Overview: The Force of Surveillance**
Transform your FNK Vision surveillance hardware into a powerful, self-hosted platform that brings balance to security monitoring - eliminating the complexity and reliability issues of commercial NVR systems while providing exceptional mobile access and private connectivity options.

![Anubis Guardian's Eye](https://i.imgur.com/placeholder.jpg) *(Concept art to be added)*

---

## **Phase 1: The Jedi Council (Planning & Architecture)**

### **Core Requirements: The Sacred Texts**
- **Simple Setup**: One-command installation - "These aren't the complicated configurations you're looking for"
- **Mobile First**: Hologram-quality mobile experience - "Help me Anubis, you're my only hope"
- **Reliable**: No cloud dependencies, works offline - "The dark side clouds everything. Impossible to see the future is"
- **Universal**: Support any FNK Vision camera with RTSP/HTTP streams - "Strong with the Force, these cameras are"
- **Secure**: Built-in authentication and encryption - "Your lightsaber. This weapon is your life"
- **Private**: Multiple secure connection methods - "The ability to speak does not make you intelligent"

### **Technology Stack: The Kyber Crystals**
```
Backend: Node.js + Express (JavaScript - easy to modify like a lightsaber)
Database: SQLite (no setup required - "Do or do not. There is no try")
Video Processing: FFmpeg (industry standard - "I find your lack of frame drops disturbing")
Frontend: React (modern, responsive - "Impressive. Most impressive")
Mobile: Progressive Web App (works on all devices - "This is the way")
Containerization: Docker (easy deployment - "It's a trap!" No, it's actually quite simple)
```

### **Architecture Overview: The Galactic Senate**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  FNK Cameras    │───▶│  ANUBIS Core    │───▶│   Holocron App  │
│ (The Watchers)  │    │  (The Temple)   │    │  (The Archive)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## **Phase 2: The Rebel Alliance (Feature Breakdown)**

### **Entry-Level Features (MVP): The Padawan Training**

#### **1. Camera Discovery & Setup: The Scout**
```javascript
// Auto-discover FNK Vision cameras on network
const discoverCameras = () => {
  // Scan common ports: 80, 8080, 554, 1935
  // Try FNK Vision specific paths: /live, /stream, /video
  // Test common credentials: admin/admin, admin/password
  // Support specific RTSP URLs for FNK Vision: rtsp://[IP]:[PORT]/user=admin_password=admin_channel=1_stream=0.sdp
}
```

**User Experience: The Force Awakens**
- Click "Find Cameras" button (styled as a holographic scanner)
- Tool automatically discovers FNK Vision cameras
- One-click to add each camera with Star Wars-themed confirmation

#### **2. Live Streaming: The Hologram**
```javascript
// Convert FNK Vision camera streams to web-friendly format
const streamCamera = (cameraUrl) => {
  // Use FFmpeg to convert RTSP to HLS/WebRTC
  // Serve streams via web interface with Star Wars-inspired UI
  // Auto-adjust quality based on connection - "Never tell me the odds!"
}
```

**User Experience: The Jedi Mind Trick**
- View all cameras in grid layout (styled as a Star Destroyer command center)
- Click camera to view full-screen (transition effect like a hologram activating)
- Works on any device with web browser - "These aren't the droids you're looking for"

#### **3. Recording & Playback: The Holocron Archive**
```javascript
// Simple recording with motion detection for FNK Vision cameras
const recordVideo = (camera, motionThreshold) => {
  // Record when motion detected - "I sense a disturbance in the Force"
  // Store in organized date/time folders - "The archives are complete"
  // Compress older recordings automatically - "Size matters not"
}
```

**User Experience: The Jedi Archives**
- Enable/disable recording per camera (lightsaber toggle switches)
- View recordings by date/time in a timeline interface (like a holographic star chart)
- Download clips to phone - "This will make a fine addition to my collection"

#### **4. Private Connection Options: The Secret Ways**
```javascript
// Multiple secure connection methods
const connectionMethods = {
  localNetwork: "Direct access within your fortress",
  wireguard: "Encrypted tunnel through the galaxy",
  tailscale: "Private mesh network across star systems",
  tor: "Anonymous routing through the outer rim",
  cloudflare: "Protected by the shield generator"
};
```

**User Experience: The Hidden Path**
- Select from multiple connection methods with clear explanations
- Simple setup wizards for each method - "Always pass on what you have learned"
- Test connection button - "That's no moon, it's a working connection!"

#### **5. Mobile Access: The Communicator**
```javascript
// Progressive Web App for mobile
const mobileApp = {
  // Install as app on phone home screen - "I am one with the Force"
  // Push notifications for alerts - "I have a bad feeling about this"
  // Offline viewing of recent clips - "The Force will be with you, always"
}
```

**User Experience: The Force Projection**
- Add to phone home screen like native app (with Anubis icon)
- Get alerts when motion detected (with optional Star Wars sound effects)
- View cameras remotely with minimal latency - "Your focus determines your reality"

---

## **Phase 3: The Clone Wars (Implementation Plan)**

### **Week 1-2: Core Infrastructure: The Foundation**
```bash
# Project setup
mkdir anubis-guardian
cd anubis-guardian
npm init -y
npm install express sqlite3 socket.io multer
```

**Deliverables: The Blueprints**
- Basic web server with Star Wars-inspired terminal messages
- Camera configuration interface with FNK Vision presets
- Database schema for cameras/recordings with encryption

### **Week 3-4: Camera Integration: The Alliance**
```javascript
// FNK Vision camera stream handler
app.get('/stream/:cameraId', (req, res) => {
  const camera = getCamera(req.params.cameraId);
  // Special handling for FNK Vision RTSP URLs
  const stream = ffmpeg(camera.url)
    .format('hls')
    .pipe(res);
});
```

**Deliverables: The Reconnaissance**
- FNK Vision camera discovery functionality with model detection
- Live streaming capability optimized for FNK hardware
- Basic web interface with Star Wars-inspired design elements

### **Week 5-6: Recording & Storage: The Archives**
```javascript
// Motion detection and recording for FNK Vision
const motionDetector = {
  threshold: 0.1,
  record: true,
  alertsEnabled: true,
  fnkOptimized: true // Special settings for FNK Vision cameras
};
```

**Deliverables: The Holocron**
- Motion detection calibrated for FNK Vision cameras
- Recording functionality with efficient storage management
- Playback interface with timeline and event markers

### **Week 7-8: Mobile & Private Connections: The Communicator**
```javascript
// Progressive Web App manifest with Star Wars theme
const manifest = {
  name: "Anubis Guardian",
  short_name: "Anubis",
  start_url: "/",
  display: "standalone",
  theme_color: "#000000",
  background_color: "#000000",
  icons: [
    {
      src: "anubis-icon.png",
      sizes: "192x192",
      type: "image/png"
    }
  ]
};
```

**Deliverables: The Transmission**
- Mobile-optimized interface with dark theme and accent colors
- Push notifications with customizable alerts
- Multiple private connection methods with setup wizards

---

## **Phase 4: The New Hope (User-Friendly Features)**

### **Installation Wizard: The Initiation**
```bash
# One-command setup with Star Wars ASCII art welcome
curl -sSL https://install.anubis-guardian.com | bash
# Or Docker one-liner
docker run -p 8080:8080 anubis/guardian
```

### **Setup Guide Interface: The Training**
```javascript
const setupSteps = [
  "Connect FNK Vision cameras to network - 'Power! Unlimited Power!'",
  "Run camera discovery - 'I've been waiting for you'",
  "Configure recording settings - 'Do what must be done'",
  "Set up private connection - 'There is another way'",
  "Test remote access - 'The Force is strong with this one'"
];
```

### **Troubleshooting Tools: The Repair Droid**
```javascript
const diagnostics = {
  networkTest: () => "Test FNK Vision camera connectivity - 'R2, see if you can patch into the main computer'",
  portCheck: () => "Verify port accessibility - 'Stay on target'", 
  streamTest: () => "Test video stream quality - 'Impressive. Most impressive'",
  storageCheck: () => "Check disk space - 'Judge me by my size, do you?'"
};
```

---

## **Phase 5: The Jedi Texts (Documentation & Guides)**

### **Quick Start Guide: The Initiate**
```markdown
# 5-Minute Setup: "This is where the fun begins"
1. Install: `docker run anubis/guardian`
2. Open: http://localhost:8080
3. Click "Find Cameras" (The scanner will locate your FNK Vision devices)
4. Select cameras to add
5. Done! View on phone at http://[your-ip]:8080
```

### **Troubleshooting Guide: The Jedi Trials**
```markdown
# Common Issues: "I have a bad feeling about this"
- Can't find cameras? → Check network settings and verify FNK Vision firmware
- No remote access? → Configure router/firewall or try alternative connection methods
- Poor video quality? → Adjust stream settings or check bandwidth
- Storage full? → Enable auto-cleanup or add external storage
```

### **FNK Vision Specific Guide: The Specialist**
```markdown
# FNK Vision Camera Setup: "These are the droids you're looking for"
- Default RTSP URL format: rtsp://[IP]:[PORT]/user=admin_password=admin_channel=1_stream=0.sdp
- Default credentials: admin/admin or admin/password
- Recommended settings for optimal performance with Anubis
- Firmware update instructions for enhanced compatibility
```

### **Advanced Configuration: The Jedi Master**
```markdown
# Optional Features: "Your powers are complete"
- Custom motion zones for FNK Vision cameras
- Email/SMS alerts with screenshot attachments
- Cloud backup integration (optional, not required)
- Multiple user accounts with different access levels
- AI-powered object detection (person, vehicle, animal)
```

---

## **Phase 6: The Rebel Alliance (Testing & Collaboration)**

### **Beta Testing Plan: The Reconnaissance**
1. **Internal Testing**: Test with various FNK Vision camera models
2. **Community Testing**: Release to small group of users
3. **Feedback Integration**: Implement user suggestions
4. **Documentation Refinement**: Update guides based on feedback

### **Collaboration Opportunities: The Coalition**
```markdown
# Areas for Contribution: "Join me, and together we can rule the galaxy"
- FNK Vision camera compatibility testing
- Mobile app improvements and themes
- Documentation translations
- Plugin development for additional features
- Security auditing and penetration testing
```

---

## **Phase 7: Return of the Jedi (Deployment Strategy)**

### **Distribution Methods: The Transmission**
```bash
# Multiple deployment options
1. Docker Hub: docker pull anubis/guardian
2. GitHub Releases: Download and run
3. Package Managers: apt install anubis-guardian
4. Raspberry Pi Image: Flash directly to SD card
```

### **Support Infrastructure: The Alliance**
```markdown
# Community Support: "May the Force be with you"
- GitHub Issues for bug reports
- Discord/Forum for user help
- Video tutorials on YouTube
- Wiki for advanced configurations
- Subreddit for community sharing
```

---

## **FNK Vision Hardware Compatibility: The Chosen Ones**

### **Supported Models**
- FNK Vision 2MP HD NVR Kit
- FNK Vision WiFi Wireless 4K Camera Sets
- FNK Vision 4CH Wireless Sets
- FNK Vision Night Vision IR Cameras
- All FNK Vision models with RTSP support

### **Hardware Enhancement Options**
- External storage integration for extended recording
- Improved antennas for better wireless range
- UPS backup power integration
- Additional camera support beyond FNK Vision (universal compatibility)

---

## **Private Connection Methods: The Secret Ways**

### **Local Network: The Inner Sanctum**
- Direct access within your network
- No cloud dependencies
- Zero configuration required

### **Wireguard VPN: The Encrypted Tunnel**
```javascript
// Automatic WireGuard setup
const setupWireguard = () => {
  // Generate keys
  // Configure server
  // Provide client configuration as QR code
  // "Your focus determines your reality"
};
```

### **Tailscale: The Mesh Network**
```javascript
// Tailscale integration
const setupTailscale = () => {
  // Authorize with Tailscale
  // Create secure network
  // Connect all devices
  // "Always in motion is the future"
};
```

### **Tor Hidden Service: The Shadow Path**
```javascript
// Tor hidden service configuration
const setupTorHiddenService = () => {
  // Configure onion service
  // Generate .onion address
  // Setup authentication
  // "The dark side of the Force is a pathway to many abilities some consider to be unnatural"
};
```

---

## **Success Metrics: The Prophecy**

### **Technical Goals: The Trials**
- ✅ Support 100% of FNK Vision cameras
- ✅ <30 second setup time
- ✅ <100MB RAM usage
- ✅ Works on Raspberry Pi 4+
- ✅ Multiple private connection methods

### **User Experience Goals: The Balance**
- ✅ Non-technical users can set up in 5 minutes
- ✅ Star Wars themed mobile app feels native
- ✅ Zero-configuration remote access
- ✅ Reliable 24/7 operation
- ✅ No monthly fees or cloud dependencies

---

## **The Path Forward: The Destiny**

Anubis Guardian's Eye transforms your FNK Vision hardware into a powerful, private surveillance system with the reliability of commercial solutions but without the restrictions and monthly fees. By focusing on ease of use, privacy, and a delightful Star Wars-inspired experience, this project aims to bring balance to home surveillance - powerful enough for the tech-savvy, simple enough for everyone.

"May the Force be with your surveillance, always." 