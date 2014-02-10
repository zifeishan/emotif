'use strict'

angular.module('emotifAppApp')
  .controller 'MainCtrl', ($scope, $location, $http) ->
  	# This basically do nothing
    # $http.get('/api/awesomeThings').success (awesomeThings) ->
    #   $scope.awesomeThings = awesomeThings
    
    $scope.next = (user) ->
    	$scope.user.email = user.email
    	alert $scope.user.email
    	$location.path '/login'
