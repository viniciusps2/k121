const assert = require('assert')
const {shuffle} = require('lodash/fp')

const FriendService = require('../friend/service')
const SecretFriendService = require('../secret-friend/service')
const SendMail = require('../../lib/send-mail')

const ShuffleService = {
  async shuffle(_id) {
    let secretFriend = await SecretFriendService.findById(_id)
    let friends = await FriendService.findBySecretFriend(_id)
    this.verify(friends, secretFriend)

    let shuffled = shuffle(friends)

    await this.sendMailAndSave(shuffled)

    secretFriend.shuffled = true
    await secretFriend.save()

    return shuffled
  },

  verify(friends, secretFriend) {
    assert(friends.length && friends.length % 2 === 0,
      'Para realizar o sorteio é necessário que o total de integrantes seja par.')

    assert(secretFriend.shuffled !== true,
      'Já foi realizado o sorteio deste amigo secreto.')
  },

  async sendMailAndSave(shuffled) {
    await shuffled.map(async (current, index) => {
      let next = shuffled[index + 1] || shuffled[0]
      current.shouldToGift = next._id
      await current.save()
      await this.sendMail(current, next)
    })
  },

  async sendMail(friend, shouldToGift) {
    await SendMail.send({
      to: friend.email,
      subject: 'Sorteio do amigo secreto',
      text: `${friend.name}, \n\n Já foi realizado o sorteio, e você deve presentear ${shouldToGift.name}.`
    })
  }
}

module.exports = ShuffleService
