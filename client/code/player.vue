<style scoped>
</style>

<template>
    <div>
        <h2 class="content-subhead"></h2>
        <p>
            音频播放
        </p>
        <p>
            <player type="audio/mp3"
                    url="http://pan-ghost.oss-cn-beijing.aliyuncs.com/media/%E9%BE%99%E5%8D%B7%E9%A3%8E.mp3"></player>
        </p>
        <p>
            视频播放 (不支持 flv)
        </p>
        <p>
            <player type="video/mp4"
                    url="http://pan-ghost.oss-cn-beijing.aliyuncs.com/media/video.mp4"></player>
        </p>
    </div>
</template>

<script>
    import player from '../components/player'
    export default{
        name: 'lightweight-player',
        data() {
            return {}
        },
        components: { player }
    }
</script>