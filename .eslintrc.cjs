require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: ["next/core-web-vitals"],
  ignorePatterns: ["node_modules", ".next", "dist", "public"],
  rules: {
    "react/no-unescaped-entities": "off",
    "react/display-name": "off",
    "@next/next/no-img-element": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
