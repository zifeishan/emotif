/*
* Front end logic for video page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  //-RegisterNavListener();
  initializePage();
  $('#changeName').click(function(e){
    window.alert('Life is good, why change name?');
  });
  $('#changePassword').click(function(e){
    window.alert('Don\'t worry about your password, we do not save your password explicitly!');
  });
  $('#connectFacebook').click(function(e){
    FBCheckLogin(function(data){
      console.log('FB status:'+data.status);
      if (data.status == 'connected') {
        window.alert('Already connected to Facebook!');
      } else {
        FBLogin(function(data){
          console.log(data.status);
        }); 
      }
    });
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
  // Redirect skip buttons
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
  // Redirect back buttons
  $('#settings-backAboutme-button').click(function(e) {
      window.location.href = '/select';
    });
  $('#settings-backDescription-button').click(function(e) {
      window.location.href = '/profile-aboutme';
    });
  $('#settings-backInterests-button').click(function(e) {
      window.location.href = '/profile-description';
    });
  $('#settings-backTravel-button').click(function(e) {
      window.location.href = '/profile-interests';
    });

  String.prototype.endswith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };

  $('#settings-save-button').click(function(e) {
      // TODO Trigger a save call to database
      console.log('save');
      
      // Redirect based on current URL...

      var url = window.location.href;

      if (url.endswith('aboutme')) {
        window.location.href = '/profile-description';
      }
      else if (url.endswith('description')) {
        window.location.href = '/profile-interests';
      }
      else if (url.endswith('interests')) {
        window.location.href = '/profile-travels';
      }
      else if (url.endswith('travel')) { 
        // TODO how to know "select" or "settings"??
        window.location.href = '/select';
      }

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
