
var http = require('http');
var fs = require('fs');
var convert = require('./convert');
var url = require('url');
var static = require('node-static');
var path = require('path');
var stalk = require('stalk');

var publicPath = path.join(__dirname, '../public/');
var markxFileServer = new(static.Server)(publicPath);
var fileServer = new(static.Server)(process.cwd());

module.exports = function(file, options) {

  var type = path.extname(file);
  if (type != '.jade' && !options.head && !options.foot && !options.template) {
    options.template = path.join(publicPath, 'template.jade');
  }
  var port = options.preview;
  var body = '';
  var lastModified = new(Date)().toUTCString();

  var startServer = function() {

    var stalkMiddleware = stalk.middleware(process.cwd());

    http.createServer(function (req, res) {
      var uri = url.parse(req.url).pathname;
      if (uri === '/') {
        res.writeHead(200, {'Content-Type': 'text/html', 'Last-Modified': lastModified});
        if (req.method === 'GET') {
          convert(file, options, function(out) {
            res.end(out);
          });
        } else {
          res.end();
        }
      } else { //serve static files
        stalkMiddleware(req, res, function() {
          var serveStatic = function() {
            req.addListener('end', function () {
              fileServer.serve(req, res, function(err, result) {
                if (err) {
                  markxFileServer.serve(req, res);
                }
              });
            });
          };
          if (options.masher) {
            options.masher.middleware()(req, res, function() {
              serveStatic();
            });
          } else {
            serveStatic();
          }
        });
      }

    }).listen(port, "127.0.0.1");
    console.log('Open your browser to http://127.0.0.1:'+port+'/');
  };

  var watchFile = function(f) {
    if (!f)
      return;
    fs.watchFile(f, function() {
      console.log(f + " has changed");
      setTimeout(function() {
        lastModified = new(Date)().toUTCString();
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
  startServer();
};
