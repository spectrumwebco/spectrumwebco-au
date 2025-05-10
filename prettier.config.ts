import type { Options } from 'prettier';

const config: Options = {
  singleQuote: true,
  semi: false,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/styles/tailwind.css',
};

export default config;