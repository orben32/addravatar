const path = require('path');
const baseManifest = require("./chrome/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const CopyPlugin = require("copy-webpack-plugin");

  module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    plugins: [
      new WebpackExtensionManifestPlugin({
        config: {
          base: baseManifest
        }
      }),
      new CopyPlugin({
        patterns: [
          { from: 'chrome/background.js', to: 'myBackground.js' },
          { from: 'chrome/popup.js', to: 'popup.js' },
          { from: 'chrome/popup.html', to: 'popup.html' },
          { from: 'chrome/icon.png', to: 'icon.png' },
        ],
  
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };