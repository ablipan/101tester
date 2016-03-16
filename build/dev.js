/**
 * 开发模式
 */
import _ from 'lodash'
import jetpack from 'fs-jetpack'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import merge from 'webpack-merge'
import cssLoaders from './css-loaders'
import baseConfig from './webpack.base.conf'
import logger from './util/logger'
import buildUtil from './util/build-util'

const PUBLIC_PATH = 'http://localhost:8080/'
const INDEX_VIEW = 'server/views/index.twig'

let myWebpackConfig = _.clone(baseConfig, true)
// noinspection JSUnresolvedFunction,JSUnresolvedVariable
myWebpackConfig = merge(myWebpackConfig, {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8080',
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
        colors: true
    }
}).listen(8080, 'localhost', (err) => {
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

