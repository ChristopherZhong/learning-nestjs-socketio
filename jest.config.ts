import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

const config: Config.InitialOptions = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  coverageReporters: defaults.coverageReporters.concat('cobertura'),
  coverageThreshold: {
    global: {
      statements: 85,
    },
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  reporters: ['default', 'jest-junit'],
  rootDir: 'src',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
export default config;
