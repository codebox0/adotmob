/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',

  // Automatically clear mock calls and instances between every test.
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test.
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should
  // be collected.
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],

  // The directory where Jest should output its coverage files.
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skùip coverage collection.
  coveragePathIgnorePatterns: ['/node_modules/'],

  // A list of reporter names that Jest uses when writing coverage reports.
  coverageReporters: ['json', 'text', 'lcov', 'clover', 'html'],


  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',

  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  testTimeout: 90000,

  testEnvironment: 'node',
};