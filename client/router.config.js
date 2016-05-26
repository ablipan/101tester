export function configRouter(router) {
    router.map({
        '/duty': {
            name: 'duty',
            component(resolve) {
                require(['./tools/duty.vue'], resolve)
            },
            title: '今天谁值日',
            desc: 'Yo ! Who is the lucky guy !'
        },
        '/oss-upload': {
            name: 'ossUpload',
            component(resolve) {
                require(['./code/oss-upload.vue'], resolve)
            },
            title: '手机拍照',
            desc: '在手机上选择图片 / 拍照上传至 oss'
        },
        '/lightweight-player': {
            name: 'lightweightPlayer',
            component(resolve) {
                require(['./code/player.vue'], resolve)
            },
            title: '手机音视频播放',
            desc: '在手机上播放音视频'
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