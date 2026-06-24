import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    settings: {
      react: {
        version: '19.2',
      },
    },
    rules: {
      'react-hooks/exhaustive-deps': 'off',
    },
  },
  // Desactivar las reglas de formato de ESLint que entran en conflicto con Prettier.
  // Debe ir al final para que anule las reglas previas.
  prettier,
  // Anular las exclusiones predeterminadas de eslint-config-next
  globalIgnores([
    // Exclusiones predeterminadas de eslint-config-next
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',

    // archivos de configuración que usan CommonJS (require/module.exports)
    '.lintstagedrc.js',
  ]),
]);

export default eslintConfig;
