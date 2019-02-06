var webpack = require("webpack"),
  path = require("path"),
  yargs = require("yargs");

var libraryName = "PrismicRichtext",
  fileName = "prismic-richtext",
  plugins = [],
  outputFile,
  mode,
  optimization;

if (yargs.argv.p) {
  outputFile = fileName + ".min.js";
  mode = "production";
  optimization = {
    minimize: true,
  };
} else {
  outputFile = fileName + ".js";
  mode = "development";
}

var config = {
  mode: mode,
  entry: [__dirname + "/src/index.ts"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: outputFile,
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/typescript"],
          plugins: [
            [
              "@babel/plugin-transform-modules-commonjs",
              {
                allowTopLevelThis: true,
              },
            ],
            "ramda",
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: plugins,
};

module.exports = config;
