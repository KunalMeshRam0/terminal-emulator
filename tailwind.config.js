/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        terminal: {
          bg: '#000000',
          text: '#ffffff',
          prompt: '#00ff00',
          error: '#ff4444',
          success: '#00ff00',
        }
      }
    },
  },
  plugins: [],
};