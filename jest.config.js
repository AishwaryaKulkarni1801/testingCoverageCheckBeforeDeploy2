const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  
  // Test environment
  testEnvironment: 'jsdom',
  
  // Module name mapping for Angular imports
  moduleNameMapper: {
    // Handle Angular Material and other common module mapping issues
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub',
  },
  
  // File extensions and transform settings
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  
  // Transform files
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: 'tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  
  // Test file patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|js)',
    '<rootDir>/src/**/*.(spec|test).(ts|js)',
  ],
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],
  
  // Coverage configuration
  collectCoverage: false, // Set to true when running coverage
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!src/**/*.module.ts',
    '!src/**/environment*.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.stories.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary', 'json-summary', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Performance and behavior settings
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
  
  // Resolve modules
  resolver: undefined,
};