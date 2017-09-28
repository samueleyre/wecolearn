var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name]-one.css');
const extractLESS = new ExtractTextPlugin('[name]-two.css');



var helpers = require('./helpers');

console.log(helpers.root('', 'app'));
// import img from './../assets/img/favicom-pass.png'

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js' ]
  },


  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=/assets/img/[name].[hash].[ext]'
      },
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'app'),
        loader: extractLESS.extract({ fallbackLoader: 'style-loader', loader: 'sass-loader?sourceMap'})
      },
      {
        test: /\.css$/,
          exclude: helpers.root('src', 'app'),
        loader: extractCSS.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
      },
      {
        test: /\.scss$/,
        include: helpers.root('src', 'app'),
        // loader: 'raw-loader!postcss-loader'
          loader: ['raw-loader','sass-loader']
      },
      {
        test: /\.css$/,
        include: [helpers.root('src', 'app')],
        // loader: 'raw-loader!postcss-loader'
        loader: 'raw-loader'
      },
      /*
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: [
          ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: [ 'css-loader', 'postcss-loader' ] })
            //,
            //'to-string-loader',
            //'css-loader'
        ]
      }
      */
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills' ]
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};