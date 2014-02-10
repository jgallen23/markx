var aug = require('aug');
var read = require('./utils/read');
var markdown = require('./utils/markdown');
var resistance = require('resistance');
var path = require('path');
var ejs = require('ejs');


var defaults = function(done, options) {

  var def = {
    highlight: true
  };

  options = aug({}, def, options);

  if (!options.input) {
    return done(new Error('input must be set'));
  }

  done(null, options);
};

var readInput = function(done, options) {
  var file = options.input;
  read(file, function(err, str) {

    // Check the file for YAML front matter
    var lines = str.trim().split('\n');
    if ( /^\-+/.test(lines[0]) ) {
      // Accumulate data
      var data = [];
      for (var i = 1, n = lines.length; i < n; i++) {
        if ( /^\-+/.test(lines[i]) ) {
          break;
        }
        data.push(lines[i]);
      }
      // Parse data
      var frontMatter = {};
      for (var j = 0; j < data.length; j++) {
        var line = data[j].split(':');
        var param = line[0].trim();
        var value = line[1].trim();
        frontMatter[param] = value;
      }
      // Remove front matter from file string
      lines = lines.splice(i + 1);
      // Check for line breaks at the end of the file
      var breakAtEnd = /\n$/.test(str) ? '\n' : '';
      str = lines.join('\n').replace(/^\s+/g, '') + breakAtEnd;
      // Attach data to the options object
      options.data = aug({}, frontMatter, options.data);
    }

    options.input = str;
    options.filename = file;
    done(err, options);
  });
};

var convertMarkdown = function(done, options) {
  markdown(options.input, options.highlight, function(err, results) {
    options.markdown = results;
    done(err, options);
  });
};

var processTemplate = function(done, options) {
  var data = options.data || {};
  if (data.template) {
    var base = path.dirname(options.filename);
    options.template = path.join(base, data.template);
  }
  var out = options.markdown;
  var processMarkdown = options.processMarkdown || data.processMarkdown;
  var rendered = out;
  if (processMarkdown) {
    out = out.replace(/&lt;%/g, '<%').replace(/%&gt;/g, '%>');
    rendered = ejs.render(out, data);
  }
  if (options.template) {
    read(options.template, function(err, str) {
      if (err) {
        done(err);
      }
      data.body = rendered;
      options.output = ejs.render(str, data);
      done(null, options);
    });
  } else {
    options.output = rendered;
    done(null, options);
  }
};

var output = function(done, options) {
  done(null, options.output);
};

var markx = function(options, callback) {
  callback = callback || function() {};

  resistance()
    .queue([options])
    .use(defaults)
    .use(readInput)
    .use(convertMarkdown)
    .use(processTemplate)
    .use(output)
    .end(callback);
};


module.exports = markx;
