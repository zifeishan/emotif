/*
* Front end logic for select page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
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
    var dateProvider = new Date();
    var day = dateProvider.getDate().toString();
    var month = (dateProvider.getMonth() + 1).toString();
    if(month.length == 1){
      month = '0' + month;
    }
    var year = dateProvider.getFullYear().toString();
    var date = year + month + day;

    $.post('/api/users/checkLogin', function(result) {
      if(result.loggedin) {
        var userId = result.id;
        $.ajax({
            url: '/api/users/addmood',
            type: 'PUT',
            data: {
              id: userId,
              date: date,
              score: value
            },
            success: function() {
              if(value > 0) {
                window.location.href = '/trend';
              } else {
                // window.location.href = '/recommend/video';
                window.location.href = '/content';
              }
            }
        });
      } else {
        console.log('user has not logged in..');
        console.log(result);
        // window.location.href = '/';
      }
    });

  }

}