var azure = require('azure');

var Notification = function() {
    this.hubName = 'broders';
    this.connString = 'Endpoint=sb://broders.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=IvOpFLj4MZ1inOe2qeCA7+l+nJTULEvS9yyhuJ7Gncg=';

    this.notificationHubService = azure.createNotificationHubService(this.hubName, this.connString);
    var payload = {
        data: {
            msg: 'Hello!'
        }
    };
}

Notification.prototype.send = function(message) {
    this.notificationHubService.gcm.send(null, message, function(error) {
        if (!error) {
            //notification sent
        }
    });
}

module.exports = new Notification();