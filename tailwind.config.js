export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: {
          light: '#eff6ff',
          DEFAULT: '#3b82f6',
          dark: '#1e40af',
        },
      },
      boxShadow: {
        glowing: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
