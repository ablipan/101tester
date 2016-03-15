import path from 'path'
const clientRoot = path.resolve(__dirname, '../client')

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
        extensions: [ '', '.js', '.vue' ],
        fallback: [ path.join(__dirname, '../node_modules') ],
        alias: {
            'client': path.resolve(__dirname, '../client'),
            'server': path.resolve(__dirname, '../server')
        }
    },
    resolveLoader: {
        fallback: [ path.join(__dirname, '../node_modules') ]
    },
    module: {
        preLoaders: [
            {
                test: /\.vue$/,
                loader: 'eslint',
                include: clientRoot,
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint',
                include: clientRoot,
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
                include: clientRoot,
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
