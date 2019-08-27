'use strict';
console.log("Node app server.js hit (rootdir):" + __dirname);
var express = require('express');
var cfenv = require('cfenv');
var path = require('path');
var app = express();
const staticPath = path.join(__dirname, 'public')
app.use(express.static(staticPath));
var appEnv = cfenv.getAppEnv();

// defined CORS before all route definitions
let allowedOrigins = [
    'https://localhost:9999',
    'https://clientconnect-react-qa.mybluemix.net',
    'https://clientconnect-react-dev.mybluemix.net'
];
// defined CORS before all route definitions
var cors = require("cors");
app.use(cors({
    origin: function (origin, callback) {
        console.log("CORS Check for: " + origin)
        if (!origin) return callback(null, false);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin: ' + origin;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// configure routes
var config = require("./api/config");
var sso = require('./api/sso')(config, app);   
app.use('/sso',  sso);   

app.get('*', function (req, res) {
    console.log('****** request: ' + req.originalUrl);
    if (req.originalUrl.startsWith('/helpFiles')) {
          res.sendFile(path.join(__dirname, '/public',  req.originalUrl));
    } else if (req.originalUrl === '/help') {
        res.sendFile(path.join(__dirname, '/public',  'index.html'));
    } else {
        res.sendFile(path.join(__dirname, '/public',  'index.html'));
    }
});

// server start
console.log('node env (isLocal): ' + appEnv.isLocal + ', port: ' + appEnv.port);
if (appEnv === undefined || appEnv.bind === undefined || appEnv.bind === 'localhost') {
    console.log('Running locally, so setting port to 9998');
    var fs = require('fs');
    var https = require('https');
    https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app).listen(9998);
    console.log('Express server listening on at: https://localhost:9998/');
} else {
    app.listen(appEnv.port, function() {
        console.log("server starting (name): " + appEnv.name);
        console.log("server starting on port: " + appEnv.port + ", url: "+ appEnv.url);
    });
}
module.exports = app;
