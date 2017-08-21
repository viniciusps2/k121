const test = require('ava')
const {afterCleanup} = require('../../helpers')

const SecretFriend = require('../../../api/secret-friend/collection')

afterCleanup()

test('should save', async t => {
  let body = {
  	title: 'test title'
  }

  let saved = await SecretFriend.create(body)
  t.is(saved.title, 'test title')
})
