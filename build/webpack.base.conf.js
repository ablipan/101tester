import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
const clientRoot = path.resolve(__dirname, '../client')
const projectRoot = path.resolve(__dirname, '../')

export default {
    entry: {
        app: './client/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../public'),
        publicPath: '/public/',
        filename: '[name].js'
    },
    resolve: {
        root: [ clientRoot, projectRoot ],
        extensions: [ '', '.js', '.vue' ],
        fallback: [ path.join(__dirname, '../node_modules') ],
        // alias: {
        //     'client': path.resolve(__dirname, '../client'),
        //     'server': path.resolve(__dirname, '../server')
        // }
        alias: {
            // 加速 webpack 打包 http://code.oneapm.com/javascript/2015/07/07/webpack_performance_1/
            moment: "moment/min/moment-with-locales.min.js"
        }
    },
    resolveLoader: {
        fallback: [ path.join(__dirname, '../node_modules') ]
    },
    module: {
        noParse: [ /moment-with-locales/, /lrz.all.bundle/ ],
        preLoaders: [
            {
                test: /\.vue$/,
                loader: 'eslint',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint',
                // 此处不仅限于前端的 js !!
                include: projectRoot,
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash:7]'
                }
            },
            {
                test: /\.woff|.woff2$/,
                loader: 'url-loader?prefix=font/&limit=5000&mimetype=application/font-woff'
            }, {
                test: /\.(ttf|eot|svg)/,
                loader: 'file-loader'
            }
        ]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    }
}
