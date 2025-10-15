// 📄 eslint.config.js
import next from "eslint-config-next";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  ...next(),
  {
    ignores: ["node_modules", ".next", "dist"],
    plugins: { "jsx-a11y": jsxA11y },
    rules: {
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
      "@next/next/no-img-element": "off",
    },
  },
];
