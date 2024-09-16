const path = require('path');
const WebpackUserscript = require('webpack-userscript').default;
const packageJson = require('./package.json');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.user.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
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
    new WebpackUserscript({
        headers: {
          name: 'Sim Companies Helper',
          namespace: 'http://tampermonkey.net/',
          version: packageJson.version, // Sync userscript version with package version.
          description: 'Provides additional insights for Sim Companies',
          author: 'Jake Forrester',
          match: 'https://www.simcompanies.com/*',
          grant: 'none',
        },
      }),
  ],
  mode: 'production',
};