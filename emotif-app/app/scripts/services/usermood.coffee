'use strict'

angular.module("emotifAppApp")
  .factory "UserMood", ($resource) ->
    $resource "/api/usermood/:id",
      id: "@id"
    ,
      add:
        method: "PUT"
        params: 
          id: "add"

      # checkExist:
      #   method: "POST"
      #   params:
      #     id: "exist"

      get:
        method: "GET"
        params:
          id: "get"
  


# 'use strict'

# angular.module("emotifAppApp", ['ngResource'])
#   .factory("UserMood", ['$resource', ($resource) ->
#     $resource "/api/usermood/:id",
#       id: "@id"
#     ,
#       add:
#         method: "PUT"
#         params: 
#           id: "add"

#       # checkExist:
#       #   method: "POST"
#       #   params:
#       #     id: "exist"

#       get:
#         method: "GET"
#         params:
#           id: "get"
#   ])
