<style scoped>
</style>

<template>
    <div>
        <h2 class="content-subhead"></h2>
        <p>
            配置: 宽高为原始比例 , 70% 压缩率
        </p>
        <p>
            UA: {{userAgent}}
        </p>
        <upload></upload>
    </div>
</template>

<script>
    import upload from '../components/upload/oss.vue'
    export default{
        data() {
            return {
                msg: 'Vue',
                userAgent: navigator.userAgent
            }
        },
        components: { upload }
    }
</script>