var webpack = require('webpack'),
    path = require('path'),
    yargs = require('yargs');
 
var libraryName = 'PrismicRichtext',
    fileName = 'prismic-richtext',
    plugins = [],
    outputFile;
 
if (yargs.argv.p) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
  outputFile = fileName + '.min.js';
} else {
  outputFile = fileName + '.js';
}
 
var config = {
  entry: [
    __dirname + '/src/index.ts'
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: plugins
};
 
module.exports = config;
