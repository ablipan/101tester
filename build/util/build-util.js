/**
 * entry.config.js 工具类
 */
import {format} from 'util'
import _ from 'lodash'

// 个人爱好 handlebars 形式模板
// noinspection JSValidateTypes
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g

const STYLE_BEGIN = '{{!--%s\style%s--}}'
const STYLE_END = '{{!--%s\style:end%s--}}'
const SCRIPT_BEGIN = '{{!--%s\script%s--}}'
const SCRIPT_END = '{{!--%s\script:end%s--}}'
const EMPTY_EXP = '\\s*'

/**
 * 匹配标签区域
 *
 * @param begin
 * @param end
 * @returns {RegExp} 例如  /{# script #}[^#]*{# script:end #}/i
 */
const _getTagAreaRE = (begin, end) => {
    return new RegExp(format('%s[^-]*%s', begin, end), 'i')
}

/**
 * 使用 css/ js 链接生成 link / script 标签区域
 * @param link css / js 链接
 * @param js 是否是替换 js
 * @param indent 缩进
 * @returns {string}
 */
const _genTag = (link, js = true, indent = 4) => {
    const result = []
    result.push(js ? format(SCRIPT_BEGIN, ' ', ' ') : format(STYLE_BEGIN, ' ', ' '))
    result.push('\n')
    result.push(_.repeat(' ', indent))
    result.push(js ? format('\<script src="%s"></script>', link)
      : format('\<link rel="stylesheet" href="%s"/>', link))
    result.push('\n')
    result.push(_.repeat(' ', indent))
    result.push(js ? format(SCRIPT_END, ' ', ' ') : format(STYLE_END, ' ', ' '))
    return result.join('')
}

/**
 * 获取 js 标签位置
 * @returns {RegExp}
 */
const _getJsTagPosition = () => {
    return _getTagAreaRE(format(SCRIPT_BEGIN, EMPTY_EXP, EMPTY_EXP), format(SCRIPT_END, EMPTY_EXP, EMPTY_EXP))
}

/**
 * 获取 style 标签位置
 * @returns {RegExp}
 */
const _getStyleTagPosition = () => {
    return _getTagAreaRE(format(STYLE_BEGIN, EMPTY_EXP, EMPTY_EXP), format(STYLE_END, EMPTY_EXP, EMPTY_EXP))
}

/**
 * 生成 css/ js 空的标签区域
 * @param js 是否为 js
 */
const _genEmptyTag = (js = true) => {
    const result = []
    result.push(js ? format(SCRIPT_BEGIN, ' ', ' ') : format(STYLE_BEGIN, ' ', ' '))
    result.push('\n')
    result.push(_.repeat(' ', 4))
    result.push(js ? format(SCRIPT_END, ' ', ' ') : format(STYLE_END, ' ', ' '))
    return result.join('')
}

export default{
    /**
     * 注入 js/ css
     * @param fileContent view 文件内容
     * @param js js 的 src
     * @param css css 的 href 值
     * @param jsIndent js 标签缩进
     * @param cssIndent css 标签缩进
     * @returns {*}
     */
    injectAssets(fileContent, js, css, jsIndent = 4, cssIndent = 4){
        if (!js) {
            // 清空 js
            fileContent = fileContent.replace(_getJsTagPosition(), _genEmptyTag(true))
        } else {
            fileContent = fileContent.replace(_getJsTagPosition(), _genTag(js, true, jsIndent))
        }
        if (!css) {
            // 清空 style
            fileContent = fileContent.replace(_getStyleTagPosition(), _genEmptyTag(false))
        } else {
            fileContent = fileContent.replace(_getStyleTagPosition(), _genTag(css, false, cssIndent))
        }
        return fileContent
    },

    /**
     * 清空 vendor js /css
     * 通过插入 vendorScript/ vendorStyle block 的方式达到清空
     * vendor js /css 的目的
     */
    clearVendorAssets(viewContent) {
        viewContent = viewContent.replace(_getJsTagPosition(), _genEmptyTag(true))
          .replace(_getStyleTagPosition(), _genEmptyTag(false))
        return viewContent
    }
}