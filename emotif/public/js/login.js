/*
* Front end logic for login page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  $('#login-back-button').click(function(e) {
    window.location.href = '/';
  });

  $('#login-signin-button').click(function(e) {
    var email = $('#email').val();
    var password = $('#password').val();
    console.log(email);
    console.log(password);

    //Here add some validation logic

    //Here I will call passport to authenticate user
    $.post('/api/users/auth', {email: email, password: password}, afterAuth);

    function afterAuth(result) {
      if(result.auth) {
        window.location.href = '/select';
      } else {
        //Need better alert
        window.alert('Email or username wrong!');
      }
    }
  });

}