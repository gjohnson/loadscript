
# loadscript

A non-featureful utility to loading lua scripts.

## Example

```js
var fs = require('fs');
var redis = require('redis');
var assert = require('assert');
var loadscript = require('loadscript');

var rc = redis.createClient();
var lua = fs.readFileSync('./test.lua');
var script = loadscript(rc, lua);

script([], [], function (err, output) {
  assert(output == 'hello world!');
  rc.quit(function () {
    process.exit(0);
  });
});
```

## License

MIT