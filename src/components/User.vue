<template>
    <div class="weui-tab__panel">
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>手机号</p>
                </div>
                <div class="weui-cell__ft">{{phone}}</div>
            </div>
        </div>
        <div class="signout">
            <a v-on:click="signout" class="weui-btn weui-btn_warn">退出</a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      phone: localStorage['phone']
    }
  },
  methods: {
    signout: function () {
      localStorage.clear()
      this.$router.push('/signin')
    }
  }
}
</script>

<style scoped>
.signout {
    position: absolute;
    bottom:100px;
    width: 100%;
}
</style>
