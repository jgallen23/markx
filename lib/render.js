var fs = require('fs');
var hl = require('highlight.js');
var marked_ = require('marked');

var marked = function(text, lang, nohl) {
  var tokens = marked_.lexer(text);
  var l = tokens.length;
  var i = 0;
  var token;

  if (!nohl) {
    for (; i < l; i++) {
      token = tokens[i];
      if (token.type === 'code') {
        if (lang)
          token.text = hl.highlight(lang, token.text).value;
        else
          token.text = hl.highlightAuto(token.text).value;
        // marked should not escape this
        token.escaped = true;
      }
    }
  }

  text = marked_.parser(tokens);

  return text;
};

var renderFile = function(file, lang, nohl, callback) {
  fs.readFile(file, 'utf8', function(err, str) {
    if (err) throw err;
    var out = marked(str, lang, nohl);
    callback(out);
  });
};

module.exports = renderFile;
