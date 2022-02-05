const UnauthorazedError = require('../erros/unauthorazedError-error')
const InternalServerError = require('../erros/internal-server-error')

module.exports = class HttpResponse {
  static badRequest (error) {
    return {
      statusCode: 400,
      body: error

    }
  }

  static internalServerError () {
    return {
      statusCode: 500,
      body: new InternalServerError()
    }
  }

  static unauthorazedError () {
    return {
      statusCode: 401,
      body: new UnauthorazedError()
    }
  }

  static ok (data) {
    return {
      statusCode: 200,
      body: data
    }
  }
}
