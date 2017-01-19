'use strict'
var file = require('./sidemenu.json');

exports.handle = function(event, context, cb) {
  console.log('processing event: %j', event);
  cb(null, file);
  /*var bmod = event.bmod;
  if (bmod == "b_read_data") {
    cb(null, file);
  }*/
}
