
var http = require('http');
var fs = require('fs');
var convert = require('./convert');
var url = require('url');
var static = require('node-static');
var path = require('path');

var publicPath = path.join(__dirname, '../public/');
var markxFileServer = new(static.Server)(publicPath);
var fileServer = new(static.Server)(process.cwd());

module.exports = function(file, options) {

  if (!options.head && !options.foot && !options.template) {
    options.template = path.join(publicPath, 'template.jade');
  }
  var port = options.preview;
  var body = '';
  var lastModified = new(Date)().toUTCString();

  var startServer = function() {

    http.createServer(function (req, res) {
      var uri = url.parse(req.url).pathname;
      if (uri === '/') {
        res.writeHead(200, {'Content-Type': 'text/html', 'Last-Modified': lastModified});
        var resBody = (req.method === 'GET')?body:'';
        res.end(resBody);
      } else { //serve static files
        req.addListener('end', function () {
          fileServer.serve(req, res, function(err, result) {
            if (err) {
              markxFileServer.serve(req, res);
            }
          });
        });
      }

    }).listen(port, "127.0.0.1");
    console.log('Open your browser to http://127.0.0.1:'+port+'/');
  };

  var convertToHtml = function() {
    convert(file, options, function(out) {
      body = out; 
      setTimeout(function() {
        lastModified = new(Date)().toUTCString();
      }, 100);
    });
  };

  var watchFile = function(f) {
    if (!f)
      return;
    fs.watchFile(f, function() {
      console.log(f + " has changed");
      setTimeout(function() {
        convertToHtml();
      }, 100);
    });
  };
  var startWatcher = function() {
    watchFile(options.head);
    watchFile(options.foot);
    watchFile(options.template);
    watchFile(file);
  };

  startWatcher();
  convertToHtml();
  startServer();
};
