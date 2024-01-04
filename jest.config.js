require('dotenv').config({ path: '.env.test' });
module.exports = {
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
  setupFilesAfterEnv: ['./jest.setup.js'],
};