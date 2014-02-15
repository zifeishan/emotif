'use strict'

angular.module('emotifAppApp')
  .controller 'TrendCtrl', ($scope, $http, User, Auth, $location) ->
    # $http.get('/api/users/getmood').success (moods) ->
    #   $scope.moods = moods
    #   console.log(moods)
      # $scope.emotionHistory = emotionHistory

    $scope.$on('$viewContentLoaded', ->
      # console.log $scope.user
      user = Auth.getCurrentUser()
      console.log 'User:'
      console.log user
      if user == null
        console.log "Not logged in yet."
        $location.path '/'

      else
        data = [{
          key: 'Mood'
          values: []
        }]

        console.log "email:"+user.email
        window.gm = User.getmood()
        User.getmood().$promise.then( (moods) ->
          # console.log 'Callback! Moods: '
          # console.log moods
          # console.log 'Moods.values:'
          # console.log moods.values
          # console.log 'Moods.values of 0:'
          # console.log moods.values[0]

          # console.log size(moods.values)

          # for i = 0; i < moods.values.length; i++
          time_index = 1
          for thismood in moods.values
            # console.log 'i:'
            # console.log i
            # thismood = moods.values[i]
            
            if thismood is undefined
              console.log i+' undefined'
              continue
            if thismood.time < 99999999  # Not right format
              continue
            # x = thismood.time
            x = time_index
            time_index += 1
            y = parseInt(thismood.score)
            data[0].values.push([x,y])
            # console.log x
            # console.log y

          console.log data
          nv.addGraph( ()-> 
            # console.log nv
            # chart = nv.models.multiBarChart()
            #   .transitionDuration(350)
            #   .reduceXTicks(true)   # If 'false', every single x-axis tick label will be rendered.
            #   .rotateLabels(0)      # Angle to rotate x-axis labels.
            #   .showControls(true)   # Allow user to switch between 'Grouped' and 'Stacked' mode.
            #   .groupSpacing(0.1);    # Distance between each group of bars.
            # chart = nv.models.cumulativeLineChart()
            chart = nv.models.lineChart()
                .x((d) -> 
                    return d[0] 
                  )
                .y((d) ->
                    return d[1]
                  ) # adjusting, 100% is 1.00, not 100 as it is in the data
                .color(d3.scale.category10().range())
                .useInteractiveGuideline(false)
                ;
            window.chart = chart
            chart.xAxis
              .tickFormat(d3.format('d'))
              # .tickFormat( (d) ->
              #   return d3.time.format('%x')(new Date(d))
              # );

            chart.yAxis
              .tickFormat(d3.format('d'))

            # chart.xAxis
            #     .tickFormat(d3.format(',f'))
         
            # chart.yAxis
            #     .tickFormat(d3.format(',.1f'))
         
            window.chart = d3.select('#mychart svg')
                .datum( data
                  # exampleData: () -> 
                  # return stream_layers(3,10+Math.random()*100,.1).map( (data, i) -> 
                  #     return { key: 'Stream #' + i, values: data} 
                  # )
                )
                .transition().duration(500)
                .call(chart)
         
            nv.utils.windowResize(chart.update)
         
            return chart
          )


        )
          

    )
          
        