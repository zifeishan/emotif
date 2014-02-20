'use strict';

exports.index = function(req, res){
  res.render('../views/partials/main');
  // Article.find(function(err, articles){
  //   if(err) throw new Error(err);
  //   res.render('index', {
  //     title: 'Generator-Express MVC',
  //     articles: articles
  //   });
  // });
};

exports.select = function(req, res){
  res.render('../views/partials/select');
};
exports.trend = function(req, res){
  res.render('../views/partials/trend');
};
exports.login = function(req, res){
  res.render('../views/partials/login');
};
exports.signup = function(req, res){
  res.render('../views/partials/signup');
};
exports.settings = function(req, res){
  res.render('../views/partials/settings');
};
exports.content = function(req, res){
  res.render('../views/partials/content');
};
exports.share = function(req, res){
  res.render('../views/partials/share');
};