const test = require('ava')
const {times} = require('lodash/fp')

const {createMockFor, allMocksDone} = require('../../helpers')

const ShuffleService = require('../../../api/secret-friend/shuffle-service')
const SendMail = require('../../../lib/send-mail')

const FriendService = require('../../../api/friend/service')
const Friend = require('../../../api/friend/collection')
const SecretFriendService = require('../../../api/secret-friend/service')
const SecretFriend = require('../../../api/secret-friend/collection')

const FriendServiceMock = createMockFor(FriendService)
const SendMailMock = createMockFor(SendMail)
const FriendInstanceMock = createMockFor(Friend.prototype)
const SecretFriendServiceMock = createMockFor(SecretFriendService)
const SecretFriendInstanceMock = createMockFor(SecretFriend.prototype)

let buildFriends = times((i) => (new Friend({name: 'friend ' + i, _id: i, email: 'k@k.com'})))

test('.shuffle: should shuffle friends', async t => {
  let friends = buildFriends(10)
  let mocks = [
    SecretFriendServiceMock('findById', '123', new SecretFriend()),
    SecretFriendInstanceMock('save'),
    FriendServiceMock('findBySecretFriend', '123', friends),
    FriendInstanceMock('save', null, null, {atMost: 10}),
    SendMailMock('send', null, null, {atMost: 10})
  ]

  await ShuffleService.shuffle('123')
  allMocksDone(mocks)
  t.pass()
})

test('.shuffle: when quantity is odd should throw', async t => {
  let friends = buildFriends(9)
  let mocks = [
    SecretFriendServiceMock('findById', '456', new SecretFriend()),
    FriendServiceMock('findBySecretFriend', '456', friends),
  ]

  let mock = FriendServiceMock('findBySecretFriend', '456', friends)

  await t.throws(ShuffleService.shuffle('456'), /par/)
  allMocksDone(mocks)
})

test('.shuffle: when already shuffled should throw', async t => {
  let friends = buildFriends(10)
  let mocks = [
    SecretFriendServiceMock('findById', '789', new SecretFriend({shuffled: true})),
    FriendServiceMock('findBySecretFriend', '789', friends),
  ]

  await t.throws(ShuffleService.shuffle('789'), /foi realizado/)
  allMocksDone(mocks)
})
