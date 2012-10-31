var aug = require('aug');
var read = require('./utils/read');
var markdown = require('./utils/markdown');
var resistance = require('resistance');
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
  read(options.input, function(err, str) {
    options.input = str;
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
  if (options.template) {
    read(options.template, function(err, str) {
      if (err) {
        done(err);
      }
      var data = options.data || {};
      data.body = options.markdown;
      options.output = ejs.render(str, data);
      done(null, options);
    });
  } else {
    options.output = options.markdown;
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
