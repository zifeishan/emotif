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
    gatekeeper = require('../app/controllers/gatekeeper'),
    auth = require('../app/controllers/auth');

module.exports = function(app){

  //main page route
  var main = require('../app/controllers/main');
  app.get('/', main.index);
  app.get('/select', main.select);
  app.get('/trend', main.trend);
  app.get('/login/:email', main.login);
  app.get('/signup/:email', main.signup);
  app.get('/settings', main.settings);
  app.get('/content', main.content);
  app.get('/recommend/:rectype', main.contentType);
  app.get('/share', main.share);

  // Server API Routes
  // All the front-back communication routes should be written here
  app.post('/gatekeeper', gatekeeper.direct);
  app.post('/auth', auth.authenticate);
  app.post('/create', auth.save);

  app.post('/api/video/keyword', video.getVideoByKeyword);
  app.post('/api/video/database', video.getVideoFromDatabase);
  
  app.post('/api/users', users.create);
  app.post('/api/users/exist', users.userExist);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.put('/api/users/addmood', users.addMood);
  app.get('/api/users/getmood', users.getMoods);

  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);
};

