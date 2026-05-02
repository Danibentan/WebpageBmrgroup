import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1c3551",
          elevated: "#264564",
          deep: "#142b44"
        }
      }
    }
  },
  plugins: []
};

export default config;
