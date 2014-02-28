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

  User.find({email: email}, function (err, user) {
    if (err) {
      res.send({success: false, info: 'unknown'});
    }
    if (user.length) {
      //User exists, cannot create
      res.send({success: false, info: 'exist'});
    } else {
      //User does not exist, able to create
      User.create( newuser, function(err, user) {
        if(err) {
          res.send({success: false, info: 'unknown'});
        }
        req.login(user, function(err) {
            if (err) {
                res.send({success: false, info: 'unknown'});
            }
            res.send({success: true});
        });
      });
    }
  });
};

exports.createFBUser = function (req, res, next) {
  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;
  var newuser = {
      email: email,
      name: name,
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

    // if facebook logged in, do not worry (need change)
    // FBCheckLogin(function(data){
    //   console.log('FB status:'+data.status);
    //   if (data.status == 'connected') {

    //     FB.api('/me', function(data){
    //       // var fbid = data.id;
    //       if (data == undefined) {
    //         window.alert('Error when getting user info from facebook. Use manual login.');
    //         window.location.href = '/';
    //       }
    //       window.localStorage.setItem('email', data.username);
    //       res.json({ loggedin: true, id: data.username });

    //     });

    //   }
    // });

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
* Add user mood
*/
exports.addMood = function(req, res, next) {
  var userId = String(req.body.id);
  var date = String(req.body.date);
  var score = String(req.body.score);

  
  UserMood.findOne({user: userId}, function (err, usermood) {
    if (err) return next(new Error('Failed to load User'+userId));
    
    // console.log('=======START==========');
    // var thisuser = user[0];
    // console.log(thisuser);
    // console.log(userId);
    // console.log(time);
    if(usermood == null) {
      console.log('start creating mood document');
      var data = {
        user: userId,
        mood: [{date:date, score:[score]}]
      };
      UserMood.create(data, function(err) {
        if(err) console.log(err);
        else console.log('succeed!');
      });
      console.log(data);
      // console.log('creating succeed!');
    } else {
      console.log('start inserting into mood document');
      usermood.addMood(date, score);
    }
    // thisuser.mood.push({
    //   'time': time, 
    //   'score': mood
    // });
    //// WE CAN USE IN Mongo > 3.2.0: 
    // thissz = thisuser.mood.length;
    // console.log(thissz);
    // thisuser.mood.set(thissz, );
    //// Otherwise:
    // thisuser.markModified('mood');
    // thisuser.save();
    // UserMood.save();
    res.send();
  });

  // console.log(usermood);
};



/**
* Get user mood
*/
exports.getMood = function(req, res, next) {
  
  console.log(req.body.id);
  var userId = String(req.body.id);
  console.log('User ID: ' + userId);

  UserMood.findOne({user: userId}, function (err, usermood) {
    if (err) return next(new Error('Failed to load User'+useremail));
    if(usermood != null) {
      //Record found
      res.send(usermood.mood);
    } else {
      //No record found
      res.send(null);
    }
  });
};


// require("./util/jquery.js");

// function FBCheckLogin(callback)
// {
//   $.ajaxSetup({ cache: true });
//   $.getScript('//connect.facebook.net/en_UK/all.js', function(){
//     FB.init({
//       appId: '1481091805451645',
//     });     
//     $('#loginbutton,#feedbutton').removeAttr('disabled');
//     FB.getLoginStatus(callback);
//   });
// }