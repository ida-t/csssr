import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import cssnext from 'postcss-cssnext';

class EmptyPlugin { apply = () => {} }

const apps = {
  csssr: ['./index'],
};

export default (env = {}) => {
  const dev = !!env.dev;
  const port = env.port || 8081;

  Object.keys(apps).forEach((name) => {
    apps[name].unshift('babel-polyfill');
    if (dev) {
      apps[name].unshift(
        `webpack-dev-server/client?http://localhost:${port}`,
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch'
      );
    }
  });

  return {
    context: path.join(__dirname, 'src'),
    entry: apps,
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'assets'),
      publicPath: `${dev ? `http://localhost:${port}` : ''}/assets/`,
      pathinfo: dev,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['latest', {
                es2015: {
                  modules: false
                }
              }],
              'react',
              'stage-0'
            ],
            plugins: dev ? ['react-hot-loader/babel'] : []
          },
          exclude: /node_modules/,
        },
        {
          test: /\.styl$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              `css-loader?sourceMap&importLoaders=1&modules&localIdentName=${dev ? '[local]__[path][name]__' : ''}[hash:base64:5]`,
              'postcss-loader',
              'stylus-loader?paths[]=src'
            ]
          }),
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          minimize: !dev,
          context: __dirname,
          postcss: [
            cssnext({ browsers: ['last 3 versions']}),
          ]
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(!dev ? 'production' : 'development')
        }
      }),
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true,
        disable: dev
      }),
      dev ? new webpack.HotModuleReplacementPlugin() : new EmptyPlugin(),
      dev ? new EmptyPlugin() : new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    ],
    resolve: {
      modules: [path.resolve('./src'), 'node_modules'],
    },
    devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
    bail: !dev,
    devServer: {
      port,
      publicPath: `${dev ? `http://localhost:${port}` : ''}/assets/`,
      contentBase: '/',
      historyApiFallback: true,
      quiet: false,
      noInfo: false,
      hot: true,
      overlay: true,
      stats: {
        colors: true,
        version: true,
      }
    }
  };
};
