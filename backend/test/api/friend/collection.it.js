const test = require('ava')
const {afterCleanup} = require('../../helpers')

const Friend = require('../../../api/friend/collection')

afterCleanup()

test('should save', async t => {
  let body = {
  	name: 'test name',
  	email: 'k@k.com'
  }

  let saved = await Friend.create(body)
  t.is(saved.name, 'test name')
})
