/** @type {import('tailwindcss').Config} */
module.exports = {
     content: [
          "./index.html",
          "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
          extend: {
               keyframes: {
                    scroll: {
                         '0%': { transform: 'translateX(0%)' },
                         '100%': { transform: 'translateX(-50%)' },
                    },
               },
               animation: {
                    scroll: 'scroll 30s linear infinite',
               },
               colors: {
                    blue: {
                         50: '#eff6ff',
                         100: '#dbeafe',
                         200: '#bfdbfe',
                         600: '#2563EB',
                         700: '#1E40AF',
                         800: '#1e3a8a',
                         900: '#1e293b',
                    },
               },
          },
     },
     plugins: [],
};
