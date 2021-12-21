const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name]-[contenthash].js',
    clean: true,
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jpg|ico$/i,
        type: 'asset',
        generator: {
          filename: 'image/[name][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024, // 2kb
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
