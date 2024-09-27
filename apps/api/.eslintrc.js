/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "next/typescript"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules:{
    "@typescript-eslint/no-explicit-any": "off"
  }
};
