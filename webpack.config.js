module.exports = {
  progress: true,
  color: true,
  entry: {
    popup: "./src/ts/popup.ts",
    options: "./src/ts/options.ts",
    background: "./src/ts/background.ts"
  },
  output: {
    filename: "[name].js"
  },
  resolve: {
    extensions: ['', '.ts']
  },
  module: {
    loaders: [{test: /\.ts(x?)$/, loader: 'ts-loader'}]
  },
  plugins: [require('webpack-fail-plugin')]
};
