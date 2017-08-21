const test = require('ava')
const {times} = require('lodash/fp')

const {createMockFor} = require('../../helpers')

const SecretFriendService = require('../../../api/secret-friend/service')
const FriendService = require('../../../api/friend/service')
const Friend = require('../../../api/friend/collection')

const FriendMock = createMockFor(Friend)

test.beforeEach(async t => {
  t.context.secretFriend = await SecretFriendService.create({title: 'a'})
})

test('.create: should add Friend', async t => {
  let {_id} = t.context.secretFriend
  let friendData = FriendFixture(_id)

  await FriendService.create(friendData)

  let list = await FriendService.findBySecretFriend(_id)
  t.is(list[0].name, 'mr smith')
  t.is(list.length, 1)
})

test('.create: when duplicated email should throw', async t => {
  let {_id} = t.context.secretFriend
  let friendData = FriendFixture(_id)

  await FriendService.create(friendData)
  await t.throws(FriendService.create(friendData), /mesmo e-mail/)
})

function FriendFixture (secretFriend) {
  return {name: 'mr smith', email: 'bb@bb.com', secretFriend}
}
