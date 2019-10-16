<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>
<script>
import Header from './views/header/Header.vue'
import Tab from './views/tab/Tab.vue'
import Player from './views/player/Player.vue'
export default {
  components: {
    Header,
    Tab,
    Player
  },
  mounted () {
    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
      let bodyTag = document.getElementsByTagName('body')[0]
      bodyTag.style.height = screen.height + 'px'
    }
    setTimeout(() => {
      window.scrollTo(0, 100)
    }, 1000)
  }
}
</script>
<style lang="stylus">
  @import "./common/stylus/variable.styl"
</style>
