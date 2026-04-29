/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        el: {
          // Backgrounds
          'bg-base': '#0b0b0c',
          'bg-low': '#151617',
          'bg-mid': '#222325',
          'bg-high': '#fbfbf9',
          // Content (text)
          'content-high': '#fbfbf9',
          'content-mid': '#cececa',
          'content-low': '#4a4b4f',
          'content-onhigh': '#151617',
          // Brand (mint)
          'brand-high': '#9cf3d3',
          'brand-mid': '#00d486',
          'brand-low': '#007a4d',
          // Semantic
          'negative-high': '#ff6467',
          'negative-low': '#82181a',
          'positive-high': '#bbf451',
          'positive-low': '#192e03',
          'warning-high': '#ffdf20',
          'warning-low': '#733e0a',
          'warning-subtle': '#432004',
          'orange-high': '#fed685',
          'orange-low': '#6e300a',
          'blue-high': '#99b6fc',
          'blue-mid': '#385ef9',
          'blue-low': '#0a1d66',
          'lime-high': '#9cf3d3',
          'lime-low': '#034c31',
        },
      },
    },
  },
  plugins: [],
};
