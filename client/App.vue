<template>
    <div class="layout" :class="{'active': menuDisplay}">
        <a class="menu-link" @click="toggleMenu()">
            <i class="fa" :class="[ menuDisplay ? 'fa-times' : 'fa-bars' ]"></i>
        </a>
        <div class="menu">
            <div class="pure-menu">
                <a class="pure-menu-heading" @click="refresh()">Yo 101test</a>
                <ul class="pure-menu-list">
                    <li class="pure-menu-item menu-item-divided" v-link-active>
                        <a class="pure-menu-link" v-link="{name:'duty'}" @click="toggleMenu()">
                            值日
                        </a>
                    </li>
                    <li class="pure-menu-item" v-link-active>
                        <a class="pure-menu-link" v-link="{name:'ossUpload'}" @click="toggleMenu()">
                            手机拍照上传
                        </a>
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
            <div class="footer">
                <a href="https://github.com/ablipan/101testool" class="pure-link" target="_blank">
                    YO！<i class="fa fa-2x fa-github"></i>&nbsp;
                </a>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import './app.styl'
    export default{
        data() {
            return {
                menuDisplay: !navigator.userAgent.match(/(iPhone|iPad|iPod|Android|ios)/i)
            }
        },
        components: {},
        methods: {
            refresh() {
                window.location.reload(true)
            },
            toggleMenu() {
                this.menuDisplay = !this.menuDisplay
            }
        },
        ready() {
        }
    }
</script>