/*
* Front end logic for signup page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  initializePage();
  // initializeFB();
})


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  $('#signup-back-button').click(function(e) {
    window.location.href = '/main2';
  });

  $('input').keypress(function (e) {
    if (e.which == 13) {  // Enter key pressed
      e.preventDefault();
      SubmitSignupForm();
    }
  });
  
  $('#signup-signup-button').click(SubmitSignupForm);

}

function SubmitSignupForm(e) {
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
    $.post('/api/users/create', {email: email, password: password}, afterCreate);

    function afterCreate(result) {
      if(result.success) {
        // window.location.href = '/select';
        window.location.href = '/fblogin';
      } else {
        //Need better alert
        triggerAlert();
      }
    }

}