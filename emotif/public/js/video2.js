/*
* This js is purely for GA experiment.
* Front end logic for video2 page.
*/
'use strict';

var isLiked = false;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  initializePage();
})

function initializePage() {
  //generate random video from database
  getNewVideo();

  var alter_recommend ='/recommend/post';
  // var alter_recommend = '/content';

  //add clickListeners for buttons
  $('#content-refresh-button').click(function(e) {
    // getNewVideo();

    // TODO Switch to photo
    ga("send", "event", "refresh", "click");
    window.location.href = alter_recommend;
    // window.location.reload();
    
  });

  $('#content-back-button').click(function(e) {
    window.location.href = '/select';
  });

  $('#content-like-button').click(function(e) {
    if(!isLiked) {
      var likes = parseInt($('#like-number').text());
      likes++;
      $('label#like-number').text(likes);
      ga("send", "event", "like", "click");
      isLiked = true;
     }
  });

  $('#content-better-button').click(function(e) {
    ga("send", "event", "better", "click");
    window.location.href = '/trend';

  });
}

function getNewVideo() {

  var videoStrategy = [
    'database',
    'keyword',
    'popular'
  ];

  var videoId = '';
  var videoTitle = '';

  var strategySize = videoStrategy.length;
  var selectedStrategyIndex = Math.floor(Math.random() * strategySize);
  var selectedStrategy = videoStrategy[selectedStrategyIndex];

  switch (selectedStrategy)
  {
    case 'database':
      renderVideoWithDatabase();
      break;
    case 'keyword':
      renderVideoWithKeyword();
      break;
    case 'popular':
      renderVideoWithPopular();
      break;
  }

  function renderVideoWithDatabase() {
    $.get('/api/video/database', function(json) {
      var video = json;
      videoId = video.video_id;
      videoTitle = video.caption;
      renderVideo();
      renderVideoComment(videoId);
    });
  }

  function renderVideoWithKeyword() {
    $.post('/api/video/keyword', {keyword: 'funny'}, function(json) {
      var video = json;
      videoId = video.id;
      videoTitle = video.title;
      renderVideo();
      renderVideoComment(videoId);
    });
  }

  function renderVideoWithPopular() {
    console.log('popular');
    $.get('/api/video/popular', function(json) {
      var video = json;
      videoId = video.id;
      videoTitle = video.title;
      renderVideo();
      renderVideoComment(videoId);
    });
  }

  function renderVideoComment(videoId) {
    console.log('Render comments!');
    $.get('/api/video/comment/' + videoId, function(json) {
      var comment = json.comment;
      $('div#video-comment').text(comment['$t']);
    });
  }

  function renderVideo() {
    var finalUrl = 'http://www.youtube.com/embed/' + videoId;
    var likes = Math.floor(100* Math.random());
    $('iframe').attr('src', finalUrl);
    $('label#like-number').text(likes);
    $('b#video-title').text(videoTitle);
  }
}