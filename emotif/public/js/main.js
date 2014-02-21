/*
* Front end logic for main page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  FBCheckLogin(function(data){
    console.log('FB status:'+data.status);
    if (data.status == 'connected') {

      FB.api('/me', function(data){
        // var fbid = data.id;
        if (data == undefined) {
          window.alert('Error when getting user info from facebook. Use manual login.');
          window.location.href = '/';
        }
        console.log(data);
        window.localStorage.setItem('email', data.username);
        window.location.href = '/select';

      });

    }
  });
  initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  $('#main-facebook-button').click(function(e) {
    
    console.log('FB button clicked!');

    FBLogin(function(data){
      console.log(data.status);
        if (data.status == 'connected') {

          FB.api('/me', function(data){
            // var fbid = data.id;
            if (data == undefined) {
              window.alert('Error when getting user info from facebook. Use manual login.');
              window.location.href = '/';
            }

            // // Create user
            // $.post('/api/users/createfb', {email: data.username, name: data.name, password: data.id}, AfterCreate);

            // function afterCreate(result) {
            //   if(result.success) {
            //     window.location.href = '/select';
            //   } else {
            //     //Need better alert
            //     window.alert('Creating Facebook account failed! Please try again later.');
            //   }
            // }


              var email = data.username;
              var password = data.id;
              //Here I will call passport to authenticate user
              $.post('/api/users/auth', {email: email, password: password}, function afterAuth(result) {
                  if(result.auth) {
                    window.location.href = '/select';
                  } else {
                    //Here I will call passport to authenticate user
                    $.post('/api/users/create', {email: email, password: password}, function afterCreate(result) {
                      if(result.success) {
                        window.location.href = '/select';
                      } else {
                        //Need better alert
                        window.alert('Creating account failed! Please try again later.');
                      }
                    });

                  }
                });
              

          });
          
        }
        else {
          window.alert('Fail to login to facebook.');
          window.location.href = '/';
        }
    });

  });


  $('#main-next-button').click(function(e) {
    console.log('Next button clicked!');
    var email = $('#main-email-input').val();
    
    //Here add some form validation
    
    var url_call = '/api/gatekeeper';
    var post_body = {
      'email': email
    };
    console.log(post_body);

    $.post(url_call, post_body, function(result) {
      window.localStorage.setItem('email', email);
      if(result.exist) {
        window.location.href = '/login/' + email;
      } else {
        window.location.href = '/signup/' + email;
      }
    });
  });
}
