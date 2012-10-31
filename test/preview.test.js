var assert = require('assert');
var request = require('supertest');
var preview = require('../lib/preview');
var fs = require('fs');

var fixturePath = __dirname + '/fixtures/';
var readFixture = function(file) {
  return fs.readFileSync(fixturePath + file, 'utf8');
}

suite('preview', function() {

  var app;

  setup(function() {
    app = preview({ 
      input: fixturePath + 'syntax2.md',
      template: fixturePath + 'layout1.jade',
      data: {
        pageTitle: 'Page Title'
      }
    });
  });
  teardown(function() {
    app.close();
  });

  test('serve converted file', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html')
      .end(function(err, res) {
        assert.equal(res.text, readFixture('preview1.html'));
        done();
      });
  });

  test('serve static file', function(done) {
    request(app)
      .get('/test/fixtures/basic.md')
      .end(function(err, res) {
        assert.equal(res.text, readFixture('basic.md'))
        done();
      });
  });

});
