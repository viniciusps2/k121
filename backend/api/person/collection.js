const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = mongoose.Types

const Person = Schema({
  name: String,
  email: String,
  friend: ObjectId
})

module.exports = mongoose.model('Person', Person)
