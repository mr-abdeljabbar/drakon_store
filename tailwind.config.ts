import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#e6c364',
          dark: '#b8943a',
          muted: '#9a7a35',
        },
        surface: {
          base: '#0c0f0f',
          DEFAULT: '#121414',
          low: '#1a1c1c',
          mid: '#1e2020',
          high: '#282a2b',
          highest: '#333535',
          bright: '#38393a',
        },
        drakon: {
          text: '#e2e2e2',
          muted: '#d0c5b2',
          border: '#4d4637',
          outline: '#99907e',
        },
      },
      fontFamily: {
        cairo: ['var(--font-cairo)', 'sans-serif'],
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
      },
    },
  },
  plugins: [],
}

export default config
