import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.base.conf'
import cssLoaders from './css-loaders'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

// whether to generate source map for production files.
// disabling this can speed up the build.
const SOURCE_MAP = true

// noinspection JSUnresolvedFunction
module.exports = merge(baseConfig, {
    // entry: {
    //     app: './client/index.js'
    // },
    devtool: SOURCE_MAP ? '#source-map' : false,
    output: {
        // naming output files with hashes for better caching.
        // dist/index.html will be auto-generated with correct URLs.
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    vue: {
        loaders: cssLoaders({
            sourceMap: SOURCE_MAP,
            extract: true
        })
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin('[name].[contenthash].css')
    ]
})
