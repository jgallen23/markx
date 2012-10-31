var aug = require('aug');
var fs = require('fs');
var hl = require('highlight.js');
var marked = require('marked');

var defaults = {
  highlight: true
}

module.exports = function(text, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  options = aug({}, defaults, options);
 
  marked.setOptions({
    // callback for code highlighter
    gfm: true,
    pedantic: false,
    sanitize: false,
    highlight: function(code, lang) {
      if (!options.highlight) {
        return code;
      }

      if (lang) {
        return hl.highlight(lang, code).value;
      } else {
        return hl.highlightAuto(code).value;
      }
    }
  });
  var result = marked(text);
  callback(null, result);
};

