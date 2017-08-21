module.exports = function () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      console.log('Error:', error)
      ctx.status = error.status || 500
      ctx.body = {
        message: error.message,
        status: 'ERROR'
      }
    }
  }
}
