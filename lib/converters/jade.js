var Masher = require('masher');
var jade = require('jade');
var aug = require('aug');

module.exports = function(file, options, callback) {
  var render = function(masherHelper) {
    var jadeOptions = {
      body: options.body,
      masher: masherHelper || false
    }; 
    aug(jadeOptions, options.data);
    jade.renderFile(file, jadeOptions, function(err, str) {
      if (err)
        throw err;
      callback(str);
    });
  };
  if (options.masher) {
    var m = new Masher(options.masher, (options.preview)?true:false);
    if (!options.preview) {
      m.build(function() {
        render(m.helper());
      });
    } else {
      render(m.helper());
    }
  } else {
    render();
  }
};
