module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "/node_modules/",
    "\\.scss$",
    "assets/.*",
  ],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
    '\\.png$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./jest-setup.js']
};