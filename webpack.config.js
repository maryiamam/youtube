var webpack = require('webpack');
var xhr = require("xhr")

module.exports = {
  context: __dirname,
  devtool: "source-map",
  entry: "./js/allComp.js",
  output: {
    path: __dirname + "/dist/js",
    filename: "bundle.js"
  },
  module:{
    loaders: [
      {
		  	test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
	     }
    ],
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
	alias: {
		request$: "xhr"
  }
}
}
