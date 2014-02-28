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

var video = require('../app/controllers/video'),
    users = require('../app/controllers/users'),
    session = require('../app/controllers/session'),
    gatekeeper = require('../app/controllers/gatekeeper');

module.exports = function(app){

  //main page route
  var main = require('../app/controllers/main');
  app.get('/', main.index);
  app.get('/login2', main.login2);
  app.get('/select', main.select);
  app.get('/trend', main.trend);
  app.get('/login/:email', main.login);
  app.get('/signup/:email', main.signup);
  app.get('/settings', main.settings);
  app.get('/content', main.content);
  app.get('/recommend/:rectype', main.contentType);
  app.get('/share', main.share);
  app.get('/fblogin', main.fblogin);

  // Server API Routes
  // All the front-back communication routes should be written here
  app.post('/api/gatekeeper', gatekeeper.direct);

  app.post('/api/video/keyword', video.getVideoByKeyword);
  app.get('/api/video/database', video.getVideoFromDatabase);
  
  app.post('/api/users', users.create);
  app.post('/api/users/exist', users.userExist);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.put('/api/users/addmood', users.addMood);
  app.post('/api/users/getmood', users.getMood);

  app.post('/api/users/auth', users.authenticate);
  app.post('/api/users/create', users.create);
  app.post('/api/users/createfb', users.createFBUser);
  app.post('/api/users/checkLogin', users.isUserLoggedIn);

  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.get('/api/session/logout', session.logout);
};

