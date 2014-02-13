'use strict'

angular.module('emotifAppApp')
  .controller 'LoginCtrl', ($scope, Auth, $location) ->
    $scope.user = Auth.getTempUser()
    $scope.errors = {}

    # if $scope.user == null
    #   console.log("No temp user")
    #   $location.path '/'

    #This is the proper code to run when page is loaded
    $scope.$on('$viewContentLoaded', ->
      if $scope.user == null
        console.log("No temp user")
        $location.path '/'
    )

    $scope.back = ->
      Auth.clearTempUser()
      $location.path '/'

    $scope.login = (form) ->
      $scope.submitted = true
      
      if form.$valid and $scope.user.email and $scope.password
        $scope.user.password = $scope.password
        Auth.login(
          email: $scope.user.email
          password: $scope.user.password
        )
        .then ->
          # Logged in, redirect to home
          $location.path '/select'
        .catch (err) ->
          err = err.data;
          $scope.errors.other = err.message;
