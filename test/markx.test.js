var assert = require('assert');
var markx = require('../');
var fs = require('fs');


var fixturesDir = __dirname + '/fixtures/';

suite('markx', function() {

  test('input must exist', function(done) {
    markx({}, function(err, results) {
      assert.notEqual(err, null);
      done();
    });
  });

  test('md file into html', function(done) {
    markx({
      input: fixturesDir + 'plain.md'
    }, function(err, results) {
      assert.equal(err, null);
      assert.equal(results, fs.readFileSync(fixturesDir + 'plain.html'));
      done();
    });
  });

  test('md source into html', function(done) {
    var source = fs.readFileSync(fixturesDir + 'plain.md', 'utf8');
    markx({
      input: source 
    }, function(err, results) {
      assert.equal(err, null);
      assert.equal(results, fs.readFileSync(fixturesDir + 'plain.html'));
      done();
    });
  });

  test('md file + auto syntax into html', function(done) {
    markx({
      input: fixturesDir + 'auto-syntax.md'
    }, function(err, results) {
      assert.equal(err, null);
      assert.equal(results, fs.readFileSync(fixturesDir+'auto-syntax.html', 'utf8'));
      done();
    });
  });
  
  test('md file + js syntax into html', function(done) {
    markx({
      input: fixturesDir + 'js.md'
    }, function(err, results) {
      assert.equal(err, null);
      assert.equal(results, fs.readFileSync(fixturesDir+'js.html', 'utf8'));
      done();
    });
  });

  test('md file + no syntax highligting', function(done) {
    markx({
      input: fixturesDir + 'js.md',
      highlight: false
    }, function(err, results) {
      assert.equal(err, null);
      assert.equal(results, fs.readFileSync(fixturesDir+'js-no-highlight.html', 'utf8'));
      done();
    });
  });

  test('md file + template', function(done) {
    markx({
      input: fixturesDir + 'plain.md',
      template: fixturesDir + 'layout1.html'
    }, function(err, results) {
      assert.equal(err, null);
      assert.equal(results, fs.readFileSync(fixturesDir+'plain-layout1.html', 'utf8'));
      done();
    });
  });

  test('md file + template + data', function(done) {
    markx({
      input: fixturesDir + 'plain.md',
      template: fixturesDir + 'layout2.html',
      data: {
        pageTitle: 'This is the page title'
      }
    }, function(err, results) {
      assert.equal(err, null);
      assert.equal(results, fs.readFileSync(fixturesDir+'plain-layout2.html', 'utf8'));
      done();
    });
    
  });


});

