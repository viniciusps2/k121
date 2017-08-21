const Router = require('koa-router')
const Friend = require('./collection')
const FriendService = require('./service')

module.exports = new Router({prefix: '/friend'})

.get('/', async function (ctx) {
  let {secretFriend} = ctx.request.query
  ctx.body = await FriendService.findBySecretFriend(secretFriend)
})

.post('/', async function (ctx) {
  let {body} = ctx.request
  ctx.body = await FriendService.create(body)
  ctx.status = 201
})

.get('/:_id', async function (ctx) {
  let {_id} = ctx.params
  ctx.body = await FriendService.findById(_id)
})

.put('/:_id', async function (ctx) {
  let {_id} = ctx.params
  let {body} = ctx.request
  await Friend.update({_id}, body)
  ctx.status = 200
})

.delete('/:_id', async function (ctx) {
  let {_id} = ctx.params
  await FriendService.delete({_id})
  ctx.status = 200
})
