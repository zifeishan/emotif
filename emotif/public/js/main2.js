/*
* Front end logic for main page.
*/
'use strict';

// Listen for ALL links at the top level of the document. For
// testing purposes, we're not going to worry about LOCAL vs.
// EXTERNAL links - we'll just demonstrate the feature.

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  
  //login logic
  initializePage();
  RegisterNavListener();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

  $('input').keypress(function (e) {
    if (e.which == 13) {  // Enter key pressed
      e.preventDefault();
      SubmitForm();
    }
  });

  $('#main-next-button').click(SubmitForm);
}

function SubmitForm(e){
  var email = $('#main-email-input').val();
      
  //Form validation code
  if(validateEmail(email) == false) {
    triggerAlert();
    return;
  }

  var url_call = '/api/gatekeeper';
  var post_body = {
    'email': email
  };
  console.log(post_body);

  $.post(url_call, post_body, function(result) {

    // Temp: use for getting user emails, not good
    window.localStorage.setItem('email', email);
    if(result.exist) {
      window.location.href = '/login/' + email;
    } else {
      window.location.href = '/signup2/' + email;
    }
  });
}