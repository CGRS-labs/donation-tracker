const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'client/index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client/index.html'),
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|jpe?g)$/,
        type: 'asset/resource'
      },
    ],
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
    historyApiFallback: true,
    hot: true,
    static: {
      directory: path.join(__dirname, 'assets')
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
};
