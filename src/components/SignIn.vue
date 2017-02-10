<template>
    <div class="weui-tab__panel">
        <div class="weui-cells__title">登录信息</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">手机号</label>
                </div>
                <div class="weui-cell__bd">
                    <input v-model="phone" class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入手机号">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">密码</label>
                </div>
                <div class="weui-cell__bd">
                    <input v-model="password" class="weui-input" type="password" placeholder="请输入密码">
                </div>
            </div>
        </div>
        <div class="signin">
            <a v-on:click="signin(phone,password)" class="weui-btn weui-btn_primary">登录</a>
        </div>
    </div>
</template>

<script>
import weui from 'weui.js'
export default {
  name: 'SignIn',
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    signin: function (phone, password) {
      this.$http.post('http://api.dadoo.im:7777/pan/login', {phone, password}).then(response => {
        let user = response.body.data
        localStorage['token'] = user.token
        localStorage['phone'] = user.phone
        this.$router.push('/user')
      }, response => {
        weui.topTips('用户名或密码错误', 2000)
      })
    }
  }
}
</script>

<style scoped>
.signin {
    position: absolute;
    bottom:70px;
    width: 100%;
}
</style>
