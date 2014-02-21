/*
* Front end logic for select page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initializePage();
})

function initializePage() {
  $('#p2').click(function(e) {
    select(2);
  });
  $('#p1').click(function(e) {
    select(1);
  });
  $('#p0').click(function(e) {
    select(0);
  });
  $('#n1').click(function(e) {
    select(-1);
  });
  $('#n2').click(function(e) {
    select(-2);
  });

  function select(value) {
    console.log('My mood is ' + value);
    // console.log(session.passport.user);
    // email = Auth.getCurrentUser().email;
    var today = new Date().getTime();
    $.post('/api/users/checkLogin', function(result) {
      if(result.loggedin) {
        var userId = result.id;
        $.ajax({
            url: '/api/users/addmood',
            type: 'PUT',
            data: {
              id: userId,
              time: today,
              mood: value
            },
            success: function() {
              if(value > 0) {
                window.location.href = '/trend';
              } else {
                window.location.href = '/recommend/video';
              }
            }
        });
      } else {
        window.location.href = '/';
      }
    });

  }

}