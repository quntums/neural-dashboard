/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{svelte,js,ts}'],
  theme: {
    extend: {
      colors: {
        lab: {
          bg: '#0a0a0b',
          panel: '#111113',
          border: '#1f1f23',
          text: '#e4e4e7',
          muted: '#71717a',
          accent: '#3b82f6'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono','ui-monospace','SFMono-Regular','monospace']
      }
    },
  },
  plugins: [],
}
