import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#223D5A",
          elevated: "#2C4A6B",
          deep: "#182E47"
        }
      }
    }
  },
  plugins: []
};

export default config;
