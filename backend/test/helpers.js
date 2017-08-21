const test = require('ava')
const sinon = require('sinon')
const {toArray} = require('../lib/helpers')

test('helpers enabled', (t) => t.pass())

module.exports = {
  createMockFor(obj) {
    let mock = sinon.mock(obj)
    let expectsCount = 0

    return (method, withArgs, result, opts = {}) => {
      let expectation = mock.expects(method)
      withArgs = toArray(withArgs)
      expectsCount++

      if (withArgs.length) expectation.withArgs(... withArgs)

      if (opts.throws) {
        expectation.throws(opts.throws)
      } else {
        expectation.returns(Promise.resolve(result))
      }

      expectation
        .atLeast(opts.atLeast || 1)
        .atMost(opts.atMost || 1)

      const done = () => {
        expectation.verify()
        if (--expectsCount === 0) {
          mock.restore()
        }
      }
      return {done}
    }
  },

  allMocksDone(mocks) {
    mocks.forEach((mock) => mock.done())
  },

  afterCleanup() {
    test.after.always('cleanup', t => {
      return require('../lib/mongodb').afterCleanup()
    })
  }
}
