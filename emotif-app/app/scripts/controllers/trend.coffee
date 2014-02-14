'use strict'

angular.module('emotifAppApp')
  .controller 'TrendCtrl', ($scope, $http) ->
    $http.get('/api/emotionHistory').success (emotionHistory) ->
      $scope.emotionHistory = emotionHistory

    # $scope.$on('$viewContentLoaded', ->
    #   if $scope.user == null
    #     console.log("No temp user")
    #     $location.path '/'

    #   else

        # data = {
        #   labels : ["January","February","March","April","May","June","July"],
        #   datasets : [
        #     {
        #       fillColor : "rgba(220,220,220,0.5)",
        #       strokeColor : "rgba(220,220,220,1)",
        #       pointColor : "rgba(220,220,220,1)",
        #       pointStrokeColor : "#fff",
        #       data : [65,59,90,81,56,55,40]
        #     },
        #     {
        #       fillColor : "rgba(151,187,205,0.5)",
        #       strokeColor : "rgba(151,187,205,1)",
        #       pointColor : "rgba(151,187,205,1)",
        #       pointStrokeColor : "#fff",
        #       data : [28,48,40,19,96,27,100]
        #     }
        #   ]
        # }
        # console.log data
        # ctx = $("#mychart").get(0).getContext("2d")
        # console.log ctx
        # myNewChart = new Chart(ctx).PolarArea(data)
        # window.ctx = ctx
        # window.chart = myNewChart

        # nv.addGraph( ()-> {
        #     chart = nv.models.multiBarChart()
        #       .transitionDuration(350)
        #       .reduceXTicks(true)   # If 'false', every single x-axis tick label will be rendered.
        #       .rotateLabels(0)      # Angle to rotate x-axis labels.
        #       .showControls(true)   # Allow user to switch between 'Grouped' and 'Stacked' mode.
        #       .groupSpacing(0.1)    # Distance between each group of bars.
            
         
        #     chart.xAxis
        #         .tickFormat(d3.format(',f'))
         
        #     chart.yAxis
        #         .tickFormat(d3.format(',.1f'))
         
        #     d3.select('#chart1 svg')
        #         .datum(exampleData())
        #         .call(chart)
         
        #     nv.utils.windowResize(chart.update)
         
        #     return chart
        # })
         
        # # Generate some nice data.
        # exampleData: () -> 
        #   return stream_layers(3,10+Math.random()*100,.1).map( (data, i) -> 
        #       return 
        #         key: 'Stream #' + i
        #         values: data
          
        # 