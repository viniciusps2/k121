const env = require('../env')

const mongoose = require('mongoose')
mongoose.Promise = Promise

const config = {
  test: 'mongodb://localhost/secretfriend_test',
  development: 'mongodb://localhost/secretfriend_dev',
  production: env.mongoDbUrl
}

const connection = mongoose.createConnection(config[env.nodeEnv])
  .once('open', () => console.info('Started mongoose connection'))
  .on('error', (err) => console.error('Failed on mongoose', err))
  .on('disconnected', () => console.error(`Mongoose connection disconnected`))

process.on('SIGINT', () => connection.close(() => process.exit(0)))

const mongoDbManager = {
  models: [],

  createModel(modelName, schema) {
    let collectionName = env.prefixForTest + modelName
    let model = connection.model(modelName, schema, collectionName)
    this.models.push(model)
    return model
  },

  async afterCleanup() {
    await this.models.map((model) => {
      let dropRes = model.collection.drop()
      return dropRes && dropRes.catch(() => null)
    })
  }
}

module.exports = mongoDbManager
