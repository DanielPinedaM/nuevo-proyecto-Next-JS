import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    settings: {
      react: {
        version: "19.2",
      },
    },
    rules: {
      "react-hooks/exhaustive-deps": "off",
    },
  },
  // Anular las exclusiones predeterminadas de eslint-config-next
  globalIgnores([
    // Exclusiones predeterminadas de eslint-config-next
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
