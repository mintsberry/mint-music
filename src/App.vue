<template>
  <div id="app">
    <Header></Header>
  </div>
</template>
<script>
import Header from './components/header/Header.vue'
export default {
  components: {
    Header
  },

}
</script>
<style lang="stylus">
  @import "./common/stylus/variable.styl"
  #app
    color $color-theme
</style>
