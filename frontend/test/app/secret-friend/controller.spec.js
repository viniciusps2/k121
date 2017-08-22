describe('SecretFriendListCtrl Spec', function () {
  var scope, controller, q, SecretFriend, SecretFriendListCtrl, FriendService, SecretFriend

  beforeEach(function () {
    sandbox = sinon.sandbox.create()

    module('secret-friend')

    inject(function ($controller, $rootScope, _FriendService_, _SecretFriend_) {
      scope = $rootScope.$new()
      FriendService = _FriendService_
      SecretFriend = _SecretFriend_

      SecretFriendListCtrl = $controller('SecretFriendListCtrl', {
        $scope: scope,
        $routeParams: {id: '45'},
        FriendService: FriendService
      })
    })
  })

  afterEach(function () {
    sandbox.verify()
    sandbox.restore()
  })

  function createController (routeParams) {
    return
  }

  describe('addFriend', function () {
    it('should add friend', function (done) {
      friendServiceMock('create')
      friendServiceMock('findBySecretFriend', [{name: 'abc'}])

      SecretFriendListCtrl.addFriend(2).then(function (res) {
        done()
      }).catch(function (error) {
        fail(error)
        done()
      })
    })
  })

  describe('listFriends', function () {
    it('should list friends', function (done) {
      friendServiceMock('findBySecretFriend', [{name: 'abc'}])
      SecretFriendListCtrl.listFriends(2).then(function (res) {
        expect(SecretFriendListCtrl.friends[0].name).toEqual('abc')
        done()
      }).catch(function (error) {
        fail(error)
        done()
      })
    })
  })

  describe('shuffle', function () {
    it('should shuffle', function (done) {
      secretFriendMock('shuffle')

      SecretFriendListCtrl.shuffle().then(function (res) {
        expect(SecretFriendListCtrl.message.success).toContain('Sorteio realizado com sucesso')
        done()
      }).catch(function (error) {
        fail(error)
        done()
      })
    })
  })

  function friendServiceMock (method, result) {
    sandbox.mock(FriendService)
      .expects(method)
      .resolves(result)
      .atLeast(1)
  }

  function secretFriendMock (method, result) {
    sandbox.mock(SecretFriend)
      .expects(method)
      .resolves(result)
      .atLeast(1)
  }
})
