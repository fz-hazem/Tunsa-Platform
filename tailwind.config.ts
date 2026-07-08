import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "space-navy": "#0a0e27",
        "space-navy-light": "#131a3d",
        "space-cyan": "#22d3ee",
        "space-cyan-dark": "#0891b2",
        "space-gold": "#fbbf24",
      },
      backgroundImage: {
        "space-gradient":
          "radial-gradient(ellipse at top, #131a3d 0%, #0a0e27 60%, #050714 100%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;