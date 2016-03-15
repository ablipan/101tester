/*
* @Author: Pan
* @Date:   2016-03-15 11:48:07
* @Last Modified by:   Pan
* @Last Modified time: 2016-03-15 12:03:11
*/
module.exports = {
    // 当前目录以及子目录强制使用此配置文件, 而不会向上寻找其他配置文件
    root: true,
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // 对html/ vue文件中script的支持，详见：https://github.com/BenoitZugmeyer/eslint-plugin-html
    plugins: [
        'html'
    ],
    'env': {
        'browser': true
    },
    'globals': {
        'document': true,
        'window': true
    },
    // add your custom rules here
    'rules': {
        // 引号只能使用单引号, 暂时禁用, 因为 https://github.com/eslint/eslint/issues/5234
        'quotes': 0,
        //'quotes': [0, 'backtick', 'avoid-escape'],
        // 缩进 4 个空格
        'indent': [2, 4, {'SwitchCase': 0}],
        // 行尾保留新行
        'eol-last': 0,
        // 函数括号前空格
        'space-before-function-paren': [2, {anonymous: 'always', named: 'never'}],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 末尾逗号
        'comma-dangle': [2, 'only-multiline'],

        // ES2015
        // 请使用 const let 代替 var
        'no-var': 2,
        // 不检查箭头函数是否一定需要括号
        'arrow-parens': 0
    }
}