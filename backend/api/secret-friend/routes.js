const Router = require('koa-router')
const SecretFriendService = require('./service')
const ShuffleService = require('./shuffle-service')

module.exports = new Router({prefix: '/secret-friend'})

.get('/:_id', async function (ctx) {
  let {_id} = ctx.params
  ctx.body = await SecretFriendService.findById(_id)
})

.post('/', async function (ctx) {
  let {body} = ctx.request
  ctx.body = await SecretFriendService.create(body)
  ctx.status = 201
})

.get('/:_id/shuffle', async function (ctx) {
  let {_id} = ctx.params
  ctx.body = await ShuffleService.shuffle(_id)
  ctx.status = 200
})
