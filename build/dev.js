/**
 * 开发模式
 */
import _ from 'lodash'
import {format} from 'util'
import jetpack from 'fs-jetpack'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import merge from 'webpack-merge'
import cssLoaders from './css-loaders'
import baseConfig from './webpack.base.conf'
import logger from './util/logger'
import buildUtil from './util/build-util'
import {getLocalIp} from '../server/utils/env'

const ip = getLocalIp()
const port = 1339
const PUBLIC_PATH = format('http://%s:%s/', ip, port)
const INDEX_VIEW = 'server/views/index.twig'

let myWebpackConfig = _.clone(baseConfig, true)
// noinspection JSUnresolvedFunction,JSUnresolvedVariable
myWebpackConfig = merge(myWebpackConfig, {
    entry: {
        app: [
            format('webpack-dev-server/client?http://%s:%s', ip, port),
            'webpack/hot/dev-server',
            './client/index.js'
        ]
    },
    devtool: 'eval-source-map',
    debug: true, // Switch loaders to debug mode.
    output: {
        // 资源访问路径, 对于静态的访问资源很重要
        publicPath: PUBLIC_PATH,
        // 打包后的文件名，必须是相对路, name 取决于 entry 的 key
        filename: '[name].js'
    },
    vue: {
        loaders: cssLoaders({
            sourceMap: false,
            extract: false
        })
    },
    module: {
        loaders: [
            {
                test: /\.styl$/,
                loader: 'style!css!stylus'
            }, {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // HMR plugin
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        })
    ]
})

new WebpackDevServer(webpack(myWebpackConfig), {
    // 将 webapp 目录作为 contentBase 目录
    contentBase: './',
    // 打开 HotModuleReplacement
    hot: true,
    inline: true,
    // historyApiFallback: true,
    // 隐藏烦人的日志
    noInfo: true,
    stats: {
        colors: true,
        profile: true
    }
}).listen(port, ip, (err) => {
    if (err) {
        logger.fatal(err)
    } else {
        logger.success('dev server 启动成功 !')
        let viewContent = jetpack.read(INDEX_VIEW)
        const js = PUBLIC_PATH + 'app.js'
        // 注入 js , 清空 css
        viewContent = buildUtil.injectAssets(viewContent, js, null)
        // 清空 vendor js /css
        viewContent = buildUtil.clearVendorAssets(viewContent)
        jetpack.fileAsync(INDEX_VIEW, { content: viewContent }).then()
    }
})

