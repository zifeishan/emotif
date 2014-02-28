// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  
  // // Facebook login code
  // FBCheckLogin(function(data){
  //   console.log('FB status:'+data.status);
  //   if (data.status == 'connected') {

  //     FB.api('/me', function(data){
  //       // var fbid = data.id;
  //       if (data == undefined) {
  //         window.alert('Error when getting user info from facebook. Use manual login.');
  //         FBLogout();
  //         window.location.href = '/fblogin';
  //       }
  //       console.log(data);
  //       // window.localStorage.setItem('email', data.username);
  //       window.location.href = '/select';

  //     });

  //   }
  // });


  $('#fblogin-yes-button').click(function(e) {

    FBLogin(function(data){
      console.log('FB button clicked!');
      console.log(data.status);
      if (data.status === 'connected') {

        FB.api('/me', function(data){
          console.log(data);
          // var fbid = data.id;
          if (data == undefined) {
            window.alert('Error when getting user info from facebook. Use manual login.');
            window.location.href = '/fblogin';
          }
          else {
            window.location.href = '/select';
          }
        });
      }
      else {
        window.alert('Fail to login to facebook.');
        window.location.href = '/fblogin';
      }
    });
  });

  $('#fblogin-no-button').click(function(e){
    window.location.href = '/profile-aboutme';
  });

});
