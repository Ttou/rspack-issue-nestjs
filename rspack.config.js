const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin')
const { defineConfig } = require('@rspack/cli')

module.exports = defineConfig({
  context: __dirname,
  target: 'node',
  entry: {
    main: ['webpack/hot/poll?100', './src/main.ts']
  },
  optimization: {
    minimize: false
  },
  externalsType: 'commonjs',
  plugins: [
    new RunScriptWebpackPlugin({
      name: 'main.js',
      autoRestart: false
    })
  ],
  devServer: {
    devMiddleware: {
      writeToDisk: true
    }
  },
  externals: [
    function (obj, callback) {
      const resource = obj.request
      const lazyImports = [
        '@nestjs/core',
        '@nestjs/platform-express',
        '@nestjs/microservices',
        '@nestjs/microservices/microservices-module',
        '@nestjs/websockets',
        '@nestjs/websockets/socket-module',
        'cache-manager',
        'class-validator',
        'class-transformer',
        'class-transformer/storage'
      ]
      if (!lazyImports.includes(resource)) {
        return callback()
      }
      try {
        require.resolve(resource)
      } catch (err) {
        callback(null, resource)
      }
      callback()
    }
  ]
})
