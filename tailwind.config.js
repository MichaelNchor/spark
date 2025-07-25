/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#E94057",
        accent: "#FF5DA2",
        secondary: "#2C3E50",
        background: "#F6E8FF",
        white: "#FFFFFF"
      },
      fontFamily: {
        'poppins-regular': ['Poppins-Regular', 'sans-serif'],
        'poppins-thin': ['Poppins-Thin', 'sans-serif'],
        'poppins-light': ['Poppins-Light', 'sans-serif'],
        'poppins-medium': ['Poppins-Medium', 'sans-serif'],
        'poppins-semibold': ['Poppins-SemiBold', 'sans-serif'],
        'poppins-bold': ['Poppins-Bold', 'sans-serif'],
        'poppins-extrabold': ['Poppins-ExtraBold', 'sans-serif'],
        'poppins-black': ['Poppins-Black', 'sans-serif'],
        'poppins-italic': ['Poppins-Italic', 'sans-serif'],
        'poppins-thin-italic': ['Poppins-ThinItalic', 'sans-serif'],
        'poppins-light-italic': ['Poppins-LightItalic', 'sans-serif'],
        'poppins-medium-italic': ['Poppins-MediumItalic', 'sans-serif'],
        'poppins-semibold-italic': ['Poppins-SemiBoldItalic', 'sans-serif'],
        'poppins-bold-italic': ['Poppins-BoldItalic', 'sans-serif'],
        'poppins-extrabold-italic': ['Poppins-ExtraBoldItalic', 'sans-serif'],
        'poppins-black-italic': ['Poppins-BlackItalic', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
