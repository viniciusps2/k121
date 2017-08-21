describe('Routes', function () {
  var route, location, rootScope

  beforeEach(function () {
    module('secret-friend')
  })

  beforeEach(inject(
    function ($route, $location, $rootScope, $httpBackend) {
      location = $location
      route = $route
      rootScope = $rootScope
    }
  ))

  describe('/', function () {
    it('should load home', function () {
      expect(route.routes['/'].controller).toEqual('HomeCtrl')
      expect(route.routes['/'].templateUrl).toEqual('app/home/home.html')
    })
  })

  describe('/secret-friend/:id', function () {
    it('should load secret-friend by id', function () {
      expect(route.routes['/secret-friend/:id'].controller).toEqual('SecretFriendListCtrl')
      expect(route.routes['/secret-friend/:id'].templateUrl).toEqual('app/secret-friend/list.html')
    })
  })
})
