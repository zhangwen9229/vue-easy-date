const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const baseWebapckConfig = require('./webpack.base.conf')

module.exports = merge(baseWebapckConfig, {
  mode: 'development',
  entry: './test/index.js',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: "sass-loader",
            options: {
              data: `
              $designWidth : 750; //如设计图是750
              @function px2rem( $px ){
                @return $px*320/$designWidth/20 + rem;
              }
              `
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './test/index.html' })
  ]
})