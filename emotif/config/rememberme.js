'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.issueToken = function(user, done) {
  var token = randomString(64);
  saveRememberMeToken(token, user, function(err) {
    if (err) { return done(err); }
    return done(null, token);
  });

  function saveRememberMeToken(token, user, fn) {
    user.saveToken(token);
    return fn();
  }

  // This is the temporary strategy for generating a random token
  // This is very UNSAFE when the user community grows huge!!!
  function randomString(len) {
    var buf = []
      , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      , charlen = chars.length;

    for (var i = 0; i < len; ++i) {
      buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

  // Authenticate the token and then delete it
exports.consumeRememberMeToken = function(token, fn) {
  User.findOne({
      token: token
    }, function(err, user) {
      if(err) return done(err);
      if(user) {
        var uid = user._id;
        // delete the token;
        user.deleteToken();
        return fn(null, uid);
      } else {
        return fn(null, null);
      }
    }
  );
}