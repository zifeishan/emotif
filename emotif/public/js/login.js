/*
* Front end logic for login page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  initializePage();
});

function SubmitLoginForm(e) {
  var email = $('#email').val();
  var password = $('#password').val();
  console.log(email);
  console.log(password);

  //Here add some validation logic
  if(validatePassword(password) == false) {
    triggerAlert();
    return;
  }

  //Here I will call passport to authenticate user
  $.post('/api/users/auth', {email: email, password: password}, afterAuth);

  function afterAuth(result) {
    if(result.auth) {
      window.location.href = '/select';
      // window.location.href = '/fblogin';
    } else {
      //Need better alert
      triggerAlert();
    }
  }
}


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  $('#login-back-button').click(function(e) {
    window.location.href = '/main2';
  });

  $('input').keypress(function (e) {
    if (e.which == 13) {  // Enter key pressed
      e.preventDefault();
      SubmitLoginForm();
    }
  });

  $('#login-signin-button').click(SubmitLoginForm);

}
