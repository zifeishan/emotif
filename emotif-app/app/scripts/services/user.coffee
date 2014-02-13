"use strict"

angular.module("emotifAppApp")
  .factory "User", ($resource) ->
    $resource "/api/users/:id",
      id: "@id"
    ,
      update:
        method: "PUT"
        params: {}

      checkExist:
        method: "POST"
        params:
          id: "exist"

      get:
        method: "GET"
        params:
          id: "me"

