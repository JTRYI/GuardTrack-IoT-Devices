var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath: './certs/Video Camera Certificates/033755d1a15bf0a527f5f3eebcd877e855421bbf1e0ba3048e468aeb095d4a3a-private.pem.key',
    certPath: './certs/Video Camera Certificates/033755d1a15bf0a527f5f3eebcd877e855421bbf1e0ba3048e468aeb095d4a3a-certificate.pem.crt',
    caPath: './certs/Video Camera Certificates/AmazonRootCA1.pem',
    clientId: 'video-camera',
    host: 'a1dwkf6z95khyc-ats.iot.us-east-1.amazonaws.com'
});

// Subscribe to 'connect' event
device.on('connect', function () {
    console.log('Connected to AWS IoT Core');
    device.subscribe('video_camera'); // Subscribe to desired topic

});

// Subscribe to 'message' event
device.on('message', function (topic, payload) {
    console.log('Received Message:', topic, payload.toString());
});
