<template>
  <div id="app">
    <header></header>
    <div class="weui-tab">
      <router-view></router-view>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import AppFooter from './components/AppFooter'

export default {
  name: 'app',
  components: {
    AppFooter
  }
}
</script>

<style>
html {
  height:100%;
}
body {
  height:100%;
}
#app {
  height:100%;
}
</style>
