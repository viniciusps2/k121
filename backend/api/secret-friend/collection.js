const mongoose = require('mongoose')
const db = require('../../lib/mongodb')

const {Schema} = mongoose
const {ObjectId} = Schema.Types

const SecretFriend = Schema({
  title: {type: String, required: [true, 'O nome é obrigatório']},
  shuffled: Boolean
})

module.exports = db.createModel('SecretFriend', SecretFriend)
