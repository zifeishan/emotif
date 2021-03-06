function FBLogout(callback)
{
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.init({
      appId      : '1481091805451645',
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    }); 
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    FB.getLoginStatus(function(res){
      console.log('Facebook module initiated!');
      console.log(res);
      if (res.status == "connected")
      {
        FB.logout(callback);
      }
      else {
        FB.getLoginStatus(callback);
      }
    });
  });
}

function FBCheckLogin(callback)
{
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.init({
        appId      : '1481091805451645',
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    }); 
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    FB.getLoginStatus(callback);
  });
}

function FBLogin(callback)
{

  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){

    // window.alert('Script get!!');
    FB.init({
        appId      : '1481091805451645',
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
      }); 
    // var permissions = 'basic_info,public_profile,user_friends,read_stream,user_events,friends_events,user_interests,user_likes,friends_likes,user_photos,friends_photos,user_status,user_videos';  
    var permissions = 'basic_info,public_profile,user_friends,user_likes,friends_likes,user_photos,friends_photos,user_status,user_interests';
    var permissionUrl = "https://m.facebook.com/dialog/oauth?client_id=" + '1481091805451645' //appId
    + "&response_type=code&redirect_uri=" 
    + window.location.origin + '/select'
    + "&scope=" + permissions
    ;
    // window.alert(permissionUrl);
    window.location = permissionUrl;
    return;
    
    // // $('#loginbutton,#feedbutton').removeAttr('disabled');
    // FB.getLoginStatus(function(res){
    //   console.log('Facebook module initiated!');
    //   console.log(res);

    //   if (res.status != "connected")
    //   {

    //     // Login has problems with mobile
    //     // FB.login(callback);
    //     var isMobile = false;
    //     try {
    //         isMobile = (window.location.href == top.location.href && window.location.href.indexOf("/mobile/") != -1);
    //     } catch (e) {}
    //     // if (!isMobile) {
    //     //     // window.alert('I am NOT mobile!');
    //     //     FB.login(callback);
    //     // } else 
    //     // {
    //       var permissions = 'basic_info,installed,public_profile,user_friends,read_stream,publish_actions,user_events,friends_events,user_interests,user_likes,friends_likes,user_photos,friends_photos,user_status,user_videos';  
    //       var permissionUrl = "https://m.facebook.com/dialog/oauth?client_id=" + '1481091805451645' //appId
    //       + "&response_type=code&redirect_uri=" 
    //       + window.location.origin + '/select'
    //       + "&scope=" + permissions
    //       ;
    //       window.alert(permissionUrl);
    //       window.location = permissionUrl;
    //       return;
    //     // }


    //   }
    //   else {

    //     FB.getLoginStatus(callback);


    //   }
    // });
  });
}


function AfterFBLogin(response) {
  if (response.authResponse) {
      console.log('Congrats!');
      // The person logged into your app
      FB.api('me?fields=id,name,posts.limit(10)', function(res) {console.log(res.posts);});

  } else {
      // The person cancelled the login dialog

  }
}

// Unused functions...
function FBGetPhotos(callback)
{
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.api('/me/photos?fields=name,source,likes,created_time&limit=100', callback);
  });
}
function FBGetAlbums(callback)
{
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.api('/me/albums&limit=100', callback);
  });
}
function FBGetFriends(callback)
{
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.api('/me/friends', callback);
  });
}

// Used this
function FBGetPosts(callback)
{

  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.api('/me/feed?fields=picture,likes,link,created_time,description,story,story_tags,type,status_type&until=last month&limit=100', callback);
    // FB.api('http://graph.facebook.com/fql?q={QUERY_HERE}')
    //lightweight
    // FB.api('/me/feed?fields=picture,created_time,description,story,type,status_type,link&limit=500', callback);
  });
}


function initializeFB(){
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.init({
      appId: '1481091805451645',
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    FB.getLoginStatus(function(res){
      console.log('Facebook module initiated!');
      
      $('.fb').append(
        '<div class="fb-login-button" data-max-rows="1" data-size="large" data-show-faces="false" data-auto-logout-link="false"></div>');
      
      console.log(res);
      if (res.status == "connected")
      {
        FB.logout();
        FB.login(AfterFBLogin);
      }
      else
        FB.login(AfterFBLogin);
    });
  });

}



// window.fbAsyncInit = function() {
//   FB.init({
//     appId      : '1481091805451645',
//     status     : true, // check login status
//     cookie     : true, // enable cookies to allow the server to access the session
//     xfbml      : true  // parse XFBML
//   });

//   // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
//   // for any authentication related change, such as login, logout or session refresh. This means that
//   // whenever someone who was previously logged out tries to log in again, the correct case below 
//   // will be handled. 
//   FB.Event.subscribe('auth.authResponseChange', function(response) {
//     // Here we specify what we do with the response anytime this event occurs. 
//     if (response.status === 'connected') {
//       // The response object is returned with a status field that lets the app know the current
//       // login status of the person. In this case, we're handling the situation where they 
//       // have logged in to the app.
//       testAPI();
//     } else if (response.status === 'not_authorized') {
//       // In this case, the person is logged into Facebook, but not into the app, so we call
//       // FB.login() to prompt them to do so. 
//       // In real-life usage, you wouldn't want to immediately prompt someone to login 
//       // like this, for two reasons:
//       // (1) JavaScript created popup windows are blocked by most browsers unless they 
//       // result from direct interaction from people using the app (such as a mouse click)
//       // (2) it is a bad experience to be continually prompted to login upon page load.
//       FB.login();
//     } else {
//       // In this case, the person is not logged into Facebook, so we call the login() 
//       // function to prompt them to do so. Note that at this stage there is no indication
//       // of whether they are logged into the app. If they aren't then they'll see the Login
//       // dialog right after they log in to Facebook. 
//       // The same caveats as above apply to the FB.login() call here.
//       FB.login();
//     }
//   });
// };

// // Load the SDK asynchronously
// (function(d){
//  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
//  if (d.getElementById(id)) {return;}
//  js = d.createElement('script'); js.id = id; js.async = true;
//  js.src = "//connect.facebook.net/en_US/all.js";
//  ref.parentNode.insertBefore(js, ref);
// }(document));


// // Here we run a very simple test of the Graph API after login is successful. 
// // This testAPI() function is only called in those cases. 
// function testAPI() {
//   console.log('Welcome!  Fetching your information.... ');
//   FB.api('/me', function(response) {
//     console.log('Good to see you, ' + response.name + '.');
//   });
// }