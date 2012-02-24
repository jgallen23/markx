
var http = require('http');
var fs = require('fs');
var render = require('./render');
var url = require('url');
var static = require('node-static');
var path = require('path');

var publicPath = path.join(__dirname, '../public/');
var fileServer = new(static.Server)(process.cwd());

module.exports = function(options) {

  options.head = options.head || path.join(publicPath, 'head.html');
  options.foot = options.foot || path.join(publicPath, 'foot.html');
  var port = options.preview;
  var md = '';
  var lastModified = new(Date)().toUTCString();


  var startServer = function() {

    http.createServer(function (req, res) {
      var uri = url.parse(req.url).pathname;
      if (uri === '/') {
        res.writeHead(200, {'Content-Type': 'text/html', 'Last-Modified': lastModified});
        var body = (req.method === 'GET')?md:'';
        res.end(body);
      } else { //serve static files
        req.addListener('end', function () {
          fileServer.serve(req, res);
        });
      }

    }).listen(port, "127.0.0.1");
    console.log('Open your browser to http://127.0.0.1:'+port+'/');
  };

  var convertToHtml = function() {
    render(options, function(out) {
      md = out; 
      setTimeout(function() {
        lastModified = new(Date)().toUTCString();
      }, 100);
    });
  };

  var startWatcher = function() {
    fs.watchFile(options.file, function() {
      console.log(options.file + " has changed");
      setTimeout(function() {
        convertToHtml();
      }, 100);
    });
  };

  startWatcher();
  convertToHtml();
  startServer();
};
