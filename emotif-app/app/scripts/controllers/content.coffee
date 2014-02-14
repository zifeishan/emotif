'use strict'

angular.module('emotifAppApp')
  .controller 'ContentCtrl', ($scope, Auth, Video, $location) ->
    $scope.user = {}
    $scope.errors = {}

    #This is the proper code to run when page is loaded
    $scope.$on('$viewContentLoaded', ->
      # video = Video.getVideoByKeyword({keyword: 'funny'})
      console.log 'Content page loaded'
      $scope.video = Video.getVideoFromDatabase()
      console.log $scope.video
      window.url = $scope.video.url
    )
