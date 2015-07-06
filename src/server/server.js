var express = require('express'),
    http = require('http'),
    notification = require('./notification');


//module.exports = function() {
    try {
        var app = express();

        app.use(express.static('../'));

        //receievem process approved attorneys congrats

        app.get('/received', function(req, res) {
            console.log("RECEIVED");
            notification.send('received');
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
//};