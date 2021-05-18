const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    home: './src/js/home.js',
    cart: './src/js/cart.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['home'],
      template: 'index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'cart.html',
      chunks: ['cart'],
      template: 'cart.html',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 6969,
  },
  mode: 'development',
};
