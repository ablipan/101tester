import Vue from 'vue'
import _ from 'lodash'

const SUCCESS = 0

/**
 *  使用 Vue-resource 封装 http 请求,
 *
 *  更多查看 https://github.com/vuejs/vue-resource
 *
 *  本来 post / postForm 是 static 的方法, 子类继承此 Model 类,
 *  直接使用 this.post/ this.postForm 来调用父类的静态方法, 但在 IE9 有兼容性问题....
 *
 *  所以将所有的方法改成非静态方法, 不使用继承...
 *
 */
export default class {

    /**
     * 解析 http 返回内容
     * @param response
     * @returns {{ok: boolean, data: null, err: string}}
     */
    _parse(response) {
        const result = {
            ok: false,
            data: null,
            err: ''
        }
        if (response.ok) {
            if (response.data.errorCode === SUCCESS) {
                result.ok = true
                result.data = response.data.data
            } else {
                result.err = response.data.errorDesc || '操作失败了! '
            }
        }
        return result
    }

    /**
     * base post request
     * @param url
     * @param params
     * @param option
     * @returns {Promise}
     * @private
     */
    _post(url, params, option) {
        return new Promise((resolve, reject) => {
            Vue.http.post(url, params, option).then((response) => {
                const { ok, data, err } = this._parse(response)
                if (ok) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    }

    /**
     * 使用 json 发送 post 请求 ( Content-Type : application/json )
     * @param url
     * @param params
     * @param option
     * @returns {Promise}
     */
    post(url, params, option) {
        return this._post(url, params, option)
    }

    /**
     * 发送 post 请求 ( Content-Type : application/x-www-form-urlencoded )
     * @param url
     * @param params
     * @param option
     * @returns {Promise}
     */
    postForm(url, params, option) {
        return this._post(url, params, _.assign(option, { emulateJSON: true }))
    }
}