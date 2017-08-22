describe('SecretFriend Factory Spec', function () {
  var q, httpBackend, rootScope, SecretFriend

  var environment = {secretFriendApi: 'http://localhost:3006'}

  beforeEach(function () {
    module('secret-friend', function ($provide) {
      $provide.constant('environment', environment)
    })

    inject(function ($q, $httpBackend, $rootScope, _SecretFriend_) {
      SecretFriend = _SecretFriend_
      httpBackend = $httpBackend
      rootScope = $rootScope
      q = $q
    })
  })

  describe('findById', function () {
    it('should call API and return', function () {
      httpBackend
        .whenGET(environment.secretFriendApi + '/secret-friend/5')
        .respond(200, {name: 'abc'})

      SecretFriend.findById(5)

      httpBackend.flush()
      rootScope.$apply()
    })
  })

  describe('create', function () {
    it('should call API and create', function () {
      httpBackend
        .whenPOST(environment.secretFriendApi + '/secret-friend')
        .respond(200, {name: 'abc'})

      SecretFriend.create({name: 'abc'})

      httpBackend.flush()
      rootScope.$apply()
    })
  })

  describe('shuffle', function () {
    it('should call API and shuffle', function () {
      httpBackend
        .whenGET(environment.secretFriendApi + '/secret-friend/5/shuffle')
        .respond(200)

      SecretFriend.shuffle(5)

      httpBackend.flush()
      rootScope.$apply()
    })
  })

})
