import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: {
            DEFAULT: 'rgb(108, 25, 29)',
            50: 'rgb(248, 235, 236)',
            100: 'rgb(241, 215, 217)',
            200: 'rgb(228, 175, 179)',
            300: 'rgb(215, 135, 141)',
            400: 'rgb(202, 95, 103)',
            500: 'rgb(189, 55, 65)',
            600: 'rgb(151, 44, 52)',
            700: 'rgb(108, 25, 29)',
            800: 'rgb(86, 20, 23)',
            900: 'rgb(65, 15, 17)',
          },
          copper: {
            DEFAULT: 'rgb(184, 115, 51)',
            50: 'rgb(251, 246, 240)',
            100: 'rgb(247, 237, 225)',
            200: 'rgb(239, 220, 195)',
            300: 'rgb(231, 202, 165)',
            400: 'rgb(223, 185, 135)',
            500: 'rgb(215, 167, 105)',
            600: 'rgb(207, 150, 75)',
            700: 'rgb(184, 115, 51)',
            800: 'rgb(147, 92, 41)',
            900: 'rgb(110, 69, 31)',
          },
          neutral: {
            light: 'rgb(241, 237, 237)',
            lighter: 'rgb(247, 243, 239)',
            dark: 'rgb(78, 67, 67)',
            border: 'rgb(200, 190, 191)',
            '700': 'rgb(119, 105, 106)',
            '800': 'rgb(78, 67, 67)',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
