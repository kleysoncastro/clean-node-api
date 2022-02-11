const AuthUseCase = require('./auth-usecase')

const { MissingParamError } = require('../../utils/erros')

const makeEncrypter = () => {
  class EncrypterSpy {
    async compare (password, hashPassword) {
      this.password = password
      this.hashPassword = hashPassword
      return this.isValid
    }
  }
  const encryterSpay = new EncrypterSpy()
  encryterSpay.isValid = true
  return encryterSpay
}

const makeLoadUserByEmailRespository = () => {
  class LoadUserEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }

  const loadUserEmailRepositorySpy = new LoadUserEmailRepositorySpy()
  loadUserEmailRepositorySpy.user = {
    password: 'hashed_password'
  }
  return loadUserEmailRepositorySpy
}

const makeSut = () => {
  const encryterSpay = makeEncrypter()
  const loadUserEmailRepositorySpy = makeLoadUserByEmailRespository()

  const sut = new AuthUseCase(loadUserEmailRepositorySpy, encryterSpay)
  return {
    sut,
    loadUserEmailRepositorySpy,
    encryterSpay
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
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no loadUserEmailRepository has no load method', async () => {
    class LoadUserEmailRepositorySpy {}
    const sut = new AuthUseCase(LoadUserEmailRepositorySpy)
    const promise = sut.auth('any_email@mail.com', 'any_password')
    expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadUserEmailRepositorySpy return null', async () => {
    const { sut, loadUserEmailRepositorySpy } = makeSut()
    loadUserEmailRepositorySpy.user = null
    const accessToken = await sut.auth('invalid_email@mail.com', 'any_password')
    expect(accessToken).toBeNull()
  })

  test('Should return null if an invalid password is provider', async () => {
    const { sut, encryterSpay } = makeSut()
    encryterSpay.isValid = false
    const accessToken = await sut.auth('invalid_email@mail.com', 'any_password')
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct values', async () => {
    const { sut, loadUserEmailRepositorySpy, encryterSpay } = makeSut()
    await sut.auth('valid_email@mail.com', 'any_password')
    expect(encryterSpay.password).toBe('any_password')
    expect(encryterSpay.hashPassword).toBe(loadUserEmailRepositorySpy.user.password)
  })
})
