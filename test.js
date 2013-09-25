
var fs = require('fs');
var assert = require('assert');
var redis = require('redis');
var loadscript = require('./index');

var rc = redis.createClient();
var script = loadscript(rc, fs.readFileSync('./test.lua'));

script([], [], function (err, output) {
  assert(output == 'hello world!');
  rc.quit(function () {
    process.exit(0);
  });
});