'use strict'

angular.module('emotifAppApp')
  .controller 'MainCtrl', ($scope, $http) ->
  	# This basically do nothing
    $http.get('/api/awesomeThings').success (awesomeThings) ->
      $scope.awesomeThings = awesomeThings
