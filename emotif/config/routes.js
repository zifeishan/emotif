// 'use strict';

// // var middleware = require('./middleware');

// /**
//  * Application routes
//  */
// module.exports = function(app) {

//   // Server API Routes
//   app.post('/api/users', users.create);
//   app.put('/api/users', users.changePassword);
//   app.get('/api/users/me', users.me);
//   app.get('/api/users/:id', users.show);

//   app.post('/api/session', session.login);
//   app.del('/api/session', session.logout);

//   // All other routes to use Angular routing in app/scripts/app.js
//   app.get('/partials/*', index.partials);
//   app.get('/*', middleware.setUserCookie, index.index);
// };


'use strict';

var main = require('../app/controllers/main'),
    video = require('../app/controllers/video'),
    users = require('../app/controllers/users'),
    gatekeeper = require('../app/controllers/gatekeeper');

module.exports = function(app){

  //main page route
  app.get('/', main.signup);
  app.get('/signin', main.index);
  app.get('/select', main.select);
  app.get('/trend', main.trend);
  app.get('/settings', main.settings);
  app.get('/content', main.content);
  app.get('/recommend/:rectype', main.contentType);
  app.get('/share', main.share);
  app.get('/fblogin', main.fblogin);
  app.get('/profile-aboutme', main.aboutme);
  app.get('/profile-description', main.description);
  app.get('/profile-interests', main.interests);
  app.get('/profile-travels', main.travels);
  app.get('/interest', main.addInterest);

  //For alternative design homwork use
  app.get('/main2', main.main2);
  app.get('/login/:email', main.login);
  app.get('/signup2/:email', main.signup2);

  // Server API Routes
  // All the front-back communication routes should be written here
  app.post('/api/gatekeeper', gatekeeper.direct);

  app.post('/api/video/keyword', video.getVideoByKeyword);
  app.get('/api/video/database', video.getVideoFromDatabase);
  app.get('/api/video/popular', video.getVideoByPopularity);
  app.get('/api/video/comment/:videoId', video.getVideoCommentById);
  
  app.post('/api/users', users.create);
  app.post('/api/users/exist', users.userExist);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.put('/api/users/addmood', users.addMood);
  app.post('/api/users/getmood', users.getMood);

  //login and logout for Local strategy
  app.post('/api/users/auth', users.authenticate);
  app.get('/api/users/local_logout', users.logout);
  //login and logout for Remember-me strategy
  app.post('/api/users/login', users.authenticateAndRemember);
  app.get('/api/users/logout', users.logoutAndForget);
  app.post('/api/users/create', users.create);
  app.post('/api/users/createfb', users.createFBUser);
  app.post('/api/users/checkLogin', users.isUserLoggedIn);

  app.get('/api/users/:id', users.show);

};

