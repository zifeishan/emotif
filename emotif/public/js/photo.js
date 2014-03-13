/*
* Front end logic for main page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  
  // var alter_recommend = '/recommend/fbphoto';
  var alter_recommend = '/content';

  //add clickListeners for buttons
  $('#content-refresh-button').click(function(e) {
    // getNewVideo();

    // TODO Switch to photo
    // window.location.href = '/recommend/video';
    ga("send", "event", "refresh", "click");
    window.location.href = alter_recommend;
  });

  $('#content-like-button').click(function(e) {
    var likes = parseInt($('#like-number').text());
    likes++;
    $('label#like-number').text(likes);
    ga("send", "event", "like", "click");
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
