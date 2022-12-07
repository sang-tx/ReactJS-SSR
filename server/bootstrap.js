require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { esmodules: true }
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  plugins: ['@babel/plugin-transform-runtime']
})
const createServer = require('./server.ts').server

createServer().then((app) => {
  app.listen(3000, () => {
    /* eslint-disable no-console */
    console.log('HTTP server is running at http://localhost:3000')
  })
})
