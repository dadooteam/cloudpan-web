<template>
    <div class="weui-tab__panel">
      <img v-bind:src="url" width="100%">
    </div>
</template>

<script>
import weui from 'weui.js'

export default {
  name: 'Preview',
  data () {
    return {
      url: ''
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
      let options = {
        params: {
          path: this.$route.query.path
        }
      }
      let loading = weui.loading('加载中')
      this.$http.get('http://api.dadoo.im:7777/pan/preview', options).then(response => {
        this.url = response.body.data
        loading.hide()
      })
    }
  }
}
</script>
