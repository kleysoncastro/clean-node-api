class HttpResponse {
  static badRequest () {
    return { statusCode: 400 }
  }

  static internalServerError () {
    return { statusCode: 500 }
  }
}

class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) return HttpResponse.internalServerError()
    const { email, password } = httpRequest.body
    if (!email || !password) {
      return HttpResponse.badRequest()
    }
  }
}

describe('Login Router', () => {
  test('Should return 400 is no email provider', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 is no password provider', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 500 is no httpRequest provider', () => {
    const sut = new LoginRouter()

    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 is no body provider', () => {
    const sut = new LoginRouter()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})
