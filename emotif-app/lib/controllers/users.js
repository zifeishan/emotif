'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    UserMood = mongoose.model('UserMood'),
    passport = require('passport');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';

  newUser.save(function(err) {
    if (err) {
      // Manually provide our own message for 'unique' validation errors, can't do it from schema
      if(err.errors.email.type === 'Value is not unique.') {
        err.errors.email.type = 'The specified email address is already in use.';
      }
      return res.json(400, err);
    }

    req.logIn(newUser, function(err) {
      if (err) return next(err);
      
      return res.json(req.user.userInfo);
    });
  });


  console.log(newUser.email);


};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(new Error('Failed to load User'));
  
    if (user) {
      res.send({ profile: user.profile });
    } else {
      res.send(404, 'USER_NOT_FOUND');
    }
  });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {

      user.password = newPass;
      user.save(function(err) {
        if (err) {
          res.send(500, err);
        } else {
          res.send(200);
        }
      });
    } else {
      res.send(400);
    }
  });
};

/**
* Check if user exists
*/
exports.userExist = function(req, res, next) {
  var useremail = String(req.body.email);

  User.find({email: useremail}, function (err, user) {
    if (err) return next(new Error('Failed to load User'));
    if (user.length) {
      res.json({ exist: true });
      // console.log('true');
    } else {
      res.json({ exist: false });
      // console.log('false');
    }
  });
};

/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};


/**
* Check if user exists
*/
exports.addMood = function(req, res, next) {
  var useremail = String(req.body.email);
  var time = String(req.body.time);
  var mood = String(req.body.mood);

  
  User.find({email: useremail}, function (err, user) {
    if (err) return next(new Error('Failed to load User'+useremail));
    
    console.log('=======START==========');
    var thisuser = user[0];
    console.log(thisuser);
    // console.log(thisuser.getmood);
    console.log(useremail);
    console.log(time);
    // console.log(thisuser.mood);
    thisuser.mood.push({
      'time': time, 
      'score': mood
    });
    thisuser.markModified('mood');

    // WE CAN USE IN >3.2.0: 
    // thissz = thisuser.mood.length;
    // console.log(thissz);
    // thisuser.mood.set(thissz, );
    thisuser.save();
    // console.log(user.mood);
    // TODO
    // if (user.length) {
    //   res.json({ exist: true });
    //   // console.log('true');
    // } else {
    //   res.json({ exist: false });
    //   // console.log('false');
    // }
  });

  // console.log(usermood);
};



/**
* Check if user exists
*/
exports.getMoods = function(req, res, next) {
  var useremail = String(req.body.email);
  var time = String(req.body.time);
  var mood = String(req.body.mood);

  // TODO Create usermood for new users!
  UserMood.find({email: useremail}, function (err, usermood) {
    if (err) return next(new Error('Failed to load User'+useremail));
    console.log(usermood);
    console.log(time);
    console.log(mood);
  });
};
