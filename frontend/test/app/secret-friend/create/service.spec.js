describe('SecretFriendCreateService Spec', function () {
  var SecretFriendCreateService, SecretFriend, $uibModal, $location, sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()

    module('secret-friend')

    inject(function (_SecretFriendCreateService_, _SecretFriend_, _$uibModal_, _$location_) {
      SecretFriendCreateService = _SecretFriendCreateService_
      SecretFriend = _SecretFriend_
      $uibModal = _$uibModal_
      $location = _$location_
      uibOpenMock()
    })
  })

  afterEach(function () {
    sandbox.verify()
    sandbox.restore()
  })

  it('.create: should open modal and create secret friend', function (done) {
    secretFriendMock('create', {_id: '555'})
    locationPathMock('555')

    SecretFriendCreateService.create('123').then(function (res) {
      done()
    }).catch(function (error) {
      fail(error)
      done()
    })
  })

  function uibOpenMock () {
    sandbox.stub($uibModal, 'open').callsFake(function (opts) {
      return {result: opts.resolve.modalContext().saveFunction({name: 'abc'})}
    })
  }

  function locationPathMock (id) {
    sandbox.mock($location)
      .expects('path')
      .withArgs('/secret-friend/' + id)
      .atLeast(1)
  }

  function secretFriendMock (method, result) {
    sandbox.mock(SecretFriend)
      .expects(method)
      .resolves(result)
      .atLeast(1)
  }
})
