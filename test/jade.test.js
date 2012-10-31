var assert = require('assert');
var jade = require('../lib/converters/jade');
var fs = require('fs');


var fixturePath = __dirname + '/fixtures/';
var readFixture = function(file) {
  return fs.readFileSync(fixturePath + file, 'utf8');
}

suite('jade', function() {

  test('convert jade into html', function(done) {
    jade('p Test', function(err, result) {
      assert.equal(err, null);
      assert.equal(result, '<p>Test</p>');
      done();
    });
  });

  test('take options and pass to jade', function(done) {
    var jadeStr = readFixture('layout1.jade');
    jade(jadeStr, {
      body: '<div>Test</div>',
      pageTitle: 'Testing Page Title'
    }, function(err, html) {
      assert.equal(err, null);
      assert.equal(html + '\n', readFixture('jade1.html'));
      done();
    });
  });
});
