module.exports = class InternalServerError extends Error {
  constructor (paramName) {
    super('Internal Server Error, tray agan')
    this.name = 'InternalServerError'
  }
}
