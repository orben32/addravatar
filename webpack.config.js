const path = require('path');
const baseManifest = require("./chrome/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");

  module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    plugins: [
      new WebpackExtensionManifestPlugin({
        config: {
          base: baseManifest
        }
      })
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