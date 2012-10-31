#!/usr/bin/env node

var fs = require('fs');
var convert = require('../lib/convert');
var preview = require('../lib/preview');

var version = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version;
var opt = require('optimist')
  .usage('Markx '+version+'\n$0 [opts]')
  .options('i', {
    alias: 'input',
    describe: 'Markdown|HTML|Jade input file',
    demand: true,
    type: 'string'
  })
  .options('t', {
    alias: 'template',
    describe: 'Jade|HTML template file'
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
  .options('p', {
    alias: 'preview',
    type: 'int',
    describe: 'Start a web server to preview [port]'
  })
  .options('c', {
    alias: 'config',
    type: 'string',
    describe: 'JSON|YAML config file to read from'
  })
  .options('h', {
    alias: 'help',
    describe: 'Show help info'
  });

var argv = opt.argv;

if (argv.help) {
  return opt.showHelp();
}


if (argv.preview) {
  if (typeof argv.preview == 'boolean') {
    argv.preview = 8000;
  }
  argv.port = argv.preview;

  preview(argv);
  console.log('Server started, please visits http://localhost:'+argv.port);
} else {
  convert(argv, function(err, results) {
    process.stdout.write(results);
  });
}
