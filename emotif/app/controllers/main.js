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