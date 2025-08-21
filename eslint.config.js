import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";

export default [
  {
    ignores: [
      ".*",
      "**/.*",
      "*.d.ts",
      "**/*.d.ts",
      "node_modules",
      "dist",
      "**/node_modules",
      "**/dist"
    ],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: ["node_modules", "dist", "build"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
];
