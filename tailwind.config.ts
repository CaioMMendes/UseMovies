import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-1": "#a1cca5",
        "primary-2": "#8fb996",
        "primary-3": "rgb(112 151 117)",
        "primary-3-opacity": "#618666",
        "primary-4": "#415d43",
        "primary-5": "#111d13",
      },
    },
  },
  plugins: [],
};
export default config;
