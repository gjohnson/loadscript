
module.exports = function (redis, code) {
  var slice = Array.prototype.slice;
  var cache = null;

  function curry(fn) {
    var args = slice.call(arguments, 1);
    return function () {
      return fn.apply(null, args.concat(slice.call(arguments)));
    };
  }

  function load(code, next) {
    redis.send_command('script', ['LOAD', code], function (err, sha) {
      if (err) return done(err);
      cache = sha;
      next();
    });
  }

  function evalsha(keys, args, next) {
    redis.evalsha([cache, keys.length, keys, args], next);
  }

  return function (keys, args, done) {
    if (!cache) load(code, curry(evalsha, keys, args, done))
    else evalsha(cache, keys, args, done);
  };
};
