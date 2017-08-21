const test = require('ava')
const {afterCleanup} = require('../../helpers')

const Friend = require('../../../api/friend/collection')
const SecretFriendService = require('../../../api/secret-friend/service')

afterCleanup()

test.beforeEach(async t => {
  t.context.secretFriend = await SecretFriendService.create(SecretFriendReqFixture())
})

test('.create: should save', async t => {
  let {secretFriend} = t.context
  t.is(secretFriend.title, 'test title')
})

test('.findById: should find', async t => {
  let {secretFriend} = t.context
  let list = await SecretFriendService.findById(secretFriend._id)
  t.is(list.title, 'test title')
})

function SecretFriendReqFixture () {
  return {
    title: 'test title',
  }
}
