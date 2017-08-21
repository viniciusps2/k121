module.exports = {
  assignNew: (...val) => Object.assign({}, ...val),
  toArray: (val) => val instanceof Array ? val : val ? [val] : []
}