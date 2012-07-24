var convert = require('../lib/convert');
var assert = require('assert');
var fs = require('fs');

var fixturePath = __dirname + '/fixtures/';
var readFixture = function(file) {
  return fs.readFileSync(fixturePath + file, 'utf8');
}

suite('convert', function() {

  suite('markdown', function() {
    test('basic convert with no template', function(done) {
      convert({
        input: fixturePath + 'basic.md'
      }, function(err, results) {
        assert.equal(err, null);
        assert.equal(results, readFixture('basic.html'));
        done();
      });
    });
    
    test('pass through options to convert', function(done) {
      convert({
        input: fixturePath + 'syntax2.md',
        highlight: false
      }, function(err, results) {
        assert.equal(err, null);
        assert.equal(results, readFixture('syntax2nohl.html'));
        done();
      });
    });

    test('convert with jade template')
    test('convert with html template')
  });
});
