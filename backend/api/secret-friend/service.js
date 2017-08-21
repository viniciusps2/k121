const assert = require('assert')
const SecretFriend = require('./collection')

const SecretFriendService = {
  async create(secretFriendReq) {
    let secretFriend = new SecretFriend(secretFriendReq)
    await secretFriend.save()
    return secretFriend
  },

  async findById(_id) {
    let secretFriend = await SecretFriend.findOne({_id})
    assert(secretFriend, 'Secret Friend Not found')
    return secretFriend
  }
}

module.exports = SecretFriendService
