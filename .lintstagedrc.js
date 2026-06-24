// @ts-nocheck
const path = require('path');

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(' ')}`;

module.exports = {
  // archivos de código: lintar con ESLint y formatear con Prettier
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],

  // otros archivos: solo formatear con Prettier
  '*.{json,css,scss,md}': ['prettier --write'],
};
