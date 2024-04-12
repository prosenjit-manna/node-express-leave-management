import { Config } from '@jest/types';
import dotenv from 'dotenv';
dotenv.config();

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  testTimeout: 2 * 60 * 1000,
};

export default config;
