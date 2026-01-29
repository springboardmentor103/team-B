/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
          soft: '#60a5fa',
          light: '#eff6ff',
        },
        secondary: {
          DEFAULT: '#0ea5e9',
          light: '#e0f2fe',
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        'bg-gradient': 'linear-gradient(180deg, #f0f9ff 0%, #dbeafe 100%)',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(37, 99, 235, 0.15)',
      },
      borderRadius: {
        'radius': '0.75rem',
        'radius-lg': '1rem',
      }
    },
  },
  plugins: [],
}

