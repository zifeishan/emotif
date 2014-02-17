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
    session = require('../app/controllers/session');

module.exports = function(app){

  //main page route
  var main = require('../app/controllers/main');
  app.get('/', main.index);

  // Server API Routes
  // All the font-back communication routes should be written here
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

