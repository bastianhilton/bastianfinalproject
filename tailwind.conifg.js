module.exports = {
    content: ['components/**/*.{vue,js}', 'pages/**/*.vue', './node_modules/@morpheme/**/src/**/*.{vue,js,ts,jsx,tsx,css}'],
    presets: [require('@morpheme/tailwind-config/preset')],
  }