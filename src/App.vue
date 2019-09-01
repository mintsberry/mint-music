<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from './views/header/Header.vue'
import Tab from './views/tab/Tab.vue'
export default {
  components: {
    Header,
    Tab
  },

}
</script>
<style lang="stylus">
  @import "./common/stylus/variable.styl"
</style>
