'use strict'

angular.module('emotifAppApp')
  .controller 'SettingsCtrl', ($scope, User, Auth, $location) ->
    $scope.errors = {}

    $scope.changePassword = (form) ->
      $scope.submitted = true
      
      if form.$valid
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
        .then(->
          $scope.message = 'Password successfully changed.'
        ).catch( ->
          form.password.$setValidity 'mongoose', false
          $scope.errors.other = 'Incorrect password'
        )

    $scope.logout = () ->
      Auth.logout () ->
        $location.path '/'

    $scope.changeName = () ->
      window.alert 'ChangName Button clicked! We have not implement this because of the time. You will see this in later vision.'

    $scope.changePassword = () ->
      window.alert 'ChangPassword Button clicked! We have not implement this because of the time. You will see this in later vision.'
