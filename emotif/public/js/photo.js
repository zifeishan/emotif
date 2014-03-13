/*
* Front end logic for main page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  
  // var alter_recommend = '/recommend/fbphoto';
  var alter_recommend = '/content';

  renderPageContent();

  //add clickListeners for buttons
  $('#content-refresh-button').click(function(e) {
    // getNewVideo();

    // TODO Switch to photo
    // window.location.href = '/recommend/video';
    ga("send", "event", "refresh", "click");
    window.location.href = alter_recommend;
  });

$('#content-like-button').click(function(e) {
    if(!isLiked) {
      var likes = parseInt($('#like-number').text());
      likes++;
      $('label#like-number').text(likes);
      isLiked = true;
     }
  });

  $('#content-better-button').click(function(e) {
    ga("send", "event", "better", "click");
    window.location.href = '/trend';
  });
  $('#content-back-button').click(function(e) {
    window.location.href = '/select';
  });


  // FBCheckLogin(function(data){
  //   console.log('FB status:'+data.status);
  //   if (data.status == 'connected') {



  //   // console.log(arr_imgs);

  //     FB.api('/me/photos?fields=name,source,likes,created_time', function(data){
  //       console.log(data);
  //       // // var fbid = data.id;
  //       // if (data == undefined) {
  //       //   window.alert('Error when getting user info from facebook. Use manual login.');
  //       //   window.location.href = '/';
  //       // }
  //       // console.log(data);
  //       // window.localStorage.setItem('email', data.username);
  //       // window.location.href = '/select';

  //     });

  //   }
  // });
})

function renderPageContent() {
  var likes = Math.floor(100* Math.random());
  $('label#like-number').text(likes);
  $('img.recphoto').attr('src', getRandomPhotoURL());
}

function getRandomPhotoURL() {
  var arr_imgs = [
    'http://ppcdn.500px.org/61695383/355ba6a8e3f86d4860e72b57bae999d1ceafff6b/3.jpg',
    'http://ppcdn.500px.org/61677339/38e6731b1e576d63079eeeffde146bf78a2061b7/3.jpg',
    'http://ppcdn.500px.org/61680405/3d62c15c9faade5d7f2144ddeda87b9202ddb8f1/3.jpg',
    'http://ppcdn.500px.org/61699137/0b64df1526f8c1171ffeb7f23c64012f6e5dad7d/3.jpg',
    'http://ppcdn.500px.org/61662809/beb38b906e84e52357ff73e30b3aefeaa751ca39/3.jpg',
    'http://ppcdn.500px.org/61668383/05c894a4d7d30811366990151f17f485d5a06912/3.jpg',
    'http://ppcdn.500px.org/61722835/827362a4da5948447914ad614764e2ec7c92f0cf/3.jpg',
    'http://ppcdn.500px.org/61710541/b4131a5a8169de7f9852fcd78868dcfa83b435da/3.jpg',
    'http://ppcdn.500px.org/62291711/0a7d280799100fba4106d6e1c8efe19269149190/3.jpg',
    'http://ppcdn.500px.org/62293399/48c5c4ff12b0897f01a5462fbd1e3c70456c2cab/3.jpg',
    'http://ppcdn.500px.org/62275585/dee17a843df5a311083e24ddaf6c001b5eeb12f1/3.jpg',
    'http://ppcdn.500px.org/62298081/8b16467ff0f286990c6d9d0457205cb236bc4227/3.jpg',
    'http://ppcdn.500px.org/62282519/113844ca192941d4d199891ff77cc448cd9fa710/3.jpg',
    'http://ppcdn.500px.org/62286129/08582cdbbeb429b2eb38a7647b39267ce592f895/3.jpg',
    'http://ppcdn.500px.org/62300637/67f9d56543d4252dd14a071ca8e7136ac4bea04e/3.jpg'
    ];
  var totalNumber = arr_imgs.length;
  var vid = Math.floor(totalNumber * Math.random());
  return arr_imgs[vid];
}
