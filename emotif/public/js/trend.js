/*
* Front end logic for trend page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
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

}

function loadMoodTrend() {
  $.get('/api/users/me', function(user) {
    console.log('Get User');
    console.log(user);
    var userId = user._id;
    console.log(userId);
    $.post('/api/users/getmood', {id : userId}, function(result) {
      console.log(result);
      if(result == null) {
        //No record found, warn the user
        showNoRecordWarning();
      } else {
        analyzeAndDrawGraph(result);
      }
    })
  });
}

function analyzeAndDrawGraph(data) {
  var shownDataLength = 7;

  // for(var i = data.length - 1; i>=0; i--) {
  //   console.log(data[i]);
  // }

  //For now I only use array slice, will add sophisticated data selection method later.
  //e.g. select by date
  if(data.length < shownDataLength) {
    shownDataLength = data.length;
  }
  var shownData = data.slice(-shownDataLength);
  console.log(shownData);

  //preprocess the data
  //date, max mood, min mood and average mood
  // var dateArray = [];
  var maxMoodArray = [];
  var minMoodArray = [];
  var avgMoodArray = [];
  for(var i=0; i<shownData.length; i++) {
    //tranfer date
    var monthString = shownData[i].date.substring(4,6);
    var dayString = shownData[i].date.substring(6,8);
    var dateString = monthString + '/' + dayString;
    var scoreArray = shownData[i].score;
    //Here we need to transfer the -2~2 scale data to a 1-5 scale.
    var maxScore = 1;
    var minScore = 5;
    var sumScore = 0;
    for(var j=0; j<scoreArray.length; j++) {
      var score = parseInt(scoreArray[j]);
      //Here we need to transfer the -2~2 scale data to a 1-5 scale.
      score += 3;
      if(score > maxScore) {
        maxScore = score;
      }
      if(score < minScore) {
        minScore = score;
      }
      sumScore += score;
    }
    var avgScore = Math.ceil(sumScore / scoreArray.length);
    
    //Here we need to transfer the data to adapt the stacked chart
    maxScore -= avgScore;
    avgScore -= minScore;
    
    maxMoodArray.push({x:dateString, y:maxScore});
    minMoodArray.push({x:dateString, y:minScore});
    avgMoodArray.push({x:dateString, y:avgScore});
  }
  // console.log(dateArray);
  console.log(maxMoodArray);
  console.log('process data finished');

  // function generateDataForGraph() {
  //   return maxMoodArray.map(function(data, i) {
  //     return {
  //       key: 'Stream #' + i,
  //       values: data
  //     };
  //   });
  // }

  var finalData = [
  {key: 'Low', values: minMoodArray, color: '#7E8ADE'},
  {key: 'Average', values: avgMoodArray, color: '#7BBADE'},
  {key: 'High', values: maxMoodArray, color: '#F29E4A'}
  ];


console.log(finalData);

  // console.log(generateDataForGraph());

  return nv.addGraph(function() {
    // var width = 350;
    var height = 250;
    var chart = nv.models.multiBarChart()
      .transitionDuration(100)
      .stacked(true)
      .reduceXTicks(false)   //If 'false', every single x-axis tick label will be rendered.
      .rotateLabels(45)      //Angle to rotate x-axis labels.
      .showControls(false)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1)    //Distance between each group of bars.
      .forceY([-1,6])
      .margin({top:5,right:10,bottom:10,left:25})
      // .width(width)
      .height(height);

    // var chart = nv.models.lineChart()
    //             .margin({top:5,right:10,bottom:10,left:25})
    //             .useInteractiveGuideline(false)  //We want nice looking tooltips and a guideline!
    //             .transitionDuration(350)  //how fast do you want the lines to transition?
    //             .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
    //             .showYAxis(true)        //Show the y-axis
    //             .showXAxis(true)        //Show the x-axis
    //             .height(height)
    // ;
 
    // chart.xAxis
    //     .tickFormat(d3.format(',f'));
 
    // chart.yAxis
        // .tickFormat(d3.format(',.1f'));
 
    d3.select('#mood-graph svg')
        .datum(finalData)
        .call(chart)
        // .attr('width', width)
        .attr('height', height+25);
 
    nv.utils.windowResize(chart.update);
 
    return chart;
});
}

function showNoRecordWarning() {
  $('#mood-graph').text('No mood record is found. Please select mood first!');
}
