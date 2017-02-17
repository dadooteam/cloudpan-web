<template>
    <div class="weui-tab__panel">
      <video id="my-video" class="video-js" controls preload="auto" width="100%" data-setup="{}">
            <source v-bind:src="url" type='video/mp4'>
            <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
            </p>
        </video>
    </div>
</template>

<script>
export default {
  name: 'Player',
  data () {
    return {
      url: '/static/img/loading.png'
    }
  },
  mounted: function () {
    this.item()
  },
  watch: {
    '$route': 'item'
  },
  methods: {
    item: function () {
      let path = this.$route.query.path
      let token = localStorage['token']
      this.url = `http://api.dadoo.im:7777/pan/download?path=${path}&__t=${token}`
    }
  }
}
</script>
