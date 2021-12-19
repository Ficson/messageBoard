const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  lintOnSave: false,
  publicPath: process.env.VUE_APP_RESOURCE_URL,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  devServer: {
    proxy: 'http://127.0.0.1:8889',
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'proxy') config.devtool = 'source-map'
  },
  chainWebpack(config) {
    /**
     * svg
     */
    config.module.rule('svg').uses.clear() // 清除默认的file-loader
    config.module.rule('svg').include.add(resolve('src/icons')).end().use('svg-sprite-loader').loader('svg-sprite-loader').options({
      symbolId: 'icon-[name]',
    })

    /**
     * html-webpack-plugin
     */
    config.plugin('html').tap(args => {
      args[0].title = '留言板'
      args[0].meta = {
        viewport: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no',
        'X-UA-Compatible': {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge',
        },
        'Cache-Control': {
          'http-equiv': 'Cache-Control',
          content: 'no-cache, no-store, must-revalidate',
        },
        Pragma: {
          'http-equiv': 'Pragma',
          content: 'no-cache',
        },
        Expires: {
          'http-equiv': 'Expires',
          content: '0',
        },
      }
      return args
    })
  },
}
