'use strict'

angular.module('emotifAppApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config ($routeProvider, $locationProvider, $httpProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'partials/main'
        controller: 'MainCtrl'
      
      .when '/login',
        templateUrl: 'partials/login'
        controller: 'LoginCtrl'
      .when '/signup', 
        templateUrl: 'partials/signup'
        controller: 'SignupCtrl'
      .when '/select',
        templateUrl: 'partials/select'
        controller: 'SelectCtrl'
        authenticate: true
      .when '/trend', 
        templateUrl: 'partials/trend'
        controller: 'TrendCtrl'
        authenticate: true
      .when '/settings',
        templateUrl: 'partials/settings'
        controller: 'SettingsCtrl'
        authenticate: true
      .when '/content',
        templateUrl: 'partials/content'
        controller: 'ContentCtrl'
        authenticate: true
      # .when '/content2',
      #   templateUrl: 'partials/content2'
      #   controller: 'Content2Ctrl'
      .when '/share',
        templateUrl: 'partials/share'
        controller: 'ShareCtrl'
      .otherwise
        redirectTo: '/'

    $locationProvider.html5Mode true
  
    $httpProvider.interceptors.push ['$q', '$location', ($q, $location) ->
      responseError: (response) ->
        if response.status is 401 or response.status is 403
          $location.path '/login'
          $q.reject response
        else
          $q.reject response
    ]
  .run ($rootScope, $location, Auth) ->
    
    # Redirect to login if route requires auth and you're not logged in
    $rootScope.$on '$routeChangeStart', (event, next) ->
      $location.path '/'  if next.authenticate and not Auth.isLoggedIn()