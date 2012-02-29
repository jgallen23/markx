var fs = require('fs');

module.exports = function(file, options, callback) {
  fs.readFile(file, 'utf8', function(err, str) {
    if (err)
      throw err;
    callback(str);
  });
};
