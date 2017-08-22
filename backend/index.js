const app = require('./app')
const env = require('./env')

app.listen(env.port, () => {
  console.log(`Listening port ${env.port}`)
})
