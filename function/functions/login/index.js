'use strict'
var file = require('./login.json');

exports.handle = function(event, context, cb) {
    console.log('processing event: %j', event);
    cb(null, file);
}
