var assert = require('assert');
var fs = require('fs');
var read = require('../../lib/utils/read');
var path = require('path');

suite('read', function() {

  var fixture = path.join(__dirname, '../fixtures/plain.md');

  test('pass in file', function(done) {
    read(fixture, function(err, str) {
      assert.equal(str, fs.readFileSync(fixture, 'utf8'));
      done();
    });
    
  });

  test('read in string', function(done) {
    var fixtureStr = fs.readFileSync(fixture, 'utf8');

    read(fixtureStr, function(err, str) {
      assert.equal(str, fixtureStr);
      done();
    });
  });
  
});

