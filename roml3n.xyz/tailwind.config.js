module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montreal: ["PPNeueMontreal", "sans-serif"],
        editorial: ["PPEditorialNew", "serif"],
      },

      fontSize: {
        h1: "2.5rem",
        h2: "2rem",
        h3: "1.75rem",
        h4: "1.5rem",
        h5: "1.25rem",
        h6: "1rem",
      },

      colors: {
        mainblue: "#0D85DB",
        fullgrey: "#49505D",
        darkgrey: "#6C727C",
        almostwhite: "#F8F8F9",
        midgrey: "#DDDDDD",
        lightgrey: "#F5F5F5",
        fullwhite: "FFFFFF",
      },
    },
  },
  plugins: [],
};
