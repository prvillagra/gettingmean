var moongose = require("mongoose");
var readLine = require('readline');
var process = require('process');
var conn = 1;

var dbURI = conn === 0 ? 
            "mongodb://localhost/Loc8r" : 
            "mongodb://prvcosmo:8uZmuFXmy4COf0JQaxEXiz9gEQgyVdmGifHsjGbFoAJNT5zrW8bBEltlBPCSz19lYDB89LQxNYzLQXByxVfHrA==@prvcosmo.documents.azure.com:10255/Loc8r?ssl=true&replicaSet=globaldb";

moongose.connect(dbURI);

moongose.connection.on('connected', function () {
    console.log("Moongose connected to: " + dbURI);
});

moongose.connection.on('error', function (err) {
    console.log("Moongose connection error: " + err);
});

moongose.connection.on('disconnected', function () {
    console.log('Moongose disconnected');
});

if (process.platform === "Win32") {
    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', function () {
        process.emit('SIGINT');
    });
}

// Shuttind down the connection
var gracefulShutdown = function (msg, callback) {
    moongose.connection.close(function () {
        console.log("Moongose disconnected through: " + msg);
        callback();
    });
}

// Killing through nodemon
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Killing through SIGINT signal
process.on('SIGINT', function () {
    gracefulShutdown('App termination', function () {
        process.exit(0);
    });
})

// Killing through Heroku
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

require('./locations');