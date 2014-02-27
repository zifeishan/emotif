/*
* Front end logic for main page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  

  //add clickListeners for buttons
  $('#content-refresh-button').click(function(e) {
    // getNewVideo();

    // TODO Switch to photo
    window.location.href = '/recommend/video';
  });

  $('#content-like-button').click(function(e) {
    var likes = parseInt($('#like-number').text());
    likes++;
    $('label#like-number').text(likes);
  });

  $('#content-better-button').click(function(e) {
    window.location.href = '/trend';
  });
  $('#content-back-button').click(function(e) {
    window.location.href = '/select';
  });


  FBCheckLogin(function(data){
    console.log('FB status:'+data.status);
    if (data.status == 'connected') {

    // console.log(arr_imgs);

      FB.api(
          "/me/feed",
          {
              "with": "message"
          },
          function (response) {
            if (response && !response.error) {
              console.log(response);
              var posts = response.data;
              for (var i = 0; i < posts.length; i++)
              {
                console.log(posts[i].message);
                console.log(posts[i].created_time);
                
                // console.log(posts[i].likes);

              }
            }
          }
        );

      // FB.api('/me/feed?fields=message,created_time,likes', function(fbdata){
        
        // // var fbid = data.id;
        // if (data == undefined) {
        //   window.alert('Error when getting user info from facebook. Use manual login.');
        //   window.location.href = '/';
        // }
        // console.log(data);
        // window.localStorage.setItem('email', data.username);
        // window.location.href = '/select';

      // });

    }
  });
})
