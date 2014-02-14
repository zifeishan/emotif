'use strict'

angular.module('emotifAppApp')
  .controller 'ContentCtrl', ($scope, Auth, Video, $location, $sce) ->
    $scope.user = {}
    $scope.errors = {}
    $sce.trustAsResourceUrl 'http://www.youtube.com/*'

    #This is the proper code to run when page is loaded
    $scope.$on('$viewContentLoaded', ->
      # video = Video.getVideoByKeyword({keyword: 'funny'})
      console.log 'Content page loaded'
      
      Video.getVideoFromDatabase (video) ->
        $scope.video = video
        final_url = 'http://www.youtube.com/embed/' + video.video_id
        $scope.video.url = $sce.trustAsResourceUrl(final_url)
        $scope.video.likes = Math.floor(100* Math.random())

    )
