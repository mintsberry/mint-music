<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
