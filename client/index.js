/*
 * @Author: Pan
 * @Date:   2016-03-15 13:25:09
 * @Last Modified by:   lipan
 * @Last Modified time: 2016-03-24 09:23:05
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './app'
import 'purecss'
import 'purecss/build/grids-responsive.css'
import 'font-awesome/css/font-awesome.css'
import {configRouter} from './router.config'
import './assets/styl/index.styl'
import fastclick from 'fastclick'

fastclick.attach(document.body)

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
    // if (router.app.$route.path === '/') {
    //     router.go({ name: 'duty' })
    // }
})

// router.start(App, '#app')
// router.go({ name: 'duty' })
