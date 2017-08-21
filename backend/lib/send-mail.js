const assert = require('assert')
const {promisify} = require('util')
const {all} = require('bluebird')

const Sendgrid = require('sendgrid')

const {toArray, assignNew} = require('./helpers')
const env = require('../env')
const sendGrid = Sendgrid(env.sendGridApiKey)

const SendMail = {
  _sendGridSendAsync: promisify(sendGrid.send).bind(sendGrid),

  async send(mailData) {
    let emails = toArray(mailData.to)
    assert(emails.length, 'E-mail não encontrado')

    return await all(emails.map((to) => {
      return this._sendEach(assignNew(mailData, {to}))
    }))
  },

  async _sendEach(mailData) {
    mailData.from = mailData.from || env.defaultFromMail
    try {
      let res = await this._sendGridSendAsync(mailData)
      console.log(`Email with subject '${mailData.subject}' sent to ${mailData.to}`, res)
      return mailData
    } catch (error) {
      console.log('Failed to send email ', error.message)
      throw error
    }
  }
}

module.exports = SendMail
