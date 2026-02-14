/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Soft pastel palette — warm dashboard
        main: '#FBF9F6',
        secondary: '#F5F1EB',
        sidebar: '#F0EBE3',
        'panel-right': '#F7F4EF',
        // Accents
        'muted-orange': '#E8C4B0',
        'warm-beige': '#DDD4C8',
        'sage': '#A8B5A0',
        'dusty-blue': '#A8B8C4',
        'lavender': '#C4B8CC',
        // UI
        'btn-primary': '#A8B5A0',
        'mood-hover': '#B8C4B0',
        'card-tint-reset': '#E8EDE4',
        'card-tint-move': '#E8E4E0',
        'card-tint-pause': '#E4E8ED',
        'card-tint-focus': '#EDE8E4',
        'card-tint-create': '#EDE4E8',
        'card-tint-relax': '#E4EDE8',
        charcoal: '#3D3A36',
        'charcoal-muted': '#6B6560',
        // Dark mode (evening)
        'dm-bg': '#2A2826',
        'dm-soft': '#353330',
        'dm-sidebar': '#2F2D2A',
        'dm-panel': '#322F2C',
        'dm-text': '#E8E4DF',
        'dm-muted': '#A89F96',
        cream: '#faf8f5',
        stone: '#e8e2d9',
        warm: '#d4c4b0',
        soft: '#3d3e35',
      },
      borderRadius: {
        'card': '1.5rem',
        'card-lg': '1.75rem',
        'pill': '9999px',
      },
      boxShadow: {
        soft: '0 2px 12px -2px rgba(61, 58, 54, 0.04)',
        softer: '0 4px 20px -4px rgba(61, 58, 54, 0.06)',
        card: '0 2px 16px -4px rgba(61, 58, 54, 0.05)',
        lift: '0 8px 24px -8px rgba(61, 58, 54, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-slow': 'fadeIn 0.7s ease-out forwards',
        'icon-fade': 'iconFade 0.25s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        iconFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
