'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    RememberMe = require('./rememberme'),
    LocalStrategy = require('passport-local').Strategy,
    RememberMeStrategy = require('passport-remember-me').Strategy;

/**
 * Passport configuration
 */
module.exports = function() {
  
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
      done(err, user);
    });
  });

  // add other strategies for more authentication flexibility
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User.findOne({
        email: email
      }, function(err, user) {
        if (err) return done(err);
        
        if (!user) {
          return done(null, false, {
            message: 'This email is not registered.'
          });
        }
        if (!user.authenticate(password)) {
          return done(null, false, {
            message: 'This password is not correct.'
          });
        }
        return done(null, user);
      });
    }
  ));

  // Add remember-me strategy for user permanent login
  // The basic process for remember-me strategy is:
  // 1, When user request the website url, server receives a token from
  //    user cookie; then server compare this token with tokens in database,
  //    is they are the same, then authenticate the user, expire the token,
  //    and issue a new generated token;
  // 2, When user logout from the website, simply clear the cookie with token,
  //    and logout the user as it is in a local-strategy.
  //
  passport.use(new RememberMeStrategy(
    function(token, done) {
      console.log("========================");
      console.log("RememberMe Strategy Work");
      console.log("========================");
      RememberMe.consumeRememberMeToken(token, function(err, uid) {
        if (err) { return done(err); }
        if (!uid) { return done(null, false); }
        
        User.findOne({
          _id: uid
        }, function(err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, user);
        });
      });
    },
    RememberMe.issueToken
  ));
};