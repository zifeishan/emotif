'use strict'

angular.module('emotifAppApp')
  .controller 'MainCtrl', ($scope, Auth, $location, $http) ->
  	# This basically do nothing
    # $http.get('/api/awesomeThings').success (awesomeThings) ->
    #   $scope.awesomeThings = awesomeThings

    $scope.facebook = ->
        $http.get('/api/facebook/login').success (err, data) ->
            $location.path '/select'
            console.log data

    $scope.next = (form) ->
    	if form.$valid
    		Auth.updateTempUser($scope.user)
    		console.log 'Email Address received'
    		Auth.isRegistered($scope.user.email, (result) ->
    			if result.exist == false
    				$location.path '/signup'
    			else
    				$location.path '/login'
    		)
