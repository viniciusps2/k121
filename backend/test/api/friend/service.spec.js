const test = require('ava')
const {times} = require('lodash/fp')

const {createMockFor} = require('../../helpers')

const SecretFriendService = require('../../../api/secret-friend/service')
const FriendService = require('../../../api/friend/service')
const Friend = require('../../../api/friend/collection')

const FriendMock = createMockFor(Friend)

test('.findById: should find', async t => {
  let mock = FriendMock('findOne', {_id: '123'}, {name: 'nn'})

  let res = await FriendService.findById('123')
  t.is(res.name, 'nn')
  mock.done()
  t.pass()
})

test('.findById: when not found throw error', async t => {
  let mock = FriendMock('findOne', {_id: '123'})

  await t.throws(FriendService.findById('123'))
  mock.done()
})

test('.findBySecretFriend: should find', async t => {
  let mock = FriendMock('find', {secretFriend: '314'}, [{name: 'nn'}])

  let res = await FriendService.findBySecretFriend('314')
  t.is(res[0].name, 'nn')
  mock.done()
  t.pass()
})

test('.delete: should find', async t => {
  let mock = FriendMock('remove', {_id: '123'}, {result: {n: 1}})

  await FriendService.delete('123')
  mock.done()
  t.pass()
})

test('.delete: when not found throw error', async t => {
  let mock = FriendMock('remove', {_id: '123'})

  await t.throws(FriendService.delete('123'))
  mock.done()
})
