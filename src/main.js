// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import weui from 'weui.js'

Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', localStorage['token'])
  next(function (response) {
    if (response.status === 401) {
      weui.toast('token已过期，请重新登录', 1000)
      localStorage.clear()
      this.$router.push('/signin')
    }
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

