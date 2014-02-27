'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Thing = mongoose.model('Thing'),
  Video = mongoose.model('Video'),
  UserMood = mongoose.model('UserMood');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Thing.find({}).remove(function() {
  Thing.create({
    name : 'HTML5 Boilerplate',
    info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
    awesomeness: 10
  }, {
    name : 'AngularJS',
    info : 'AngularJS is a toolset for building the framework most suited to your application development.',
    awesomeness: 10
  }, {
    name : 'Karma',
    info : 'Spectacular Test Runner for JavaScript.',
    awesomeness: 10
  }, {
    name : 'Express',
    info : 'Flexible and minimalist web application framework for node.js.',
    awesomeness: 10
  }, {
    name : 'MongoDB + Mongoose',
    info : 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
    awesomeness: 10
  }, function() {
      console.log('finished populating things');
    }
  );
});

// Clear old users, then add a default user
// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Test User',
//     email: 'test@test.com',
//     password: 'test'
//   }, function() {
//       console.log('finished populating users');
//     }
//   );
// });

// Clear old videos, then add new videos
Video.find({}).remove(function() {
  Video.create({
      vid : 1,
      video_id : 'Kdgt1ZHkvnM',
      caption : 'Epic Funny Cat Video'
    }, {
      vid : 2,
      video_id : 'nTasT5h0LEg',
      caption : 'Funny Cats'
    }, {
      vid : 3,
      video_id : 'KYWRsx6OUn8',
      caption : 'Funny Olympic Fails'
    }, {
      vid : 4,
      video_id : 'L8Zf0P0QtrM',
      caption : 'Funnest Jokes'
    }, {
      vid : 5,
      video_id : '86cMSsajPEU',
      caption : "Victoria's Secret Show"
    }, {
      vid : 6,
      video_id : 'NVIYL71ZtRo',
      caption : 'Ted Funniest Scenes'
    }, {
      vid : 7,
      video_id : 'KlyXNRrsk4A',
      caption : 'Katy Perry - Last Friday Night (T.G.I.F.)'
    }, {
      vid : 8,
      video_id : 'hy9wdmQZrSw',
      caption: 'Colbert Report'
    }, {
      vid : 9,
      video_id : 'cn-NsWRtaSY',
      caption : "America's got talent"
    }, {
      vid : 10,
      video_id : 'ZIn1FsQc0Uo',
      caption : "The Big Bang Theory Howard's song to Bernadette"
    }, function() {
      console.log('finished populating videos');
    }
  );
});

//Don't clear old ones:
User.create({
  provider: 'local',
  name: 'Test User',
  email: 'test@test.com',
  password: 'test'
}, function() {
    console.log('finished populating users');
    User.find({email: 'test@test.com'}, function(err, user) {
      if(err) console.log(err);
      // var testUserID = user._id;
      // console.log(testUserID);
      UserMood.create({
        user: user._id,
        mood: [
        {date:'20140310', score:['1','2','2','1']},
        {date:'20140309', score:['-1','-2','2','1']},
        {date:'20140308', score:['-1','-2','-2','0']},
        {date:'20140307', score:['-2','1','0','1']},
        {date:'20140306', score:['1','2','0','1']},
        {date:'20140305', score:['0','0','0','1']}
        ]
      }, function() {
        console.log('finished populating userMood');
      });
    });
  }
);

// //Clean user mood data
// UserMood.find()
//   .remove(function() {
//     console.log('UserMood cleaned!');
//   });


