module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kolas: "#533278",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
}
