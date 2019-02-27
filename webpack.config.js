const path = require("path");

module.exports = {
  mode: 'development',
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
   module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"],
                 plugins: ['transform-custom-element-classes', 'transform-es2015-classes']
          }
        }
      }
    ]
  }
};