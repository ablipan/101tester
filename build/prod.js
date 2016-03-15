/**
 *
 * 上线模式
 */
import _ from 'lodash'
import webpack from 'webpack'
import jetpack from 'fs-jetpack'
import path from 'path'
import merge from 'webpack-merge'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import AssetsPlugin from 'assets-webpack-plugin'
import logger from './util/logger'
import Spinner from './util/spinner'
import git from './util/git'
import baseConfig from './webpack.base.conf'
import cssLoaders from './css-loaders'
import buildUtil from './util/build-util'

const SOURCE_MAP = true

// 相对于脚本执行的目录
const DIST_REL_PATH = './public'
// webpack publicPath 配置
const PUBLIC_PATH = '/'
// webpack outputPath 配置
// noinspection JSUnresolvedVariable
const OUTPUT_PATH = path.join(__dirname, '../public/')

// build map file
const ASSETS_FILENAME = '_assets.json'

const VENDOR_VIEW = 'server/views/layout.twig'
const INDEX_VIEW = 'server/views/index.twig'

logger.log('ready')

// 清空 dist 目录
jetpack.cwd(DIST_REL_PATH).dir('.', { empty: true })

let myWebpackConfig = _.clone(baseConfig, true)
const spinner = new Spinner('building ...')

// noinspection JSUnresolvedFunction,JSUnresolvedVariable
myWebpackConfig = merge(myWebpackConfig, {
    // 这些共用的js 和 css 将全部打包至 vendor.[hash].js 和 vendor.[hash].css
    entry: {
        app: './client/index.js',
        vendor: [
            'vue',
            'vue-resource'
        ]
    },
    output: {
        publicPath: PUBLIC_PATH,
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    progress: true,
    devtool: SOURCE_MAP ? '#source-map' : false,
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
        new ExtractTextPlugin('[name].[contenthash].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            // filename: "vendor.js"
            // (Give the chunk a different name)
            minChunks: Infinity
            // (with more entries, this ensures that no other module
            //  goes into the vendor chunk)
        }),
        // 生成 entry 与 js 、css文件的映射文件
        new AssetsPlugin({
            path: OUTPUT_PATH,
            prettyPrint: true,
            filename: ASSETS_FILENAME
        }),
        new webpack.ProgressPlugin((percentage, msg) => {
            spinner.message(`${percentage < 1 ? msg : 'build finish ...'}`)
        })
    ]
})

spinner.start()

// run webpack
webpack(myWebpackConfig, (err, stats) => {
    if (err) {
        logger.fatal(err)
    }
    const jsonStats = stats.toJson()
    if (jsonStats.errors.length > 0) {
        jsonStats.errors.forEach((err) => logger.warning(err))
    }
    spinner.stop()
    logger.success('webpack build 成功!')
    // 读取生成的 assets 文件
    const _assets = jetpack.read(path.join(DIST_REL_PATH, ASSETS_FILENAME), 'json')
    // 1. 处理 vendor js/ css
    const vendorJs = _assets[ 'vendor' ][ 'js' ]
    const vendorCss = _assets[ 'vendor' ][ 'css' ]
    // 替换 view 中的 js
    let vendorViewContent = jetpack.read(VENDOR_VIEW)
    if (!vendorViewContent) {
        logger.fatal('[%s] 不存在', VENDOR_VIEW)
    }
    // 注入 vendor js/css
    vendorViewContent = buildUtil.injectAssets(vendorViewContent, vendorJs, vendorCss, 4, 8)
    jetpack.fileAsync(VENDOR_VIEW, { content: vendorViewContent }).then()
    delete _assets.vendor // 删除 vendor 节点

    // 2. 处理 普通的 entry
    const res = _assets[ 'app' ]
    // 替换 view 中的 js
    let viewContent = jetpack.read(INDEX_VIEW)
    if (!viewContent) {
        logger.fatal('[%s] 不存在', INDEX_VIEW)
    }
    // 注入 js , css
    viewContent = buildUtil.injectAssets(viewContent, res.js, res.css, 4, 4)
    // 取消清空 vendor js /css
    viewContent = buildUtil.cancelClearVendorAssets(viewContent)
    jetpack.fileAsync(INDEX_VIEW, { content: viewContent }).then()
    // git -add
    logger.success('js /css 注入成功, 正在执行 git add ...')
    jetpack.find(DIST_REL_PATH, { matching: '*' }).forEach((relPath) => {
        git.add(relPath)
    })
    logger.success('done !')
})

