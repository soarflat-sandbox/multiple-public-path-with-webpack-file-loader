const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/js/app.js',
    another: './src/js/another.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
        },
        vendorsModules: {
          test: /src[\\/]js[\\/]modules/,
          name: 'vendor-modules',
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          // url 出力される画像名（画像パス）
          // resourcePath file-loader によって処理される画像の絶対パス（今回のサンプルだと、src/images にある画像の絶対パス）
          outputPath: (url, resourcePath) => {
            // console.log('url', url);
            // console.log('resourcePath', resourcePath);

            if (/icon\.png/.test(resourcePath)) {
              return `html-images/${url}`;
            }

            return `images/${url}`;
          },
          // url 出力される画像名（画像パス）
          // resourcePath file-loader によって処理される画像の絶対パス（今回のサンプルだと、src/images にある画像の絶対パス）
          publicPath: (url, resourcePath) => {
            if (/icon\.png/.test(resourcePath)) {
              return `/html-images/${url}`;
            }

            return `/images/${url}`;
          },
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      filename: 'another.html',
      template: './src/html/another.html',
      chunks: ['another'],
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css',
    }),
  ],
};
