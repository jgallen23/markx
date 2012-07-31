var fs = require('fs');
var ejs = require('ejs');

module.exports = function(source, options, callback) {
  var str = ejs.render(source, options);
  callback(null, str);
};
