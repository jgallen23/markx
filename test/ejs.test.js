var assert = require('assert');
var ejs = require('../lib/converters/ejs');
var fs = require('fs');


var fixturePath = __dirname + '/fixtures/';
var readFixture = function(file) {
  return fs.readFileSync(fixturePath + file, 'utf8');
}

suite('ejs', function() {

  test('take options and pass to ejs', function(done) {
    var ejsStr = readFixture('test.ejs');
    ejs(ejsStr, {
      pageTitle: 'Page Title'
    }, function(err, html) {
      assert.equal(err, null);
      assert.equal(html, readFixture('ejs.html'));
      done();
    });
  });
});
