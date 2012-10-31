var res = require('resistance');
var aug = require('aug');
var fs = require('fs');
var yaml = require('js-yaml');

var markdown = require('./converters/markdown');
var ejs = require('./converters/ejs');
var jade = require('./converters/jade');

var path = require('path');

var convert = function(file, options, callback) {

  var ext = path.extname(file); 
  fs.readFile(file, 'utf8', function(err, source) {
    if (ext == '.md') {
      markdown(source, options, callback);
    } else if (ext == '.html' || ext == '.ejs') {
      ejs(source, options.data, callback);
    } else if (ext == '.jade') {
      jade(source, options.data, callback);
    }
  });
};

var defaults = require('./defaults');

var readConfigFile = function(file) {
  return yaml.load(fs.readFileSync(file, 'utf8'));
};

module.exports = function(options, callback) {

  if (typeof options == 'string') {
    options = readConfigFile(options);
  }
  if (options.config) {
    options = aug(true, {}, readConfigFile(options.config), options); 
  }
  if (typeof options.data == 'string') {
    options.data = readConfigFile(options.data);
  }

  options = aug(true, {}, defaults, options);

  res.series([
    //input
    function(next) {
      convert(options.input, options, next);
    },
    //template
    function(next, body) {
      if (options.template) {
        options.data.body = body;
        convert(options.template, options, next);
      } else {
        next(null, body);
      }
    }
  ], function(err, source) {
    callback(err, source);
  });
};
