/*
* Front end logic for main page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initializePage();
  // initializeFB();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  $('#main-next-button').click(function(e) {
    console.log('Next button clicked!');
    var email = $('#main-email-input').val();
    
    //Here add some form validation
    
    var url_call = '/gatekeeper';
    var post_body = {
      'email': email
    };
    console.log(post_body);

    $.post(url_call, post_body, function(result) {
      if(result.exist) {
        window.location.href = '/login/' + email;
      } else {
        window.location.href = '/signup/' + email;
      }
    });
  });
}
