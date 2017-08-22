const Router = require('koa-router')

module.exports = new Router({prefix: '/'})

.get('/', async function (ctx) {
  ctx.body = 'Secret Friend API'
})
