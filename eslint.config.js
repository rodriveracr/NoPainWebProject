import next from "eslint-config-next";
import jsxA11y from "eslint-plugin-jsx-a11y";

const config = [
  {
    ignores: ["node_modules", ".next", "dist", "public"],
  },
  ...next(),
  {
    plugins: { "jsx-a11y": jsxA11y },
    rules: {
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default config;