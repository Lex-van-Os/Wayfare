module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-console": "warn",
    "prefer-const": "error",
    "arrow-body-style": ["error", "as-needed"],
    "prefer-arrow-callback": "error",
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    "newline-before-return": "error",
    "newline-after-var": ["error", "always"],
    "eol-last": ["error", "always"],
    "quote-props": ["error", "consistent-as-needed"],
    semi: ["error", "always"],
  },
};
