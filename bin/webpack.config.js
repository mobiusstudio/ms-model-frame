import path from 'path'
import webpack from 'webpack'

const DEBUG = !process.argv.includes('release')
const VERBOSE = process.argv.includes('verbose')
const MODE = DEBUG ? 'development' : 'production'
const GLOBALS = {
  'process.env.NODE_ENV': '"production"',
  __DEV__: false,
}

// 打入 babel 所需要的 runtime，生产环境不再需要安装 babel packages
const compiledPackages = [
  '@babel/polyfill',
]

const config = {
  context: path.resolve(__dirname, '../src'),

  entry: ['@babel/polyfill', './index.js'],

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'models.js',
    libraryTarget: 'commonjs2',
  },

  target: 'node',
  mode: MODE,

  externals: [
    function filter(context, request, cb) {
      const isExternal = (compiledPackages.indexOf(request) === -1 && request.match(/^[a-z][a-z\/\.\-0-9]*$/i)) || request.match(/\.sql$/i)
      cb(null, !!isExternal)
    },
  ],

  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install()',
      raw: true,
      entryOnly: false,
    }),
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src'),
        ],
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
    ],
  },

  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules',
    ],
    extensions: ['.webpack.js', '.js', '.json'],
  },

  cache: false,

  stats: {
    colors: true,
    reasons: false,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },
}

export default config
