/*
* Front end logic for video page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initializePage();
})

function initializePage() {
  //generate random video from database
  getNewVideo();

  //add clickListeners for buttons
  $('#content-refresh-button').click(function(e) {
    getNewVideo();
  });

  $('#content-like-button').click(function(e) {
    var likes = parseInt($('#like-number').text());
    likes++;
    $('label#like-number').text(likes);
  });

  $('#content-better-button').click(function(e) {
    window.location.href = '/trend';
  });
}

function getNewVideo() {
  $.get('/api/video/database', function(json) {
    console.log(json);
    var video = json;
    var final_url = 'http://www.youtube.com/embed/' + video.video_id;
    var likes = Math.floor(100* Math.random());
    $('iframe').attr('src', final_url);
    $('label#like-number').text(likes);
    $('b#video-title').text(video.caption);
  });
}