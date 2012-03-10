var Masher = require('masher');
var jade = require('jade');

module.exports = function(file, options, callback) {
  var render = function(masherHelper) {
    var jadeOptions = {
      body: options.body,
      masher: masherHelper || false
    }; 
    jade.renderFile(file, jadeOptions, function(err, str) {
      if (err)
        throw err;
      callback(str);
    });
  };
  if (options.masher) {
    var m = new Masher(options.masher, (options.preview)?true:false);
    m.build(function() {
      render(m.helper());
    });
  } else {
    render();
  }
};
