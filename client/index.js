/*
 * @Author: Pan
 * @Date:   2016-03-15 13:25:09
 * @Last Modified by:   Pan
 * @Last Modified time: 2016-03-15 13:25:09
 */

import Vue from 'vue'
import App from './App'

/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: { App },
    ready() {
        console.log('hey')
    }
})
