const AuthUseCase = require('./auth-usecase')

const { MissingParamError, InvalidParamError } = require('../../utils/erros')

const makeSut = () => {
  class LoadUserEmailRepositorySpy {
    async load (email) {
      this.email = email
    }
  }

  const loadUserEmailRepositorySpy = new LoadUserEmailRepositorySpy()

  const sut = new AuthUseCase(loadUserEmailRepositorySpy)
  return {
    sut,
    loadUserEmailRepositorySpy
  }
}
describe('Auth useCase', () => {
  test('Should throw if no email provider', async () => {
    const { sut } = makeSut()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password provider', async () => {
    const { sut } = makeSut()
    const promise = sut.auth('any_email@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserEmailRepository whith correct email', async () => {
    const { sut, loadUserEmailRepositorySpy } = makeSut()
    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadUserEmailRepositorySpy.email).toBe('any_email@mail.com')
  })

  test('Should throw if no loadUserEmailRepository is provided', async () => {
    const sut = new AuthUseCase()

    const promise = sut.auth('any_email@mail.com', 'any_password')
    expect(promise).rejects.toThrow(new MissingParamError('loadUserEmailRepository'))
  })

  test('Should throw if no loadUserEmailRepository has no load method', async () => {
    class LoadUserEmailRepositorySpy {}
    const sut = new AuthUseCase(LoadUserEmailRepositorySpy)
    const promise = sut.auth('any_email@mail.com', 'any_password')
    expect(promise).rejects.toThrow(new InvalidParamError('loadUserEmailRepository'))
  })

  test('Should return null if LoadUserEmailRepositorySpy return null', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('invalid_email@mail.com', 'any_password')
    expect(accessToken).toBeNull()
  })
})
