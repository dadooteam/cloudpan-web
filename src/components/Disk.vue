<template>
    <div class="weui-tab__panel">
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
            <div class="weui-flex__item">
                <div class="placeholder">
                    <a href="javascript:;" class="disk-button">
                        <img src="/static/img/delete.png" width="30px" height="30px"/>
                    </a>
                </div>
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access" v-for="item in items" v-on:click="click(item)">
                <div class="weui-cell__hd">
                    <img v-bind:src="item.icon" style="width:20px;margin-right:5px;display:block">
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
      items: []
    }
  },
  created: function () {
    this.list()
  },
  watch: {
    '$route': 'list'
  },
  methods: {
    click: function (item) {
      if (item.type === 1) {
        let menu = []
        menu.push({
          label: '下载',
          onClick: () => {
            console.log('下载')
          }
        })
        menu.push({
          label: '基本信息',
          onClick: () => {
            console.log('基本信息')
          }
        })
        if (item.mime && item.mime.startsWith('image/')) {
          menu.unshift({
            label: '预览',
            onClick: () => {
              this.$router.push({name: 'Preview', query: { path: item.path }})
            }
          })
        }
        weui.actionSheet(menu)
      } else if (item.type === 2) {
        this.$router.push({name: 'Disk', query: { path: item.path }})
      }
    },
    list: function () {
      let path = this.$route.query.path
      if (path === undefined || path === '') {
        this.$http.get('http://api.dadoo.im:7777/pan/list').then(response => {
          let items = response.body.data
          for (let item of items) {
            if (item.type === 1) {
              item.icon = '/static/img/file.png'
              if (item.size < 1000000) {
                item.size = Math.round(item.size / 1000) + 'K'
              } else if (item.size < 1000000000) {
                item.size = Math.round(item.size / 1000000) + 'M'
              } else if (item.size < 1000000000000) {
                item.size = Math.round(item.size / 1000000000) + 'G'
              }
            } else if (item.type === 2) {
              item.icon = '/static/img/dir.png'
            }
          }
          this.items = items
        })
      } else {
        this.$http.get('http://api.dadoo.im:7777/pan/list?path=' + path).then(response => {
          let items = response.body.data
          for (let item of items) {
            if (item.type === 1) {
              item.icon = '/static/img/file.png'
              if (item.size < 1000000) {
                item.size = Math.round(item.size / 1000) + 'K'
              } else if (item.size < 1000000000) {
                item.size = Math.round(item.size / 1000000) + 'M'
              } else if (item.size < 1000000000000) {
                item.size = Math.round(item.size / 1000000000) + 'G'
              }
            } else if (item.type === 2) {
              item.icon = '/static/img/dir.png'
            }
          }
          this.items = items
        })
      }
    },
    mkdir: function () {
      let name = prompt('请输入文件夹名', '')
      if (name) {
        let path = this.$route.query.path
        if (path) {
          this.$http.post('http://api.dadoo.im:7777/pan/mkdir', {path, name}).then(response => {
            let r = response.body
            console.log(r.status)
            this.$router.push({name: 'Disk', query: { path: r.data.path }})
          })
        } else {
          this.$http.post('http://api.dadoo.im:7777/pan/mkdir', {name}).then(response => {
            let r = response.body
            console.log(r.status)
            this.$router.push({name: 'Disk', query: { path: r.data.path }})
          })
        }
      }
    },
    upload: function (e) {
      let formdata = new FormData()
      let path = this.$route.query.path
      if (path) {
        formdata.append('path', path)
      }
      console.log(e.target.files[0])
      formdata.append('file', e.target.files[0])
      console.log(formdata)
      this.$http.post('http://api.dadoo.im:7777/pan/upload', formdata).then(response => {
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
