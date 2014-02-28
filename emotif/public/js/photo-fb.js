/*
* Front end logic for main page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  
  var alter_recommend = '/recommend/post';

  //add clickListeners for buttons
  $('#content-refresh-button').click(function(e) {
    // getNewVideo();

    // TODO Switch to photo
    window.location.href = alter_recommend;
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

  function shuffle(array) {
    var currentIndex = array.length
      , temporaryValue
      , randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function RandomPhoto(allposts) {
    allposts = shuffle(allposts);
    console.log('Total posts:'+allposts.length);
    for(var i = 0; i < allposts.length; i++){
      // var totalNumber = allposts.length;
      // var index = Math.floor(totalNumber * Math.random());
      var index = i;
      // console.log('Pick one:');
      // console.log(allposts[index]);
      var post = allposts[index];
      if (post.source == null
        
        )
        continue;
      else
        return post;
    }
    return null;

  }

  FBCheckLogin(function(data){
    console.log('FB status:'+data.status);
    if (data.status == 'connected') {

      FBGetPhotos(function(res){
        console.log(res);
        if(res.data != null && res.data.length > 0){
          var fbphoto = RandomPhoto(res.data);
          console.log(fbphoto);
          if (fbphoto == null) {
            window.location.href = alter_recommend;
          }
          
          // FB.api('/me/photos?fields=name,source,likes,created_time&limit=100', callback);
          $('#fbphoto-photo').attr('src', fbphoto.source);
          //Cancel the loading message
          $('#fbphoto-content').text('');  
          $('#fbphoto-content').text(fbphoto.name);
          if(fbphoto.created_time != null)
            $('#fbphoto-date').text(new Date(fbphoto.created_time));
          
          if (fbphoto.likes != null) {
            window.testlikes = fbphoto.likes;
            $('label#like-number').text(fbphoto.likes.data.length);
          }
          else
            $('label#like-number').text('0');
            
        

        }
      })

    } else {
      // TODO switch to another type
      window.location.href = alter_recommend;
    }
  });
})
