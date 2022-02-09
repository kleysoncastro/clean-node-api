const { MissingParamError } = require('../../utils/erros')

class AuthUseCase {
  constructor (loadUserEmailRepository) {
    this.loadUserEmailRepository = loadUserEmailRepository
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
    await this.loadUserEmailRepository.load(email)
  }
}

describe('Auth useCase', () => {
  test('Should throw if no email provider', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password provider', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserEmailRepository whith correct email', async () => {
    class LoadUserEmailRepositorySpy {
      async load (email) {
        this.email = email
      }
    }

    const loadUserEmailRepositorySpy = new LoadUserEmailRepositorySpy()

    const sut = new AuthUseCase(loadUserEmailRepositorySpy)
    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadUserEmailRepositorySpy.email).toBe('any_email@mail.com')
  })
})
