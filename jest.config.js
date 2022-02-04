
module.exports = {

  clearMocks: true,
  testEnviroment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.js'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8'

}
