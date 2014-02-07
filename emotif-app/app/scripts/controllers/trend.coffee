'use strict'

angular.module('emotifAppApp')
  .controller 'TrendCtrl', ($scope, $http) ->
    $http.get('/api/emotionHistory').success (emotionHistory) ->
      $scope.emotionHistory = emotionHistory