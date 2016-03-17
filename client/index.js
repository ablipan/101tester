/*
 * @Author: Pan
 * @Date:   2016-03-15 13:25:09
 * @Last Modified by:   Pan
 * @Last Modified time: 2016-03-15 13:25:09
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './app'
import 'purecss'
import 'font-awesome/css/font-awesome.css'
import {configRouter} from './router.config'
import './assets/styl/index.styl'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.debug = true

// create router
const router = new VueRouter({
    history: false,
    saveScrollPosition: true
})

// config router
configRouter(router)

// bootstrap the app
router.start(App, '#app', () => {
    if (router.app.$route.path === '/') {
        router.go({ name: 'ossUpload' })
    }
})
