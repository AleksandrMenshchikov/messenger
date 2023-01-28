module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.hbs$': 'jest-handlebars',
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
};
