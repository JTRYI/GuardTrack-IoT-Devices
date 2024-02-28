var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath: './certs/Pest Control Device Certificates/ce3f3a9a964f01c2915b83c2f2efe390756989e0f564a2257e545e507ef21b24-private.pem.key',
    certPath: './certs/Pest Control Device Certificates/ce3f3a9a964f01c2915b83c2f2efe390756989e0f564a2257e545e507ef21b24-certificate.pem.crt',
    caPath: './certs/Pest Control Device Certificates/AmazonRootCA1.pem',
    clientId: 'pest-control-device',
    host: 'a1dwkf6z95khyc-ats.iot.us-east-1.amazonaws.com'
});

// Subscribe to 'connect' event
device.on('connect', function () {
    console.log('Connected to AWS IoT Core');
    device.subscribe('pest_control'); // Subscribe to desired topic

});

// Subscribe to 'message' event
device.on('message', function (topic, payload) {
    console.log('Received Message:', topic, payload.toString());
});
