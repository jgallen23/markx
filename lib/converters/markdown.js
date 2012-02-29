var fs = require('fs');
var hl = require('highlight.js');
var marked_ = require('marked');

var marked = function(text, nohl) {
  var tokens = marked_.lexer(text);
  var l = tokens.length;
  var i = 0;
  var token;

  if (!nohl) {
    for (; i < l; i++) {
      token = tokens[i];
      if (token.type === 'code') {
        var lang = false;
        if (token.text[0] == '`') { //set language
          var newText = token.text.split('\n');
          var line = newText[0];
          newText.splice(0, 1);
          lang = line.substr(1, line.length - 1);
          token.text = newText.join('\n');
        }
        if (lang) {
          token.text = hl.highlight(lang, token.text).value;
        } else {
          token.text = hl.highlightAuto(token.text).value;
        }
        // marked should not escape this
        token.escaped = true;
      }
    }
  }

  text = marked_.parser(tokens);

  return text;
};

var renderFile = function(file, options, callback) {
  fs.readFile(file, 'utf8', function(err, str) {
    if (err) throw err;
    var out = marked(str, options.nohl);
    callback(out);
  });
};

module.exports = renderFile;
