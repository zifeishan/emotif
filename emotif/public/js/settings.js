/*
* Front end logic for video page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initializePage();
})

function initializePage() {
  $('#settings-logout-button').click(function(e) {
    console.log('logout');
    $.get('/api/session/logout', function() {
      window.location.href = '/';
    });
  })
}