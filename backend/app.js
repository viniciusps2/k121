const Koa = require('koa')
const app = new Koa()

.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

.use(require('./api/person/routes').routes())
// .use(router.allowedMethods())

module.exports = app