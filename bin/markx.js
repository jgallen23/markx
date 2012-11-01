#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var version = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version;
var markx = require('../');
require('js-yaml');

var opt = require('optimist')
  .usage('markx '+version+'\nUsage: $0 input.md [opts]')
  .options('t', {
    alias: 'template',
    describe: 'HTML template file'
  })
  .options('l', {
    alias: 'highlight',
    describe: 'Enable or disable syntax highlighting',
    "default": true,
    type: 'boolean'
  })
  .options('d', {
    alias: 'data',
    type: 'string',
    describe: 'JSON|YAML data file that gets passed to input and template'
  })
  .options('h', {
    alias: 'help',
    describe: 'Show help info'
  });

var argv = opt.argv;

if (argv.help || argv._.length === 0) {
  return opt.showHelp(function(help) {
    console.log(help);
    if (argv._.length === 0) {
      console.log('Error: must pass in a file');
    }
  });
}

var data;
if (argv.data) {
  var dataPath = path.resolve(process.cwd(), argv.data);
  data = require(dataPath);
}

markx({
  input: argv._[0],
  highlight: argv.highlight,
  template: argv.template,
  data: data
}, function(err, results) {
  if (err) {
    throw err;
  }
  process.stdout.write(results);
});


