var jade = require('jade');
var aug = require('aug');

var defaults = {

}

module.exports = function(source, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }
  options = aug({}, defaults, options);

  var fn = jade.compile(source, options);
  var html = fn(options);
  callback(null, html);
};
