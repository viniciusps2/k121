const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = mongoose.Types

const SecretFriend = Schema({
  code: String,
  responsible: ObjectId,
  sortedAt: Date
})

module.exports = mongoose.model('SecretFriend', SecretFriend)
