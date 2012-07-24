var res = require('resistance');
var aug = require('aug');
var fs = require('fs');

var markdown = require('./converters/markdown');
var html = require('./converters/html');
var jade = require('./converters/jade');

var path = require('path');

var convert = function(file, options, callback) {

  var ext = path.extname(file); 
  fs.readFile(file, 'utf8', function(err, source) {
    if (ext == '.md') {
      markdown(source, options, callback);
    } else if (ext == '.html') {
      html(file, options, callback);
    } else if (ext == '.jade') {
      jade(file, options, callback);
    }
  });
};

var defaults = require('./defaults');
module.exports = function(options, callback) {
  options = aug(true, {}, defaults, options);

  res.series([
    //input
    function(next) {
      convert(options.input, options, next);
    },
    //template
    function(next, body) {
      if (options.template) {
        convert(options.template, options, next);
      } else {
        next(null, body);
      }
    }
  ], function(err, source) {
    callback(err, source);
  });
};
