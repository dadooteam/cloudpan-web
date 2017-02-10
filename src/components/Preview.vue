<template>
    <div class="weui-tab__panel">
        <div class="weui-gallery" style="display: block">
            <span class="weui-gallery__img" v-bind:style="{ backgroundImage: url }"></span>
            <div class="weui-gallery__opr">
                <a href="javascript:" class="weui-gallery__del">
                    <i class="weui-icon-delete weui-icon_gallery-delete"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
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
      let path = this.$route.query.path
      this.$http.get('http://api.dadoo.im:7777/pan/download?path=' + path).then(response => {
        return response.blob()
      }).then(blob => {
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = () => {
          this.url = 'url(' + reader.result + ')'
        }
      })
    }
  }
}
</script>
