<!--suppress ALL -->
<style scoped>
    .preview {
        margin-top: 10px;
    }

    img {
        max-height: 400px;
    }

    .compress-info {
        margin-top: 10px;
    }
</style>

<template>
    <div>
        <div v-el:upload-btn>
            <slot>
                <button class="pure-button button-success">选择文件</button>
            </slot>
        </div>
        <div class="compress-info" v-if="success">
            源文件大小：{{originSize}} KB &emsp;
            压缩后大小：{{afterSize}} KB
        </div>
        <div class="preview" v-if="success">
            <img :src="previewSrc" alt="">
        </div>
    </div>
</template>

<script type="text/babel">
    /**
     * 上传组件
     *
     * 依赖: https://www.lpology.com/code/ajaxuploader/
     *
     **/
    import ss from 'simple-ajax-uploader'
    import {isDevelopment} from 'server/utils/env'
    import lrz from 'lrz/dist/lrz.bundle'
    // TODO 测试用
    import 'client/utils/crypto1/crypto/crypto'
    import 'client/utils/crypto1/hmac/hmac'
    import 'client/utils/crypto1/sha1/sha1'
    import Base64 from 'client/utils/crypto1/base64'
    let self
    export default{
        components: {},
        props: {
            /**
             * 文件大小限制, 单位 kb
             */
            maxSize: {
                type: Number,
                default: 20000 // 默认 20 m
            },
            /**
             * 允许文件扩展名, 例如 ["jpg", "jpeg", "png", "gif"]
             */
            ext: {
                type: Array,
                default() {
                    return [ 'jpg', 'jpeg', 'png', 'gif' ]
                }
            },
            /**
             * 浏览器只能选择的文件类型, 例如 'image/*', 文件选择器将强制只能选择图片
             */
            accept: {
                type: String,
                default: 'image/*'
            }
        },
        data() {
            return {
                success: false,
                filename: '',
                previewSrc: null,
                originSize: 0,
                afterSize: 0
            }
        },
        watch: {},
        computed: {},
        methods: {},
        ready() {
            self = this
            /* eslint-disable no-new */
            new ss.SimpleUpload({
                button: self.$els.uploadBtn,
//                url: 'http://101test-private.oss-cn-beijing.aliyuncs.com',
                // TODO 测试用, 杭州的 oss 地址
                url: 'http://post-test.oss-cn-hangzhou.aliyuncs.com',
                name: 'file',
                multipart: true,
                cors: true,
                hoverClass: 'hover',
                focusClass: 'focus',
                autoSubmit: false, // 关闭自动提交
                debug: isDevelopment,
                maxSize: self.maxSize,
                allowedExtensions: self.ext,
                accept: self.accept,
                startXHR(filename) {
                    self.filename = filename
                },
                onChange(filename, extension, uploadBtn, fileSize, file) {
                    lrz(file).then((rst) => {
                        // TODO 测试使用的直连方式!!!
                        const policyText = {
                            "expiration": "2020-01-01T12:00:00.000Z", // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
                            "conditions": [
                                [ "content-length-range", 0, 1048576000 ] // 设置上传文件的大小限制
                            ]
                        }
                        const accessid = '6MKOqxGiGU4AUk44'
                        const accesskey = 'ufu7nS8kS59awNihtjSonMETLI0KLy'
                        const policyBase64 = Base64.encode(JSON.stringify(policyText))
                        const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, { asBytes: true })
                        const signature = Crypto.util.bytesToBase64(bytes)

                        this.setData({
                            "ossAccessKeyId": accessid,
                            "policy": policyBase64,
                            "signature": signature,
                            "key": "test/" + file.name,
                            "file": rst.file
                        })
                        self.previewSrc = rst.base64
                        self.afterSize = (rst.fileLen / 1000).toFixed()
                        self.originSize = fileSize
                        this.submit()
                    })
                },
                onExtError(filename, extension) {
                    console.log('格式错误', filename, extension)
                },
                onProgress(pct) {
                },
                onComplete() {
                    self.success = true
                    self.$dispatch('complete', { ok: true })
                },
                onError() {
                    self.$dispatch('complete', { ok: false })
                }
            })
        }
    }
</script>
