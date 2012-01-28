
var http = require('http');
var fs = require('fs');
var render = require('./render');
var url = require('url');
var static = require('node-static');
var path = require('path');

var publicPath = path.join(__dirname, '../public/');
var fileServer = new(static.Server)(publicPath);

module.exports = function(file, language, port) {

  var head = '';
  var foot = '';
  var md = '';
  var lastModified = new(Date)().toUTCString();

  var startServer = function() {
    if (!port) port = '8080';

    http.createServer(function (req, res) {
      var uri = url.parse(req.url).pathname;
      if (uri === '/') {
        res.writeHead(200, {'Content-Type': 'text/html', 'Last-Modified': lastModified});
        var body = (req.method === 'GET')?head+md+foot:'';
        res.end(body);
      } else { //serve static files
        req.addListener('end', function () {
          fileServer.serve(req, res);
        });
      }

    }).listen(port, "127.0.0.1");
    console.log('Open your browser to http://127.0.0.1:'+port+'/');
  };

  var getLayoutFiles = function() {
    head = fs.readFileSync(path.join(publicPath, 'head.html'), 'utf8');
    foot = fs.readFileSync(path.join(publicPath, 'foot.html'), 'utf8');
  };

  var convertToHtml = function() {
    render(file, language, function(out) {
      md = out; 
      setTimeout(function() {
        lastModified = new(Date)().toUTCString();
      }, 100);
    });
  };

  var startWatcher = function() {
    fs.watchFile(file, function() {
      console.log(file + " has changed");
      convertToHtml();
    });
  };

  getLayoutFiles();
  startWatcher();
  convertToHtml();
  startServer();
};
