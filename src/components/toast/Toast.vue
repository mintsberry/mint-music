<template>
  <div class="toast" v-show="showFlag">
    <i class="icon icon-close"></i>
    <p class="text">{{content}}</p>
  </div>
</template>
<script>
  export default {
    components: {
      
    },
    props: {
      content: {
        type: String,
        default: ""
      },
      delay: {
        type: Number,
        default: 1000
      }
    },
    data () {
      return {
        showFlag: false
      };
    },
    computed: { 
    },
    methods: {
      show() {
        this.showFlag = true;
        setTimeout(() => {
          this.hide();
        }, this.delay);
      },
      hide() {
        this.showFlag = false;
      }
    },
}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl'
  .toast
    position fixed
    display flex
    top 50%
    left 50%
    z-index 999
    height 120px
    width 120px
    background rgba(0, 0, 0, 0.5)
    border-radius 4px
    flex-direction column
    align-items center
    justify-content center
    text-align center
    transform translate(-50%,-50%)
    .icon
      font-size $font-size-large-x
      color $color-text-ll
      margin-bottom 10px
    .text
      font-size $font-size-medium
      color $color-text-ll
</style>