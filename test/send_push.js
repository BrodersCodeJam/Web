var test = require('tap').test,
    notification = require('../src/server/notification'),
    TITLE = "HomeLoan Status",
    status,
    myVar;

test("notification is sent to Android", function(t) {
    status = notification.send(TITLE, 'received', '0');
    myVar = setInterval(function() {
        myTimer(t, 'android')
    }, 1000);
});

test("notification is sent to IOS", function(t) {
    status = notification.send(TITLE, 'received', '0');
    myVar = setInterval(function() {
        myTimer(t, 'ios')
    }, 1000);
});

function myTimer(t, os) {
    if (status[os]) {
        clearInterval(myVar);
        t.equal('success', status[os])
        t.end()
    }
}

