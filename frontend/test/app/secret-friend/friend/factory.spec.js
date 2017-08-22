describe('Friend Factory Spec', function () {
  var q, httpBackend, rootScope, Friend

  var environment = {secretFriendApi: 'http://localhost:3006'}

  beforeEach(function () {
    module('secret-friend', function ($provide) {
      $provide.constant('environment', environment)
    })

    inject(function ($q, $httpBackend, $rootScope, _Friend_) {
      Friend = _Friend_
      httpBackend = $httpBackend
      rootScope = $rootScope
      q = $q
    })
  })

  describe('findBySecretFriend', function () {
    it('should call API and return array with results', function () {
      httpBackend
        .whenGET(environment.secretFriendApi + '/friend?secretFriend=5')
        .respond(200, [{name: 'abc'}])

      Friend.findBySecretFriend(5)

      httpBackend.flush()
      rootScope.$apply()
    })
  })

  describe('create', function () {
    it('should call API and create', function () {
      httpBackend
        .whenPOST(environment.secretFriendApi + '/friend')
        .respond(200, {name: 'abc'})

      Friend.create('123', {name: 'abc'})

      httpBackend.flush()
      rootScope.$apply()
    })
  })

  describe('update', function () {
    it('should call API and update', function () {
      httpBackend
        .whenPUT(environment.secretFriendApi + '/friend/123')
        .respond(200)

      Friend.update({_id: '123'})

      httpBackend.flush()
      rootScope.$apply()
    })
  })

  describe('remove', function () {
    it('should call API and remove', function () {
      httpBackend
        .whenDELETE(environment.secretFriendApi + '/friend/123')
        .respond(200)

      Friend.remove({_id: '123'})

      httpBackend.flush()
      rootScope.$apply()
    })
  })
})
