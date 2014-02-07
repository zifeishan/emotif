'use strict'

describe 'Controller: TrendCtrl', () ->

  # load the controller's module
  beforeEach module 'emotifAppApp'

  TrendCtrl = {}
  scope = {}
  $httpBackend = {}

  # Initialize the controller and a mock scope
  beforeEach inject (_$httpBackend_, $controller, $rootScope) ->
    $httpBackend = _$httpBackend_
    $httpBackend.expectGET('/api/emotionHistory').respond {
      1:2, 2:1, 3:4, 4:3, 5:5
    }
    scope = $rootScope.$new()
    TrendCtrl = $controller 'TrendCtrl', {
      $scope: scope
    }

  # it 'should attach a list of awesomeThings to the scope', () ->
  #   expect(scope.awesomeThings).toBeUndefined()
  #   $httpBackend.flush()
  #   expect(scope.awesomeThings.length).toBe 4
