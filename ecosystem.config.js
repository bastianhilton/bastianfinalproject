// the PM2 ecosystem.config.js needs to use module.exports
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  apps: [
    {
      name: 'Meeovi',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
    },
  ],
};
