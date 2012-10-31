var assert = require('assert');

var exec = require('child_process').exec;
var fs = require('fs');

var cmd = 'node bin/markx.js';
var fixturesDir = __dirname + '/fixtures/';

suite('cli', function() {

  test('no arguments', function(done) {
    exec(cmd, function(err, stdout, stderr) {
      assert.ok(stdout.match(/Error: must pass in a file/));
      done();
    });
  });

  test('input', function(done) {
    exec(cmd + ' '+fixturesDir+'plain.md', function(err, stdout, stderr) {
      assert.equal(err, null);
      assert.ok(stdout, fs.readFileSync(fixturesDir+'plain.html', 'utf8'));
      done();
    });
  });

  test('input file + no syntax highligting', function(done) {
    exec(cmd + ' --no-highlight '+ fixturesDir + 'js.md', function(err, stdout, stderr) {
      assert.equal(err, null);
      assert.equal(stdout, fs.readFileSync(fixturesDir+'js-no-highlight.html', 'utf8'));
      done();
    });
  });

  test('input file + template file', function(done) {
    exec(cmd + ' ' + fixturesDir + 'plain.md --template ' + fixturesDir + 'layout1.html', function(err, stdout, stderr) {
      assert.equal(err, null);
      assert.equal(stdout, fs.readFileSync(fixturesDir+'plain-layout1.html', 'utf8'));
      done();
    });
  });
  
  test('input file + template file + json file', function(done) {
    exec(cmd + ' ' + fixturesDir + 'plain.md --template ' + fixturesDir + 'layout2.html --data ' + fixturesDir + 'data.json', function(err, stdout, stderr) {
      assert.equal(err, null);
      assert.equal(stdout, fs.readFileSync(fixturesDir+'plain-layout2.html', 'utf8'));
      done();
    });
  });

  test('input file + template file + yaml file', function(done) {
    exec(cmd + ' ' + fixturesDir + 'plain.md --template ' + fixturesDir + 'layout2.html --data ' + fixturesDir + 'data.yaml', function(err, stdout, stderr) {
      assert.equal(err, null);
      assert.equal(stdout, fs.readFileSync(fixturesDir+'plain-layout2.html', 'utf8'));
      done();
    });
  });

  test('-h', function(done) {
    exec(cmd + ' -h', function(err, stdout, stderr) {
      assert.equal(err, null);
      assert.ok(stdout.match(/Usage: /));
      done();
    });
  });

  test('--help', function(done) {
    exec(cmd + ' --help', function(err, stdout, stderr) {
      assert.equal(err, null);
      assert.ok(stdout.match(/Usage: /));
      done();
    });
  });
});


