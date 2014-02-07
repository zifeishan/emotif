'use strict'

angular.module('emotifAppApp')
  .controller 'NavbarCtrl', ($scope, $location, Auth) ->
    $scope.menu = [
      title: 'Home'
      link: '/'
    , 
      title: 'Trend'
      link: '/trend'
    ,
      title: 'Settings'
      link: '/settings'
    ]
    
    $scope.logout = ->
      Auth.logout().then ->
        $location.path "/login"
    
    $scope.isActive = (route) ->
      route is $location.path()