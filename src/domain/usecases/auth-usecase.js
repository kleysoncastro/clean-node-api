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
    const user = await this.loadUserEmailRepository.load(email)
    if (!user) return null

    return null
  }
}

module.exports = AuthUseCase
