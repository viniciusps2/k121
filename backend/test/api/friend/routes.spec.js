const test = require('ava')
const supertest = require('supertest')

const {createMockFor} = require('../../helpers')

const app = require('../../../app')
const request = supertest(app.listen())

const FriendService = require('../../../api/friend/service')
const Friend = require('../../../api/friend/collection')

const FriendServiceMock = createMockFor(FriendService)
const FriendMock = createMockFor(Friend)

test('PUT /friend/:_id', async t => {
  let body = {title: 'test title'}

  let mock = FriendMock('update', [{_id: '41bdf1'}, body])

  let res = await request
    .put('/friend/41bdf1')
    .send(body)
    .expect(200)

  mock.done()
  t.pass()
})

test('GET /friend/:_id', async t => {
  let mock = FriendServiceMock('findById', '41bdf1', {_id: '41bdf1'})

  let res = await request
    .get('/friend/41bdf1')
    .expect(200)

  t.is(res.body._id, '41bdf1')
  mock.done()
})

test('DELETE /friend/:_id', async t => {
  let mock = FriendServiceMock('delete', {_id: '41bdf1'})

  let res = await request
    .delete('/friend/41bdf1')
    .expect(200)

  mock.done()
  t.pass()
})

/*
test('GET /secret-friend/:id/friends', async t => {
  let mock = SecretFriendServiceMock('friends', '55', [{_id: '2141'}])

  let res = await request
    .get('/secret-friend/55/friends')
    .expect(200)

  t.is(res.body[0]._id, '2141')
  mock.done()
})

test('POST /secret-friend/:id/friends', async t => {
  let friend = {name: 'nn'}
  let mock = SecretFriendServiceMock('addFriend', ['55', friend], [{_id: '2141'}])

  let res = await request
    .post('/secret-friend/55/friends')
    .send(friend)
    .expect(201)

  t.pass()
  mock.done()
})
*/