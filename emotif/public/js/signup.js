/*
* Front end logic for signup page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  $('input').keypress(function (e) {
    if (e.which == 13) {  // Enter key pressed
      e.preventDefault();
      SubmitLoginForm();
    }
  });

  $('.button-signup').click(SubmitSignupForm);

  $('.main-footer').click(function() {
    window.location.href = '/';
  });
}

function SubmitSignupForm() {
    var email = $('#signup-email-input').val();
    var password = $('#signup-password-input').val();
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
    $.post('/api/users/create', {email: email, password: password}, afterCreate);

    function afterCreate(result) {
      if(result.success) {
        window.location.href = '/select';
        // window.location.href = '/fblogin';
      } else {
        if(result.info == 'exist') {
          triggerUserExistAlert();
        } else {
          triggerFailToSignUpAlert();
        }
      }
    }

}