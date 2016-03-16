<template>
    <div class="layout" :class="{'active': menuDisplay}">
        <a class="menu-link" @click="menuDisplay=!menuDisplay">
            <i class="fa" :class="[ menuDisplay ? 'fa-times' : 'fa-bars' ]"></i>
        </a>
        <div class="menu">
            <div class="pure-menu">
                <a class="pure-menu-heading" @click="refresh()">Yo 101test</a>
                <ul class="pure-menu-list">
                    <li class="pure-menu-item" v-link-active>
                        <a class="pure-menu-link" v-link="{path:'/take-picture-on-phone'}">手机拍照上传</a>
                    </li>
                    <li class="pure-menu-item menu-item-divided" v-link-active>
                        <a class="pure-menu-link" v-link="{path:'/who-is-on-duty'}">值日</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="main">
            <div class="header">
                <h1>{{$route.title}}</h1>
                <h2>{{$route.desc}}</h2>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import './app.styl'
    export default{
        data() {
            return {
                menuDisplay: false
            }
        },
        components: {},
        methods: {
            refresh() {
                window.location.reload(true)
            }
        }
    }
</script>