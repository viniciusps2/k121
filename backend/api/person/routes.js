const Router = require('koa-router')
module.exports = new Router({prefix: '/person'})

.get('/', async function (ctx, next) {
  ctx.body = await Promise.resolve('test')
})
