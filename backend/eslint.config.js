import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import process from "node:process";

export default [
  // ESLint base rules
  js.configs.recommended,

  // TypeScript plugin and recommended rules
  ...tseslint.configs.recommended,

  {
    ignores: ["dist/**"], // <-- This tells ESLint to ignore /dist
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
        sourceType: "module",
      },
      globals: {
        ...globals.node, // Node.js global variables
      },
    },
    rules: {
      // Example rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
