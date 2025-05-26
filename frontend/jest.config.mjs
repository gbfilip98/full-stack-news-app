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
  testMatch: ["**/jest/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest/setupTests.ts"],
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
