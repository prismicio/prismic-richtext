var webpack = require('webpack'),
    path = require('path'),
    yargs = require('yargs');
 
var libraryName = 'PrismicRichtext',
    fileName = 'prismic-richtext',
    plugins = [],
    outputFile;
 
if (yargs.argv.p) {
  outputFile = fileName + '.min.js';
} else {
  outputFile = fileName + '.js';
}
 
var config = {
  mode: yargs.argv.p ? 'production' : 'development',
  entry: [
    __dirname + '/src/index.ts'
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "this"
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
  }
};

if(yargs.argv.p) {
  optimization: {
    minimize: true
  }
}
 
module.exports = config;
