const path = require('path');
const env = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EnvironmentPlugin, ProvidePlugin } = require('webpack');

env.config();

module.exports = {
  mode: 'development',
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name]-[contenthash].js',
    clean: true,
    library: 'Z',
  },
  target: ['web', 'es5'],
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    port: 7000,
    client: {
      overlay: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new EnvironmentPlugin(['AES_KEY']),
    new ProvidePlugin({
      React: 'react',
    }),
  ],
  resolve: {
    alias: {
      '@page': path.resolve(__dirname, './src/page'),
      '@locale': path.resolve(__dirname, './src/locale'),
    },
    fallback: {
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      buffer: require.resolve('buffer'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
