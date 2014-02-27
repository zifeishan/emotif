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
exports.fblogin = function(req, res){
  res.render('../views/partials/fblogin');
};

exports.contentType = function(req, res){
  var rectype = req.params.rectype;
  console.log(rectype);
  if(rectype == 'video') {
    res.render('../views/partials/video');
  }
  else if(rectype == 'post') {
    res.render('../views/partials/post');
  } 
  else if(rectype == 'photo') {

    var arr_imgs = ['http://ppcdn.500px.org/61695383/355ba6a8e3f86d4860e72b57bae999d1ceafff6b/3.jpg',
    'http://ppcdn.500px.org/61677339/38e6731b1e576d63079eeeffde146bf78a2061b7/3.jpg',
    'http://ppcdn.500px.org/61680405/3d62c15c9faade5d7f2144ddeda87b9202ddb8f1/3.jpg',
    'http://ppcdn.500px.org/61699137/0b64df1526f8c1171ffeb7f23c64012f6e5dad7d/3.jpg',
    'http://ppcdn.500px.org/61662809/beb38b906e84e52357ff73e30b3aefeaa751ca39/3.jpg',
    'http://ppcdn.500px.org/61668383/05c894a4d7d30811366990151f17f485d5a06912/3.jpg',
    'http://ppcdn.500px.org/61722835/827362a4da5948447914ad614764e2ec7c92f0cf/3.jpg',
    'http://ppcdn.500px.org/61710541/b4131a5a8169de7f9852fcd78868dcfa83b435da/3.jpg'
    ];
    var totalNumber = arr_imgs.length;
    var vid = Math.floor(totalNumber * Math.random());
    res.render('../views/partials/photo', {
      source:arr_imgs[vid],
      //'https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-frc1/t1/s720x720/1779090_269572853197701_347952807_n.jpg'
      // name: 'Me at Gates building, Stanford. Thanks Hector for the photo!',
      // date: '2014-02-05T20:29:10+0000',
      like: 20
    });
  }
};

