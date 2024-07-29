module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'inputBorderColor': '#A6A6A6',
        'theme': '#000',
        'buttonColor': '#F2DA31',
        'blackC': '#000',
      },
      display: ["group-hover"],
    },
  },
  plugins: [],
}