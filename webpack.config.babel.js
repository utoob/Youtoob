import path from 'path'
import webpack from 'webpack'

const WDS_PORT = 7000

export default {
  entry: [
    './client/app.jsx',
  ],
  output: {
    filename: 'js/bundle.js',
    publicPath: `http://localhost:${WDS_PORT}/`,
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}