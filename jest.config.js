module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.hbs$': 'jest-handlebars',
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/tests/setup.ts',
  ],
};
