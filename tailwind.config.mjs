/** @type {import('tailwindcss').Config} */
import typographyPlugin from "@tailwindcss/typography";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              textDecoration: "none",
            },
            // more custom typography here
          },
        },
      },

      fontFamily: {
        montreal: ["PPNeueMontreal", "sans-serif"],
        editorial: ["PPEditorialNew", "serif"],
      },

      fontSize: {
        h1: "2.25rem",
        h2: "1.75rem",
        h3: "1.375rem",
        h4: "1.125rem",
        h5: "1rem",
        h6: "0.875rem",
      },

      colors: {
        mainblue: "#0D85DB",
        fullgrey: "#49505D",
        darkgrey: "#6C727C",
        almostwhite: "#F8F8F9",
        midgrey: "#DDDDDD",
        lightgrey: "#F5F5F5",
        fullwhite: "#FFFFFF",
      },

      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },

      animation: {
        marquee: "marquee 10s linear infinite",
      },
    },
  },
  plugins: [
    typographyPlugin,
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};

export default config;
