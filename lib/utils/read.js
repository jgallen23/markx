var fs = require('fs');
var path = require('path');

var exists = fs.exists || path.exists;

module.exports = function(input, callback) {
  exists(input, function(exist) {
    if (exist) {
      fs.readFile(input, 'utf8', callback);
    } else {
      callback(null, input);
    }
  });
};
