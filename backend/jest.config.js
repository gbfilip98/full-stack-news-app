// const { createDefaultPreset } = require("ts-jest");

// const tsJestTransformCfg = createDefaultPreset().transform;

// /** @type {import("jest").Config} **/
// export default {
//   testEnvironment: "node",
//   transform: {
//     ...tsJestTransformCfg,
//   },
// };

// import { jestConfig } from "ts-jest";

export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest",
  // },
  // globals: {
  //   "ts-jest": {
  //     useESM: true,
  //     tsconfig: "./tsconfig.json",
  //   },
  // },
  globals: {
    "ts-jest": {
      useESM: true,
      isolatedModules: true,
    },
  },
};
