const MissingParamError = require('./missing-param-error')
const UnauthorazedError = require('./unauthorazedError-error')

module.exports = class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)

    }
  }

  static internalServerError () {
    return { statusCode: 500 }
  }

  static unauthorazedError () {
    return {
      statusCode: 401,
      body: new UnauthorazedError()
    }
  }
}
