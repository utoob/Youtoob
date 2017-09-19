import path from 'path'
import webpack from 'webpack'

import { isProd, WDS_PORT, HOST, PROTOCOL, PORT } from './server/config'

export default {
  entry: [
    './client',
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: `http://localhost:${WDS_PORT}/`,
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, use: 'file-loader' },
    ],
  },
  devtool: isProd ? false : 'source-map',
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
    new webpack.DefinePlugin({ 
      HOST: JSON.stringify(HOST), 
      PROTOCOL: JSON.stringify(PROTOCOL), 
      PORT: JSON.stringify(PORT) 
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}