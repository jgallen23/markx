var jade = require('jade');

module.exports = function(file, options, callback) {
  var jadeOptions = {
    body: options.body
  }; 
  jade.renderFile(file, jadeOptions, function(err, str) {
    callback(str);
  });
};
