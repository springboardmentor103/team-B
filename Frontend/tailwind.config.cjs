module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        // Define what 'radius' actually is. 
        // 'rounded-radius' will now map to 8px (or whatever you choose)
        'radius': '0.5rem', // 8px
      },
      colors: {
        primary: {
          light: '#dbeafe', // Fixes your previous error
          DEFAULT: '#3b82f6',
          dark: '#1d4ed8',
          authFrom: "#fdedd9",
        authTo: "#d1dbfa",
        },
      }
    },
  },
  plugins: [],
};
