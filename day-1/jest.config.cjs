module.exports = {
  testEnvironment: 'jsdom',
  transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
  moduleFileExtensions: ['js', 'jsx'],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)']
};
