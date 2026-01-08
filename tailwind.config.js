export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".transition-smooth": {
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      })
    },
  ],
}
