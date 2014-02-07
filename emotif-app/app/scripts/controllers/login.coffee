'use strict'

angular.module('emotifAppApp')
  .controller 'LoginCtrl', ($scope, Auth, $location) ->
    $scope.user = {}
    $scope.errors = {}

    $scope.login = (form) ->
      $scope.submitted = true
      
      if form.$valid
        Auth.login(
          email: $scope.user.email
          password: $scope.user.password
        )
        .then ->
          # Logged in, redirect to home
          # $location.path '/'
          $location.path '/select'
        .catch (err) ->
          err = err.data;
          $scope.errors.other = err.message;
