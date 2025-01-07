/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'blue-aside': '#0a52b8e6',
      },
      boxShadow:{
        'navbar': '0 2px 5px rgba(0, 0, 0, 0.1)',
        'sidebar': '2px 0 5px rgba(0, 0, 0, 0.2)',
        'list': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

