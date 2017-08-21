const assert = require('assert')
const Friend = require('../friend/collection')
const SecretFriendService = require('../secret-friend/service')

const FriendService = {
  async create (friendData) {
    try {
      let secretFriend = await SecretFriendService.findById(friendData.secretFriend)
      let friend = await Friend.create(friendData)

      assert(secretFriend.shuffled !== true,
        'O sorteio já foi realizado, não é possível adicionar mais pessoas.')

      return {_id: friend._id}
    } catch (error) {
      if (~error.message.indexOf('email_idx dup key')) {
        throw new Error('Já existe outra pessoa nesta lista com o mesmo e-mail.')
      }
      throw error
    }
  },

  async findById (_id) {
    let friend = await Friend.findOne({_id})
    assert(friend, 'Friend Not found')

    return friend
  },

  async findBySecretFriend (secretFriendId) {
    assert(secretFriendId, 'Amigo secreto inválido')
    return await Friend.find({secretFriend: secretFriendId})
  },

  async delete (_id) {
    let res = await Friend.remove({_id})
    assert(res.result.n, 'Friend Not found')
  }
}

module.exports = FriendService
