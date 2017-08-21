const test = require('ava')

const {createMockFor} = require('../helpers')
const env = require('../../env')

const SendMail = require('../../lib/send-mail')

const SendMailMock = createMockFor(SendMail)

test('.send: should send', async t => {
  let mock = SendMailMock('_sendGridSendAsync', SendGridData(), {name: 'nn'})

  let res = await SendMail.send(MailData())
  mock.done()
  t.is(res[0].text, 'abc 123')
})

test('.send: when sendgrid error should throws', async t => {
  let mock = SendMailMock('_sendGridSendAsync', SendGridData(), null, {throws: Error})

  await t.throws(SendMail.send(MailData()))
  mock.done()
})

const MailData = () => ({
  to: ['a@a.com'],
  text: 'abc 123'
})

const SendGridData = () => ({
  from: env.defaultFromMail,
  to: 'a@a.com',
  text: 'abc 123'
})