'use strict'

angular.module("emotifAppApp")
  .factory "Video", ($resource) ->
    $resource "/api/video/:id",
      id: "@id"
    ,
      getVideoByKeyword:
        method: "POST"
        params: 
        	id: 'keyword'

      getVideoFromDatabase:
      	method: "POST"
      	params:
      		id: 'database'