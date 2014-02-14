'use strict'

angular.module('emotifAppApp')
  .controller 'SelectCtrl', ($scope, Auth, User, $location) ->
    $scope.user = {}
    $scope.errors = {}

    $scope.SelectMood = (value) ->
      console.log 'My mood is ' + value
      email = Auth.getCurrentUser().email
      today = new Date()
      dd = today.getDate()
      mm = today.getMonth() + 1 # January is 0!
      yyyy = today.getFullYear()
      if dd < 10
        dd = "0" + dd 
      if mm < 10 
        mm = "0" + mm 
      today = yyyy + mm + dd
      console.log today

      User.addmood
        email: email
        time: today
        mood: value

      if value > 0
        $location.path '/trend'
      else
        $location.path '/content'
