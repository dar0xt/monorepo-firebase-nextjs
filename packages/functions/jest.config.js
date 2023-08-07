/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.test.ts'],
}
