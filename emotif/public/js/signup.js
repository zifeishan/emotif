/*
* Front end logic for main page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  // initializePage();
  initializeFB();
})



function AfterFBLogin(response) {
  if (response.authResponse) {
      console.log('Congrats!');
      // The person logged into your app
      FB.api('me?fields=id,name,posts.limit(10)', function(res) {console.log(res.posts);});

  } else {
      // The person cancelled the login dialog

  }
}