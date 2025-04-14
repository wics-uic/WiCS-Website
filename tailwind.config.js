/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"], // Ensure Astro files are scanned
    theme: {
      extend: {
        fontFamily: {
          sans: ["Lora", "sans-serif"],
          serif: ["Raleway", "serif"],
        },
      },
    },
    plugins: [],
  };
  