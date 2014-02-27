var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'emotif'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/emotif-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'emotif'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/emotif-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'emotif'
    },
    port: process.env.PORT || 3000,
    db:  process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         'mongodb://localhost/emotif-production'
  }
};

module.exports = config[env];
