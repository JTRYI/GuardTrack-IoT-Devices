var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath: './certs/Motion Sensor Certificates/ea1180b9a13c603072166a92f960d87b3bb29e9e9511f3b8282eb9302418ba5b-private.pem.key',
    certPath: './certs/Motion Sensor Certificates/ea1180b9a13c603072166a92f960d87b3bb29e9e9511f3b8282eb9302418ba5b-certificate.pem.crt',
    caPath: './certs/Motion Sensor Certificates/AmazonRootCA1.pem',
    clientId: 'motion-sensor',
    host: 'a1dwkf6z95khyc-ats.iot.us-east-1.amazonaws.com'
});

// Function to get the current time in Singapore time zone
function getCurrentSingaporeTime() {
    // Get the current UTC time
    const utcDate = new Date();

    // Set the time zone offset for Singapore (UTC+8)
    const singaporeOffset = 8 * 60; // Offset in minutes
    const singaporeTime = new Date(utcDate.getTime() + singaporeOffset * 60000); // Convert offset to milliseconds

    return singaporeTime;
}

// Set the current time to Singapore time
const current = getCurrentSingaporeTime();

// Function to generate random motion data
function generateMotionData() {
    return Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Generates a random value between 50 and 100
}

// Function to simulate motion sensor behavior
function simulateMotionSensor() {
    const motionData = generateMotionData(); // Generate random motion data
    const message = { time: current, device_id: 2, motion_data: motionData }; // Create message object
    device.publish('motion_stats', JSON.stringify(message)); // Publish message to topic
}

// Subscribe to 'connect' event
device.on('connect', function () {
    console.log('Connected to AWS IoT Core');
    device.subscribe('motion_stats'); // Subscribe to desired topic
    console.log('Simulating motion sensor data...');
    simulateMotionSensor(); // Simulate sound sensor data
});

// Subscribe to 'message' event
device.on('message', function (topic, payload) {
    console.log('Received Message:', topic, payload.toString());
});