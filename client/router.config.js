export function configRouter(router) {
    router.map({
        '/duty': {
            name: 'duty',
            component: require('./tools/duty.vue'),
            title: '今天谁值日',
            desc: 'Yo ! Who is the lucky guy !'
        },
        '/oss-upload': {
            name: 'ossUpload',
            component: require('./code/oss-upload.vue'),
            title: '手机拍照',
            desc: '在手机上选择图片 / 拍照上传至 oss'
        },
        // not found handler
        '*': {
            name: 'missing',
            component: {
                template: '<h1 style="margin-top:20px;text-align:center;color:#E9573F;">You are missing ! &#128561;</h1>'
            },
            title: 'Hi there !'
        },
        '/': {
            name: 'Welcome',
            component: {
                template: '<h1 style="margin-top:20px;text-align:center;color:#ffcd40;">Here you are.</h1>'
            },
            title: 'Hi'
        }
    })
}