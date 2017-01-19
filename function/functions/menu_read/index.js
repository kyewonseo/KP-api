'use strict'
var file = require('./menu.json');

exports.handle = function(event, context, cb) {
  console.log('processing event: %j', event.bmod);
  cb(null, file);
  /*if (bmod == "b_read_data") {
    cb(null, file);
  }*/
}
