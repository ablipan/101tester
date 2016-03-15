import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.base.conf'
import cssLoaders from './css-loaders'

// add hot-reload related code to entry chunks
// Object.keys(baseConfig.entry).forEach(function (name) {
//     baseConfig.entry[ name ] = [ './build/dev-client' ].concat(baseConfig.entry[ name ])
// })

// noinspection JSUnresolvedFunction
export default merge(baseConfig, {
    entry: {
        app: [
            'webpack-dev-server/client?http://127.0.0.1:8080',
            'webpack/hot/dev-server',
            './client/index.js'
        ]
    },
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    output: {
        // necessary for the html plugin to work properly
        // when serving the html from in-memory
        publicPath: '/'
    },
    vue: {
        loaders: cssLoaders({
            sourceMap: false,
            extract: false
        })
    },
    plugins: [
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(), // HMR plugin
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
    ]
})
