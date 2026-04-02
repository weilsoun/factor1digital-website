module.exports = {
  apps: [
    {
      name: 'factor1digital-dev',
      script: 'node_modules/.bin/nuxt',
      args: 'dev --host 0.0.0.0 --port 3100',
      cwd: '/var/www/factor1digital',
      interpreter: 'none',
      env: {
        NODE_ENV: 'development',
      },
      watch: false,
    },
  ],
}
