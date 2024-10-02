const path = require('path');

module.exports = {
  entry: './src/popup/popup.js', // Entry point for your popup
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Regex to match .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel to transpile
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
  },
  mode: 'development', // Set mode to development
  devtool: 'source-map', // Change this line to avoid eval
};
