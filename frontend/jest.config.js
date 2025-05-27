// import type { Config } from 'jest';

// const config: Config = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
//   transform: {
//     '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
//   },
//   moduleNameMapper: {
//     '\\.(scss|css)$': 'identity-obj-proxy', // za importovanje SCSS modula
//     '^@/(.*)$': '<rootDir>/src/$1',         // alias za lakši import
//   },
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
//   testMatch: ['<rootDir>/src/**/*.(test|spec).{ts,tsx}'],
//   verbose: true,
// };

// export default config;

// const { createDefaultPreset } = require("ts-jest");

// const tsJestTransformCfg = createDefaultPreset().transform;

// /** @type {import("jest").Config} **/
// export default {
//   testEnvironment: "node",
//   transform: {
//     ...tsJestTransformCfg,
//   },
// };

// import { createDefaultPreset } from "ts-jest";
// const { transform } = createDefaultPreset();

export default {
  // testEnvironment: "node",
  preset: "ts-jest",
  // transform,
  testEnvironment: "jsdom",
  testMatch: ["**/tests/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
};

// module.exports = {
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
//   moduleNameMapper: {
//     "\\.(scss|sass|css)$": "identity-obj-proxy"
//   },
// };
