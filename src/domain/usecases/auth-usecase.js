const { MissingParamError } = require('../../utils/erros')

class AuthUseCase {
  constructor (loadUserEmailRepository, encrypter) {
    this.loadUserEmailRepository = loadUserEmailRepository
    this.encrypter = encrypter
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
    const user = await this.loadUserEmailRepository.load(email)
    if (!user) return null

    this.encrypter.compare(password, user.password)

    return null
  }
}

module.exports = AuthUseCase
