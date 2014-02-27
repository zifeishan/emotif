/*
* Front end logic for trend page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  initializePage();
})

function initializePage() {
  //generate random video from database
  loadMoodTrend();

  $('#trend-refresh-button').click(function(e){
    loadMoodTrend();
  });

  $('#trend-share-button').click(function(e){
    window.alert('Share to Facebook is not supported yet.');
  });
  $('#trend-back-button').click(function(e){
    window.location.href = '/select';
  });

  

    // $scope.refresh = () ->
    //   loadMoodTrend()
    //   window.alert 'The mood trend has been reloaded!'

    // $scope.share = () ->
    //   window.alert 'Share to Facebook successfully!'



  //add clickListeners for buttons
  // $('#content-refresh-button').click(function(e) {
  //   getNewVideo();
  // });

  // $('#content-like-button').click(function(e) {
  //   var likes = parseInt($('#like-number').text());
  //   likes++;
  //   $('label#like-number').text(likes);
  // });

  // $('#content-better-button').click(function(e) {
  //   window.location.href = '/trend';
  // });
}


'use strict'

function loadMoodTrend() {
  var data, user;
  var email = window.localStorage.getItem('email');

  // var email = $.get('/api/users/me').done(function(e){
    
  // });

  // user = Auth.getCurrentUser();
  // console.log('User:');
  // console.log(user);
  if (email === null) {
    console.log("Not logged in yet.");
    window.location.href = '/';
  } 

  data = [
    {
      key: 'Mood',
      values: []
    }
  ];
  console.log("email:" + email);
  // window.gm = User.getmood();
  $.post('/api/users/getmood/', {email:email})
    .done(function(moods) {
      var thismood, time_index, x, y, _i, _len, _ref;
      time_index = 1;
      _ref = moods.values;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        thismood = _ref[_i];
        if (thismood === void 0) {
          console.log(i + ' undefined');
          continue;
        }
        if (thismood.time < 99999999) {
          continue;
        }
        x = time_index;
        time_index += 1;
        y = parseInt(thismood.score);
        data[0].values.push([x, y]);
      }
      console.log(data);
      return nv.addGraph(function() {
        var chart;
        chart = nv.models.lineChart().x(function(d) {
          return d[0];
        }).y(function(d) {
          return d[1];
        }).color(d3.scale.category10().range()).useInteractiveGuideline(false);
        window.chart = chart;
        chart.xAxis.tickFormat(d3.format('d'));
        chart.yAxis.tickFormat(d3.format('d'));
        window.chart = d3.select('#mychart svg').datum(data).transition().duration(500).call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
      });
    });
}
