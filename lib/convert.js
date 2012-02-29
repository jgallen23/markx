var resistance = require('resistance');

var markdown = require('./converters/markdown');
var html = require('./converters/html');
var jade = require('./converters/jade');

var path = require('path');

var convert = function(file, options, callback) {
  var ext = path.extname(file); 
  if (ext == '.md') {
    markdown(file, options, callback);
  } else if (ext == '.html') {
    html(file, options, callback);
  } else if (ext == '.jade') {
    jade(file, options, callback);
  }
};

module.exports = function(file, options, callback) {
  
  var head = '', foot = '', template = '';

  var q = resistance.queue(function(file, callback) {
    convert(file, options, callback);
  });

  if (options.head) {
    q.push(options.head);
  }

  q.push(file);

  if (options.foot) {
    q.push(options.foot);
  }

  q.run(function(data) {
    var out = data.join('');
    if (options.template) {
      options.body = out;
      convert(options.template, options, function(str) {
        callback(str);
      });
    } else {
      callback(out);
    }
  });

};
