/*
* Front end logic for login page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  // RegisterNavListener();
  initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  // $('input').keypress(function (e) {
  //   if (e.which == 13) {  // Enter key pressed
  //     e.preventDefault();
  //     SubmitLoginForm();
  //   }
  // });
  $('.button-login').click(SubmitLoginForm);

  $('.main-footer').click(function() {
    window.location.href = '/signup';
  });

}

function SubmitLoginForm() {
  var email = $('#main-email-input').val();
  var password = $('#main-password-input').val();
  console.log(email);
  console.log(password);

  if(validateEmail(email) == false) {
    triggerInvalidEmailAlert();
    return;
  }

  //Here add some validation logic
  if(validatePassword(password) == false) {
    triggerInvalidPasswordAlert();
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
      triggerFailToLogInAlert();
    }
  }
}