const InternalServerError = require('./internal-server-error')
const InvalidParamError = require('./invalid-param-error')
const MissingParamError = require('./missing-param-error')
const UnauthorazedError = require('./unauthorazedError-error')

module.exports = {
  InternalServerError,
  InvalidParamError,
  MissingParamError,
  UnauthorazedError
}
