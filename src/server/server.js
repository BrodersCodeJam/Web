var express = require('express'),
    http = require('http'),
    notification = require('./notification');


module.exports = (function() {
    try {
        var app = express();

        app.use(express.static('../'));

        var TITLE = "HomeLoan Status";

        app.get('/received', function(req, res) {
            console.log("RECEIVED");
            notification.send(TITLE, 'received', '0');
            res.end();
        });

        app.get('/processing', function(req, res) {
            console.log("PROCESSING");
            notification.send(TITLE, 'processing', '1');
            res.end();
        });

        app.get('/approved', function(req, res) {
            console.log("APPROVED");
            notification.send(TITLE, 'approved', '2');
            res.end();
        });

        app.get('/legal', function(req, res) {
            console.log("LEGAL");
            notification.send(TITLE, 'legal', '3');
            res.end();
        });

        app.get('/complete', function(req, res) {
            console.log("COMPLETE");
            notification.send(TITLE, 'complete', '4');
            res.end();
        });

        var server = http.createServer(app);

        function onError(err) {
            if (err.code === 'EADDRINUSE') {
                console.log("Server already running. Stop it by entering http://localhost/kill in your browser");
            }
        }

        server.once('error', onError);

        server.listen(9091);

    } catch (e) {
        console.log("Error starting server");
    }
})();