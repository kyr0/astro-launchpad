import animate from 'tailwindcss-animate'
import daisyui from 'daisyui'

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '../../node_modules/flowbite/**/*.js',
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#a3e635',
          secondary: '#0c4a6e',
          accent: '#a21caf',
          neutral: '#4b5563',
          'base-100': '#111827',
          info: '#7dd3fc',
          success: '#bef264',
          warning: '#fde047',
          error: '#dc2626',
        },
      },
    ],
  },
  // make sure to safelist these classes when using purge
  safelist: [
    'w-64',
    'w-1/2',
    'rounded-l-lg',
    'rounded-r-lg',
    'bg-gray-200',
    'grid-cols-4',
    'grid-cols-7',
    'h-6',
    'leading-6',
    'h-9',
    'leading-9',
    'shadow-lg',
  ],
  theme: {
    extend: {
      // extend base Tailwind CSS utility classes
    },
  },
  plugins: [daisyui, animate],
}
