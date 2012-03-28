var Masher = require('masher');
var jade = require('jade');
var aug = require('aug');

module.exports = function(file, options, callback) {
  var render = function() {
    var jadeOptions = {
      body: options.body,
      masher: (options.masher)?options.masher.helper():false
    }; 
    aug(jadeOptions, options.data);
    jadeOptions.env = options.env;
    jade.renderFile(file, jadeOptions, function(err, str) {
      if (err)
        throw err;
      callback(str);
    });
  };
  if (options.masher && !options.preview) {
    options.masher.build(function() {
      render();
    });
  } else {
    render();
  }
};
