'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    UserMood = mongoose.model('UserMood'),
    passport = require('passport');


exports.authenticate = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.json({auth: false});
        }

        req.login(user, function(err) {
            if (err) {
                return next(err);
            }

            res.json({auth: true});
        });
    })(req, res, next);
}

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var email = req.body.email;
    var password = req.body.password;
    var newuser = {
        email: email,
        password: password
    };
    User.create( newuser, function(err, user) {
        if(err) console.log(err);
        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            res.send({success: true});
        });
    });
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

exports.isUserLoggedIn = function(req, res, next) {
    var userId = req.session.passport.user;
    if(userId) {
        console.log('user has id: ' + userId);
        res.json({ loggedin: true, id: userId });
    } else {
        console.log('user has not logged in');
        res.json({ loggedin:false, id: 'undefined' });
    }
}

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
  var userId = String(req.body.id);
  var time = String(req.body.time);
  var mood = String(req.body.mood);

  
  User.find({_id: userId}, function (err, user) {
    if (err) return next(new Error('Failed to load User'+userId));
    
    console.log('=======START==========');
    var thisuser = user[0];
    console.log(thisuser);
    console.log(userId);
    console.log(time);
    thisuser.mood.push({
      'time': time, 
      'score': mood
    });
    //// WE CAN USE IN Mongo > 3.2.0: 
    // thissz = thisuser.mood.length;
    // console.log(thissz);
    // thisuser.mood.set(thissz, );
    //// Otherwise:
    thisuser.markModified('mood');
    thisuser.save();
    res.send();
  });

  // console.log(usermood);
};



/**
* Check if user exists
*/
exports.getMoods = function(req, res, next) {
  
  console.log(req.user);
  var useremail = String(req.user.email);
  // var time = String(req.body.time);
  // var mood = String(req.body.mood);
  // console.log('User Mail: '+useremail);
  User.find({email: useremail}, function (err, user) {
    if (err) return next(new Error('Failed to load User'+useremail));
    // console.log('what???');
    // console.log(user);
    var thisuser = user[0];
    // console.log(thisuser.mood);
    // return thisuser.mood;
    res.json({
      "key":"Mood",
      "values": thisuser.mood});
  });
};
