'use strict'

angular.module('emotifAppApp')
  .controller 'SignupCtrl', ($scope, Auth, $location) ->
    $scope.user = Auth.getTempUser()
    $scope.errors = {}
    
    #This is the proper code to run when page is loaded
    $scope.$on('$viewContentLoaded', ->
      if $scope.user == null
        console.log("No temp user")
        $location.path '/'
    )

    $scope.back = ->
      Auth.clearTempUser()
      $location.path '/'

    $scope.register = (form) ->
      $scope.submitted = true

      if form.$valid
        Auth.createUser(
          email: $scope.user.email
          password: $scope.password
        ).then( ->
          # Account created, redirect to home
          # $location.path '/'
          $location.path '/select'
        ).catch( (err) ->
          err = err.data
          $scope.errors = {}
          
          # Update validity of form fields that match the mongoose errors
          angular.forEach err.errors, (error, field) ->
            form[field].$setValidity 'mongoose', false
            $scope.errors[field] = error.type
        )