<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif" alt="">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
  export default {
    components: {
      
    },

    props: {
      title: {
        type: String,
        default: 'Loading'
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
  .loading
    width 100%
    text-align center
    .desc
      line-height 20px
      font-size $font-size-small
      color $color-text-l
</style>