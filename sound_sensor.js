var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath: './certs/Sound Sensor Certificates/ceac142683bdc8d2f48db6709cf0821b83268e48366a91142d58bc84e19188eb-private.pem.key',
    certPath: './certs/Sound Sensor Certificates/ceac142683bdc8d2f48db6709cf0821b83268e48366a91142d58bc84e19188eb-certificate.pem.crt',
    caPath: './certs/Sound Sensor Certificates/AmazonRootCA1.pem',
    clientId: 'sound-sensor',
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

// Function to generate random sound data
function generateSoundData() {
    return Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Generates a random value between 50 and 100, unit is decibels
}

// Function to simulate sound sensor behavior
function simulateSoundSensor() {
    const soundData = generateSoundData(); // Generate random sound data
    const message = { time: current, device_id: 1, sound_data: soundData }; // Create message object
    device.publish('sound_stats', JSON.stringify(message)); // Publish message to topic
}

// Subscribe to 'connect' event
device.on('connect', function () {
    console.log('Connected to AWS IoT Core');
    device.subscribe('sound_stats'); // Subscribe to desired topic
    console.log('Simulating sound sensor data...');
    simulateSoundSensor(); // Simulate sound sensor data
});

// Subscribe to 'message' event
device.on('message', function (topic, payload) {
    console.log('Received Message:', topic, payload.toString());
});