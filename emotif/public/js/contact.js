/*
* Front end logic for main page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {

  RegisterNavListener();
  
  // var alter_recommend = '/recommend/video';
  var alter_recommend = '/content';

  var friendlist = [];

  //add clickListeners for buttons
  $('#content-refresh-button').click(function(e) {
    // getNewVideo();

    // TODO Switch to photo
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

  var topics = [
    'A sports game you recently watched',
    'Your feelings',
    'Your recent life',
    'A TV show you recently watched',
    'Your burdan',
    'One of your secrets',
    'One event you have been expected'
  ];

  var topicSize = topics.length;
  var selectedTopicIndex = Math.floor(Math.random() * topicSize);
  var selectedTopic = topics[selectedTopicIndex];

  $('#topic').text(selectedTopic);

  $('#contact-refresh-button').click(function(e) {
    if (friendlist == null || friendlist.length == 0) {
        // do nothing
    } else {
      var fbfriend = RandomFriend(friendlist);
      console.log(fbfriend);
      if (fbfriend == null) {
        // window.location.href = alter_recommend;
        $('#friendname').text('Your best friends');
      }
      else {
        $('#friendname').text(fbfriend.name);
      }
    }
    selectedTopicIndex = Math.floor(Math.random() * topicSize);
    selectedTopic = topics[selectedTopicIndex];

    $('#topic').text(selectedTopic);


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

  function RandomFriend(allposts) {
    allposts = shuffle(allposts);
    console.log('Total posts:'+allposts.length);
    for(var i = 0; i < allposts.length; i++){
      // var totalNumber = allposts.length;
      // var index = Math.floor(totalNumber * Math.random());
      var index = i;
      // console.log('Pick one:');
      // console.log(allposts[index]);
      var post = allposts[index];
      if (post.name == null
        
        )
        continue;
      else
        return post;
    }
    return null;

  }

  //Check login with FB. 
  FBCheckLogin(function(data){
    console.log('FB status:'+data.status);
    if (data.status == 'connected') {

      FBGetFriends(function(res){
        console.log(res);
        if(res.data != null && res.data.length > 0){
          
          friendlist = res.data;
          var fbfriend = RandomFriend(friendlist);
          console.log(fbfriend);
          if (fbfriend == null) {
            // window.location.href = alter_recommend;
            $('#friendname').text('Your best friends');
          }
          else {
            $('#friendname').text(fbfriend.name);
            $('#dial-button').attr('href', 'tel:'+fbfriend.name);
          }
            
        }
      });

    } else {
      // TODO switch to another type
      $('#friendname').text('Your best friends');
    }
  });
})
