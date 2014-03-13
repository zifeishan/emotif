/*
* Front end logic for video page.
*/
'use strict';

var isLiked = false;

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  initializePage();
})

function initializePage() {
  var recommend_type = $('#contentType').val();
  // console.log(recommend_type);
  getNewVideo(recommend_type);

  var alter_recommend ='/content';

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
      // ga("send", "event", "like", "click");
      isLiked = true;
     }
  });

  $('#content-better-button').click(function(e) {
    ga("send", "event", "better", "click");
    window.location.href = '/trend';

  });
}

function getNewVideo(keyword) {

  // Funny videos
  var videoStrategy = [
    'database',
    'popular',
    'funny'
  ];
  // search for sports
  if (keyword == 'sports') {
    videoStrategy = [
      // 'outdoor sports',
      'jogging scenery',
      'cycling trailer',
      'MLB top plays',
      'football top plays',
      'NBA top plays'
    ];
  }
  // meditation
  if (keyword == 'meditation') {
    videoStrategy = [
      'best meditation music'
    ];
  }

  var videoId = '';
  var videoTitle = '';

  var strategySize = videoStrategy.length;
  var selectedStrategyIndex = Math.floor(Math.random() * strategySize);
  var selectedStrategy = videoStrategy[selectedStrategyIndex];

  console.log(selectedStrategy);

  switch (selectedStrategy)
  {
    case 'database':
      renderVideoWithDatabase();
      break;
    case 'popular':
      renderVideoWithPopular();
      break;
    default:
      renderVideoWithKeyword(selectedStrategy);
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

  function renderVideoWithKeyword(keyword) {
    $.post('/api/video/keyword', {keyword: keyword}, function(json) {
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