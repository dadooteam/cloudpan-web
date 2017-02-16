<template>
    <div class="weui-tab__panel">
      <img v-bind:src="url" width="100%" v-bind:class="{loading:isLoading}">
    </div>
</template>

<script>
export default {
  name: 'Preview',
  data () {
    return {
      isLoading: true,
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
      let options = {
        params: {
          path: this.$route.query.path
        },
        progress: (event) => {
          // console.log(event)
        }
      }
      this.$http.get('http://api.dadoo.im:7777/pan/preview', options).then(response => {
        this.url = response.body.data
        this.isLoading = false
      })
    }
  }
}
</script>
