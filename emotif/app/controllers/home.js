var mongoose = require('mongoose');
var Article = mongoose.model('Article');

exports.index = function(req, res){
  Article.find(function(err, articles){
    if(err) throw new Error(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
};