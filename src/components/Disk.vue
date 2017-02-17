<template>
    <div class="weui-tab__panel">
        <a id="download"></a>
        <div class="weui-flex">
            <div class="weui-flex__item">
                <div class="placeholder">
                    <a class="disk-button"><img src="/static/img/upload.png" width="30px" height="30px"/>
                        <input type="file" class="upload" v-on:change="upload" />
                    </a>
                </div>
            </div>
            <div class="weui-flex__item">
                <div class="placeholder">
                    <a v-on:click="mkdir" class="disk-button">
                        <img src="/static/img/mkdir.png" width="30px" height="30px"/>
                    </a>
                </div>
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access" v-for="item in items" v-on:click="click(item)" 
            v-on:mousedown="menuStart(item)" v-on:mouseup="menuEnd(item)" v-on:mousemove="menuEnd(item)" 
            v-on:touchstart="menuStart(item)" v-on:touchend="menuEnd(item)" v-on:touchmove="menuEnd(item)">
                <div class="weui-cell__hd">
                    <img v-bind:src="item.thumbnail" style="width:20px;margin-right:5px;display:block">
                </div>
                <div class="weui-cell__bd">
                    <p>{{item.name}}</p>
                </div>
                <div class="weui-cell__ft">{{item.size}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import weui from 'weui.js'
export default {
  name: 'user',
  data () {
    return {
      items: [],
      menuEvent: null
    }
  },
  created: function () {
    this.list()
  },
  watch: {
    '$route': 'list'
  },
  methods: {
    menuStart: function (item) {
      if (item) {
        this.menuEvent = setTimeout(() => {
          let menu = []
          if (item.type === 1) {
            menu.push({
              label: '下载',
              onClick: () => {
                let download = document.getElementById('download')
                download.setAttribute('href', `http://api.dadoo.im:7777/pan/download?path=${item.path}&__t=${localStorage.token}`)
                download.click()
              }
            })
          }
          menu.push({
            label: '删除',
            onClick: () => {
              weui.confirm(`是否确认删除${item.name}`, {
                title: '删除确认',
                buttons: [{
                  label: '取消',
                  type: 'primary',
                  onClick: () => {}
                }, {
                  label: '确认',
                  type: 'warn',
                  onClick: () => this.remove(item)
                }]
              })
            }
          })
          weui.actionSheet(menu)
        }, 300)
      }
    },
    menuEnd: function (item) {
      if (this.menuEvent) {
        clearTimeout(this.menuEvent)
      }
    },
    click: function (item) {
      if (item.type === 1) {
        if (item.mime) {
          if (item.mime.startsWith('image/')) {
            this.$router.push({name: 'Preview', query: { path: item.path }})
          } else if (item.mime.endsWith('mp4')) {
            this.$router.push({name: 'Player', query: { path: item.path }})
          }
        }
      } else if (item.type === 2) {
        this.$router.push({name: 'Disk', query: { path: item.path }})
      }
    },
    list: function () {
      let path = this.$route.query.path
      let params = {}
      if (path) {
        params.path = path
      }
      let loading = weui.loading('加载中')
      this.$http.get('http://api.dadoo.im:7777/pan/list', {params}).then(response => {
        let items = response.body.data
        for (let item of items) {
          if (item.type === 1) {
            if (!item.thumbnail) {
              item.thumbnail = '/static/img/file.png'
            }
            if (item.size < 1000000) {
              item.size = Math.round(item.size / 1000) + 'K'
            } else if (item.size < 1000000000) {
              item.size = Math.round(item.size / 1000000) + 'M'
            } else if (item.size < 1000000000000) {
              item.size = Math.round(item.size / 1000000000) + 'G'
            }
          } else if (item.type === 2) {
            item.thumbnail = '/static/img/dir.png'
          }
        }
        this.items = items
        loading.hide()
      })
    },
    mkdir: function () {
      let name = prompt('请输入文件夹名', '')
      if (name) {
        let body = {name}
        let path = this.$route.query.path
        if (path) {
          body.path = path
        }
        console.log(body)
        this.$http.post('http://api.dadoo.im:7777/pan/mkdir', body).then(response => {
          this.list()
        })
      }
    },
    upload: function (e) {
      let formdata = new FormData()
      let path = this.$route.query.path
      if (path) {
        formdata.append('path', path)
      }
      formdata.append('file', e.target.files[0])

      this.$http.post('http://api.dadoo.im:7777/pan/upload', formdata).then(response => {
        weui.toast('操作完成', 2000)
        this.list()
      })
    },
    remove: function (item) {
      let params = {}
      params.path = item.path
      let loading = weui.loading('删除中')
      this.$http.delete('http://api.dadoo.im:7777/pan/delete', {params}).then(response => {
        loading.hide()
        weui.toast('操作完成', 2000)
        this.list()
      })
    }
  }
}
</script>

<style scoped>
.disk-button {
    height:30px;
    width:30px;
    display:inline-block;
    position:relative;
}
.upload {
    opacity: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0px;
    top: 0px;
    z-index: 1;
}
.placeholder {
    text-align: center
}
.weui-flex {
    margin:3px 0px;
}
.weui-cells {
    margin:0px;
}
</style>
