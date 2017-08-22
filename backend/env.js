const env = {}

env.nodeEnv = process.env.NODE_ENV

env.port = process.env.PORT || 3000

env.prefixForTest = env.nodeEnv === 'test'
  ? Math.random().toString(16).slice(-4) + '_'
  : ''

env.mongoDbUrl = process.env.SECRETFRIEND_MONGODB || process.env.MONGOLAB_URI

env.sendGridApiKey = process.env.SENDGRID_API_KEY

env.defaultFromMail = 'contato@secretfriend.com'

module.exports = env
