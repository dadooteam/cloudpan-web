<template>
    <div class="weui-tab__panel">
      <img v-bind:src="url" width="100%">
    </div>
</template>

<script>
export default {
  name: 'Preview',
  data () {
    return {
      url: '/static/img/mkdir.png'
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
      this.$http.get('http://api.dadoo.im:7777/pan/download', options).then(response => {
        return response.blob()
      }).then(blob => {
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = () => {
          this.url = reader.result
        }
      })
    }
  }
}
</script>
