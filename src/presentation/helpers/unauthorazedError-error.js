module.exports = class UnauthorazedError extends Error {
  constructor (paramName) {
    super('You not authorizade')
    this.name = 'UnauthorazedError'
  }
}
