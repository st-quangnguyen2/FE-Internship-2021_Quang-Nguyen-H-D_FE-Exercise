const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    home: './src/typescript/pages/home.ts',
    cart: './src/typescript/pages/cart.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        // images
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 6969,
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
};
