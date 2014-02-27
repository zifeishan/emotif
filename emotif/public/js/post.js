/*
* Front end logic for main page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  
  var alter_recommend = '/recommend/video';

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

  function RandomPost(allposts) {
    allposts = shuffle(allposts);
    console.log('Total posts:'+allposts.length);
    for(var i = 0; i < allposts.length; i++){
      // var totalNumber = allposts.length;
      // var index = Math.floor(totalNumber * Math.random());
      var index = i;
      // console.log('Pick one:');
      // console.log(allposts[index]);
      var post = allposts[index];
      if (
        post.status_type == 'approved_friend'
        // || post.status_type == undefined
        // || post.status_type == 'app_created_story'
        )
        continue;
      else
        return post;
    }
    return post;

  }

  FBCheckLogin(function(data){
    console.log('FB status:'+data.status);
    if (data.status == 'connected') {

      FBGetPosts(function(res){
        console.log(res);
        if(res.data != null && res.data.length > 0){
          var post = RandomPost(res.data);
          console.log(post);
          if (post == null) {
            window.location.href = alter_recommend;
          }
          
          // API: '/me/posts?fields=picture,likes,created_time,description,story,story_tags,type,status_type&limit=100'
          // Object {picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash1/t5/373523_6278093869_764126549_q.jpg", created_time: "2013-11-30T20:49:35+0000", story: "Zifei Shan likes Dr Pepper.", story_tags: Object, type: "link"…}
          //   created_time: "2013-11-30T20:49:35+0000"
          //   id: "100004349652754_246716888816631"
          //   picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash1/t5/373523_6278093869_764126549_q.jpg"
          //   story: "Zifei Shan likes Dr Pepper."
          //   story_tags: Object
          //   type: "link"
          //   __proto__: Object

          $('#post-title').text(post.story);
          $('#post-photo').attr('src', post.picture);
          $('#post-content').text(post.description);
          $('#post-date').text(post.created_time);

        }
      })

    } else {
      // TODO switch to another type
      window.location.href = alter_recommend;
    }
  });
})
