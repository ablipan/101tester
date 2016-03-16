export function configRouter(router) {
    router.map({
        '/who-is-on-duty': {
            component: require('./tools/who-is-on-duty.vue'),
            title: '今天谁值日',
            desc: 'Yo'
        },
        '/take-picture-on-phone': {
            component: require('./code/take-picture-on-phone.vue'),
            title: '手机拍照',
            desc: '在手机上选择图片 / 拍照上传至 oss'
        },
        // not found handler
        '*': {
            component: {
                template: '<h1 style="margin-top:20px;text-align:center;color:#E9573F;">你迷失了 ! &#128561;</h1>'
            }
        }
    })
}