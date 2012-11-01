var aug = require('aug');
var fs = require('fs');
var hl = require('highlight.js');
var marked = require('marked');


module.exports = function(text, highlight, callback) {

  marked.setOptions({
    // callback for code highlighter
    gfm: true,
    pedantic: false,
    sanitize: false,
    highlight: function(code, lang) {

      var out;
      if (!highlight) {
        out = code; 
      } else if (lang) {
        out = hl.highlight(lang, code).value;
      } else {
        out = hl.highlightAuto(code).value;
      }
      return out;
    }
  });
  var result = marked(text);
  callback(null, result);
};
