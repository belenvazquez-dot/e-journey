/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        el: {
          // Backgrounds
          'bg-base':  '#0b0b0c',
          'bg-low':   '#151617',
          'bg-mid':   '#222325',
          'bg-high':  '#fbfbf9',
          // Content
          'content-high':   '#fbfbf9',
          'content-mid':    '#cececa',
          'content-low':    '#4a4b4f',
          'content-onhigh': '#151617',
          // Brand (mint)
          'brand-high': '#9cf3d3',
          'brand-mid':  '#00d486',
          'brand-low':  '#007a4d',
          // Mood → Purple
          'purple-high': '#e2c5ff',
          'purple-mid':  '#c27aff',
          'purple-low':  '#521f78',
          // CL → Blue
          'blue-high': '#99b6fc',
          'blue-mid':  '#385ef9',
          'blue-low':  '#0a1d66',
          // ED → Amber / Warning
          'amber-high':   '#fed685',
          'amber-mid':    '#ffa600',
          'amber-low':    '#6e300a',
          'amber-subtle': '#432004',
          'warning-high': '#ffdf20',
          'warning-low':  '#733e0a',
          // Semantic
          'negative-high': '#ff6467',
          'negative-low':  '#82181a',
          'positive-high': '#bbf451',
          'positive-low':  '#192e03',
        },
      },
    },
  },
  plugins: [],
};
