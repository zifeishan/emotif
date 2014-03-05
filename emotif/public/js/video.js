/*
* Front end logic for video page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  initializePage();


})

function initializePage() {
  //generate random video from database
  getNewVideo();

  //add clickListeners for buttons
  $('#content-refresh-button').click(function(e) {
    // getNewVideo();

    // TODO Switch to photo
    ga("send", "event", "refresh", "click")
    window.location.href = '/recommend/fbphoto';
  });

  $('#content-back-button').click(function(e) {
    window.location.href = '/select';
  });

  $('#content-like-button').click(function(e) {
    var likes = parseInt($('#like-number').text());
    likes++;
    $('label#like-number').text(likes);
     ga("send", "event", "like", "click")
  });

  $('#content-better-button').click(function(e) {
    ga("send", "event", "better", "click")
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
    });
  }

  function renderVideoWithKeyword() {
    $.post('/api/video/keyword', {keyword: 'funny'}, function(json) {
      var video = json;
      videoId = video.id;
      videoTitle = video.title;
      renderVideo();
    });
  }

  function renderVideoWithPopular() {
    console.log('popular');
    $.get('/api/video/popular', function(json) {
      var video = json;
      videoId = video.id;
      videoTitle = video.title;
      renderVideo();
    })
  }

  function renderVideo() {
    var finalUrl = 'http://www.youtube.com/embed/' + videoId;
    var likes = Math.floor(100* Math.random());
    $('iframe').attr('src', finalUrl);
    $('label#like-number').text(likes);
    $('b#video-title').text(videoTitle);
  }
}