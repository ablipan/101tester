import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default (options) => {
    // generate loader string to be used with extract text plugin
    function generateLoaders(loaders) {
        const sourceLoader = loaders.map(function (loader) {
            let extraParamChar
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?')
                extraParamChar = '&'
            } else {
                loader = loader + '-loader'
                extraParamChar = '?'
            }
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
        }).join('!')

        if (options.extract) {
            // noinspection JSUnresolvedFunction
            return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
        } else {
            return [ 'vue-style-loader', sourceLoader ].join('!')
        }
    }

    // http://vuejs.github.io/vue-loader/configurations/extract-css.html
    return {
        css: generateLoaders([ 'css' ]),
        stylus: generateLoaders([ 'css', 'stylus' ]),
        styl: generateLoaders([ 'css', 'stylus' ])
    }
}
