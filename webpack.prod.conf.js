const merge = require('webpack-merge')

const baseWebapckConfig = require('./webpack.base.conf')

module.exports = merge(baseWebapckConfig, {
  mode: "production",
  output: {
    filename: 'v-easydate.min.js',
    library: 'VueEasyDate',
    libraryTarget: 'umd',
    libraryExport: 'default',
  }
})