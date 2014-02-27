/*
* Front end logic for video page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  initializePage();
  $('#changeName').click(function(e){
    window.alert('Life is good, why change name?');
  });
  $('#changePassword').click(function(e){
    window.alert('Don\'t worry about your password, we do not save your password explicitly!');
  });
})

function initializePage() {
  $('#settings-logout-button').click(function(e) {
    console.log('logout');
    $.get('/api/session/logout', function() {
      window.location.href = '/';
    });
  });

  $('#settings-back-button').click(function(e) {
    window.location.href = '/select';
  });
}
