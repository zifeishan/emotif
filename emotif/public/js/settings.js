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
  $('#aboutme').click(function(e){
    window.location.href = '/profile-aboutme';
  });
  $('#description').click(function(e){
    window.location.href = '/profile-description';
  });
  $('#interests').click(function(e){
    window.location.href = '/profile-interests';
  });
  $('#travels').click(function(e){
    window.location.href = '/profile-travels';
  });
  $('#settings-skipAboutme-button').click(function(e) {
      window.location.href = '/profile-description';
    });
  $('#settings-skipDescription-button').click(function(e) {
      window.location.href = '/profile-interests';
    });
  $('#settings-skipInterests-button').click(function(e) {
      window.location.href = '/profile-travels';
    });
  $('#settings-skipTravel-button').click(function(e) {
      window.location.href = '/select';
    });
  $('#settings-save-button').click(function(e) {
      console.log('save');
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
