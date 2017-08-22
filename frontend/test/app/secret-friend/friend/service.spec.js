describe('FriendService Spec', function () {
  var FriendService, Friend, $uibModal, sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()

    module('secret-friend')

    inject(function (_FriendService_, _Friend_, _$uibModal_) {
      FriendService = _FriendService_
      Friend = _Friend_
      $uibModal = _$uibModal_
      uibOpenMock()
    })
  })

  afterEach(function () {
    sandbox.verify()
    sandbox.restore()
  })

  it('.create: should open modal and create friend', function (done) {
    friendMock('create', {_id: '555'})

    FriendService.create('123').then(function (res) {
      expect(res._id).toEqual('555')
      done()
    }).catch(function (error) {
      fail(error)
      done()
    })
  })

  it('.edit: should open modal and save friend', function (done) {
    friendMock('update', {_id: '222'})

    FriendService.edit('123').then(function (res) {
      expect(res._id).toEqual('222')
      done()
    }).catch(function (error) {
      fail(error)
      done()
    })
  })

  it('.remove: should remove friend', function (done) {
    friendMock('remove', {_id: '333'})

    FriendService.remove('123').then(function (res) {
      expect(res._id).toEqual('333')
      done()
    }).catch(function (error) {
      fail(error)
      done()
    })
  })

  it('.findBySecretFriend: should list friends', function (done) {
    friendMock('findBySecretFriend', [{_id: '333'}])

    FriendService.findBySecretFriend('123').then(function (res) {
      expect(res[0]._id).toEqual('333')
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

  function friendMock (method, result) {
    sandbox.mock(Friend)
      .expects(method)
      .resolves(result)
      .atLeast(1)
  }
})
