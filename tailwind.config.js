/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16a34a',
          dark: '#34d399',
        },
        secondary: {
          DEFAULT: '#7ea58d',
          dark: '#9acdad',
        },
        background: {
          primary: '#ffffff',
          secondary: '#f0fdf4',
          'primary-dark': '#111827',
          'secondary-dark': '#1f2937',
        },
        text: {
          DEFAULT: '#1c1c1c',
          sub: '#6b7280',
          'sub-dark': '#9ca3af',
        },
        border: {
          DEFAULT: '#dee2e7',
        },
        black: '#000000',
        white: '#FFFFFF',
        gray: '#171717',
      },
      fontFamily: {
        sans: ['var(--font-manrope)'],
      },
    },
  },
  plugins: [
    // Add any Tailwind plugins here
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
  ],
}
