/*
* This is a backend service which helps to direct the routing
* from the main page (to login or to signup).
*/

'use strict';

var passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

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

exports.save = function(req, res, next) {
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
}