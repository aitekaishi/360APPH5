<template>
  <div id="app" style="height: 100%;">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import '../node_modules/vux/src/styles/reset.less';
  @import '../node_modules/vux/src/styles/1px.less';
  @import './assets/theme.less';
  #app {
  	-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
    background-color: #f8f8f8;
  }
</style>
