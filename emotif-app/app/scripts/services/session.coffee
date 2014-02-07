'use strict'

angular.module('emotifAppApp')
  .factory 'Session', ($resource) ->
    $resource '/api/session/'
