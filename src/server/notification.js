var azure = require('azure');

var Notification = function() {
    var hubName = 'broders',
        connString = 'Endpoint=sb://broders.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=IvOpFLj4MZ1inOe2qeCA7+l+nJTULEvS9yyhuJ7Gncg=';

    this.notificationHubService = azure.createNotificationHubService(hubName, connString);

};

Notification.prototype.send = function(title, message, status) {
    var self = this;

    var payload = {
        "aps": {
            "alert": message
        },
        "data": {
            "message": message,
            "title": title,
            "status": status
        }
    };

    var sendStatus = {};

    sendAndroidNotification = function() {
        self.notificationHubService.gcm.send(null, payload, function(error) {
            checkStatus(error, 'android');
        });
    };

    var sendIOSNotification = function() {
        self.notificationHubService.apns.send(null, payload, function(error) {
            return checkStatus(error, 'ios');
        });
    };

    sendAndroidNotification();
    sendIOSNotification();

    function checkStatus(error, os) {
        if (!error) {
            sendStatus[os] = "success";
        } else {
            sendStatus[os] = "error";
        }
    }

    return sendStatus;
};

module.exports = new Notification();