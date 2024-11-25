module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(css|scss|svg|jpg|jpeg|png|gif|webp|mp4)$': 'jest-transform-stub',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['/node_modules/', '\\.scss$', 'assets/.*'],
  moduleNameMapper: {
    '\\.(css|scss|svg|jpg|jpeg|png|gif|webp|mp4)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['./jest-setup.js'],
};
