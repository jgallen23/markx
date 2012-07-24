var markdown = require('../lib/converters/markdown');
var fs = require('fs');
var assert = require('assert');

var fixturePath = __dirname + '/fixtures/';
var readFixture = function(file) {
  return fs.readFileSync(fixturePath + file, 'utf8');
}
suite('markdown', function() {

  test('convert markdown', function(done) {
    var fixture = readFixture('basic.md');
    markdown(fixture, function(err, results) {
      assert.equal(err, null);
      assert.equal(results, readFixture('basic.html'));
      done();
    });
  });

  test('convert markdown with auto syntax highlighting', function(done) {
    var fixture = readFixture('syntax1.md');

    markdown(fixture, function(err, results) {
      var expected = readFixture('syntax1.html');
      assert.equal(err, null);
      assert.equal(results, expected);
      done();
    });

  });

  test('convert github style syntax highlighting', function(done) {
    var fixture = readFixture('syntax2.md');

    markdown(fixture, function(err, results) {
      var expected = readFixture('syntax2.html');
      assert.equal(err, null);
      assert.equal(results, expected);
      done();
    });

  });
  test('convert markdown with syntax highlighting disabled', function(done) {
    var fixture = readFixture('syntax2.md');

    markdown(fixture, { highlight: false }, function(err, results) {
      var expected = readFixture('syntax2nohl.html');
      assert.equal(err, null);
      assert.equal(results, expected);
      done();
    });
  });
});
