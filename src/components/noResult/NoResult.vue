<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>
<script>
  export default {
    components: {
      
    },
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
      };
    },
    computed: {
      
    },
    methods: {
      
    },
}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl';
  .no-result
    text-align center
    .no-result-icon
      width 86px
      height 90px
      margin 0 auto 
      background-image url("mint.png")
      background-repeat no-repeat
      background-size: 86px 80px
    .no-result-text
      margin-top 30px
      font-size $font-size-medium
      color $color-text-d
</style>