const Koa = require('koa')
const app = new Koa()


.use(require('koa-bodyparser')())
.use(require('koa-logger')())
.use(require('kcors')({
  methods: ['POST', 'GET', 'PUT', 'DELETE']
}))

.use(require('./lib/handle-error')())
.use(require('./api/friend/routes').routes())
.use(require('./api/secret-friend/routes').routes())
// .use(router.allowedMethods())

module.exports = app
