/*
* This is a backend service which helps to direct the routing
* from the main page (to login or to signup).
*/

'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.direct = function(req, res) {
  console.log('gatekeeper takes over');

  var email = req.body.email;
  console.log(email.length);

  if(email.length == 0) {
    res.location('/');
  } else {
    console.log('enter direct part');
    User.find({'email': email}, function(err, users) {
      console.log('enter cb part');
      if(err) console.log(err);
      if(users.length != 0) {
        console.log('enter login part');
        var json = { 'exist': true };
      } else {
        console.log('enter signup part');
        var json = { 'exist': false };
      }
      res.json(json);
    });
  }
}