const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = Schema.Types

const db = require('../../lib/mongodb')

const Friend = Schema({
  name: {type: String, required: [true, 'O nome é obrigatório']},
  email: {type: String, required: [true, 'O e-mail é obrigatório']},
  secretFriend: {type: ObjectId, ref: 'SecretFriend'},
  shouldToGift: {type: ObjectId, ref: 'Friend'},
})

Friend.index({
  secretFriend: 1,
  email: 1
}, {name: 'email_idx', unique: true})

module.exports = db.createModel('Friend', Friend)
