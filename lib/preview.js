var http = require('http');
var fs = require('fs');
var convert = require('./convert');
var url = require('url');
var path = require('path');
var send = require('send');
var aug = require('aug');
var defaults = require('./defaults');


var startServer = function(options) {
  return http.createServer(function (req, res) {
    var uri = url.parse(req.url).pathname;
    if (uri === '/') {
      fs.stat(options.input, function(err, stats) {
        var lastModified = stats.mtime.toUTCString();
        res.writeHead(200, {'Content-Type': 'text/html', 'Last-Modified': lastModified });
        if (req.method === 'GET') {
          convert(options, function(err, out) {
            res.end(out);
          });
        } else {
          res.end();
        }
      });
    } else { //serve static files
      send(req, uri)
        .root(process.cwd())
        .pipe(res);
    }

  }).listen(options.port);
}

module.exports = function(options) {
  options = aug(true, {}, defaults, options);
  return startServer(options);
};
