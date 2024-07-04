module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '\\.(lottie)$': '<rootDir>/jest/__mocks__/lottieMock.js',
  },
};
