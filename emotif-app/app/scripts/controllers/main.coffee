'use strict'

angular.module('emotifAppApp')
  .controller 'MainCtrl', ($scope, Auth, $location, $http) ->
  	# This basically do nothing
    # $http.get('/api/awesomeThings').success (awesomeThings) ->
    #   $scope.awesomeThings = awesomeThings

    $scope.next = (form) ->
    	Auth.updateTempUser($scope.user)
    	console
    	if form.$valid
    		console.log 'Email Address received'
    		$location.path '/login'
