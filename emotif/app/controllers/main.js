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
  var email = req.params.email;
  res.render('../views/partials/login', {email:email});
};
exports.signup = function(req, res){
  var email = req.params.email;
  console.log(email);
  res.render('../views/partials/signup', {email:email});
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

exports.contentType = function(req, res){
  var rectype = req.params.rectype;
  console.log(rectype);
  if(rectype == 'video') {
    res.render('../views/partials/video');
  }
  else if(rectype == 'photo') {
    res.render('../views/partials/photo', {
      source:'https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-frc1/t1/s720x720/1779090_269572853197701_347952807_n.jpg',
      name: 'Me at Gates building, Stanford. Thanks Hector for the photo!',
      date: '2014-02-05T20:29:10+0000',
      like: 20
    });
  }
};

