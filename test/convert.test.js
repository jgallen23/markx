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

    test('convert with jade template', function(done) {
      convert({
        input: fixturePath + 'syntax2.md',
        template: fixturePath + 'layout2.jade'
      }, function(err, results) {
        assert.equal(results, readFixture('jade2.html'));
        done();
      });
    });

    test('pass through data to jade', function(done) {
      convert({
        input: fixturePath + 'syntax2.md',
        template: fixturePath + 'layout1.jade',
        data: {
          pageTitle: 'Page Title'
        }
      }, function(err, results) {
        assert.equal(results, readFixture('jade3.html'));
        done();
      });
    })
    test('convert with html template')
  });

  suite('jade input file', function() {

    test('jade input file with no template', function(done) {
      convert({
        input: fixturePath + 'basic.jade',
        data: {
          pageTitle: 'Page Title'
        }
      }, function(err, results) {
        assert.equal(results, readFixture('jade4.html'));
        done();
      });
    });

    test('jade input file with a template', function(done) {
      convert({
        input: fixturePath + 'basic.jade',
        template: fixturePath + 'layout2.jade',
        data: {
          pageTitle: 'Page Title'
        }
      }, function(err, results) {
        assert.equal(results, readFixture('jade5.html'));
        done();
      });
    });
  });

  suite('config file', function() {

    test('pass yaml/json file instead of object', function(done) {
      convert(fixturePath + 'config.json', function(err, results) {
        assert.equal(results, readFixture('jade2.html'));
        done();
      });
    });

    test('options.config = file', function(done) {
      convert({
        highlight: false,
        config: fixturePath + 'config.json'
      }, function(err, results) {
        //input and template come from config, can override with object (highlight = false)
        assert.equal(results, readFixture('config.html'));
        done();
      });
    });
  });

  suite('data', function() {
    test('can pass in yaml/json file as data', function(done) {
      convert({
        input: fixturePath + 'basic.jade',
        template: fixturePath + 'layout2.jade',
        data: fixturePath + 'data.yaml'
      }, function(err, results) {
        assert.equal(results, readFixture('jade5.html'));
        done();
      });
    });
  });

  suite('ejs input file', function() {
    test('ejs input file with no template', function(done) {
      convert({
        input: fixturePath + 'test.ejs',
        data: {
          pageTitle: 'Page Title'
        }
      }, function(err, results) {
        assert.equal(results, readFixture('ejs.html'));
        done();
      });
    });
  });
});
