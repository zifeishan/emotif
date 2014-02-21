/*
* Front end logic for signup page.
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
  $('#signup-back-button').click(function(e) {
    window.location.href = '/';
  });

  $('#signup-signup-button').click(function(e) {
    var email = $('#email').val();
    var password = $('#password').val();
    console.log(email);
    console.log(password);

    //Here add some validation logic
    
    //Here I will call passport to authenticate user
    $.post('/create', {email: email, password: password}, afterCreate);

    function afterCreate(result) {
      if(result.success) {
        window.location.href = '/select';
      } else {
        //Need better alert
        window.alert('Creating account failed! Please try again later.');
      }
    }

  });

}