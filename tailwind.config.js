module.exports = {
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_drafts/*.md',
    './_posts/*.md',
    './*.md',
    './*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        'head': ['Rubik', 'sans-serif'],
        'body': ['Roboto Mono', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
}
