/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          lowest: '#000000',
          low: '#131313',
          DEFAULT: '#0e0e0e',
          container: '#1a1919',
          high: '#201f1f',
          highest: '#262626',
          variant: '#262626',
        },
        primary: {
          DEFAULT: '#a1faff',
          dim: '#00e5ee',
          container: '#00f4fe',
        },
        secondary: {
          DEFAULT: '#00fc40',
          dim: '#00ec3b',
          container: '#006e16',
        },
        tertiary: {
          DEFAULT: '#ac89ff',
          dim: '#874cff',
          container: '#7000ff',
        },
        on: {
          surface: '#ffffff',
          'surface-variant': '#adaaaa',
          primary: '#006165',
          secondary: '#005a10',
        },
        outline: {
          DEFAULT: '#777575',
          variant: '#494847',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'scanline': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px)',
      },
    },
  },
  plugins: [],
}
