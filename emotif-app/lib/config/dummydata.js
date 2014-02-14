'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Thing = mongoose.model('Thing'),
  Video = mongoose.model('Video');

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
      url : 'http://www.youtube.com/watch?v=Kdgt1ZHkvnM',
      caption : 'Epic Funny Cat Video'
    }, {
      vid : 2,
      url : 'http://www.dailymotion.com/video/xcoh89_positive-thinking-optimism-quotes-g_webcam',
      caption : 'Positive Thinking'
    }, {
      vid : 3,
      url : 'http://www.youtube.com/watch?v=KYWRsx6OUn8',
      caption : 'Funny Olympic Fails'
    }, {
      vid : 4,
      url : 'http://www.youtube.com/watch?v=L8Zf0P0QtrM',
      caption : 'Funnest Jokes'
    }, {
      vid : 5,
      url : 'http://www.youtube.com/watch?v=86cMSsajPEU',
      caption : "Victoria's Secret Show"
    }, {
      vid : 6,
      url : 'http://www.youtube.com/watch?v=NVIYL71ZtRo',
      caption : 'Ted Funniest Scenes'
    }, {
      vid : 7,
      url : 'http://www.youtube.com/watch?v=KlyXNRrsk4A',
      caption : 'Katy Perry - Last Friday Night (T.G.I.F.)'
    }, {
      vid : 8,
      url : 'http://www.youtube.com/watch?v=hy9wdmQZrSw',
      caption: 'Colbert Report'
    }, {
      vid : 9,
      url : 'http://www.youtube.com/watch?v=cn-NsWRtaSY',
      caption : "America's got talent"
    }, {
      vid : 10,
      url : 'http://www.youtube.com/watch?v=ZIn1FsQc0Uo',
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
  }
);
