const test = require('ava')
const supertest = require('supertest')

const {createMockFor} = require('../../helpers')

const app = require('../../../app')
const request = supertest(app.listen())

const SecretFriendService = require('../../../api/secret-friend/service')
const ShuffleService = require('../../../api/secret-friend/shuffle-service')

const SecretFriendServiceMock = createMockFor(SecretFriendService)
const ShuffleServiceMock = createMockFor(ShuffleService)

test('POST /secret-friend', async t => {
  let body = {title: 'test title'}

  let mock = SecretFriendServiceMock('create', [body], {_id: '2141'})

  let res = await request
    .post('/secret-friend')
    .send(body)
    .expect(201)

  t.is(res.body._id, '2141')
  mock.done()
})

test('GET /secret-friend/:id', async t => {
  let mock = SecretFriendServiceMock('findById', '55', {_id: '2141'})

  let res = await request
    .get('/secret-friend/55')
    .expect(200)

  t.is(res.body._id, '2141')
  mock.done()
})

test('GET /secret-friend/:id/shuffle', async t => {
  let mock = ShuffleServiceMock('shuffle', '55', [{_id: '2141'}])

  let res = await request
    .get('/secret-friend/55/shuffle')
    .expect(200)

  t.is(res.body[0]._id, '2141')
  mock.done()
})
