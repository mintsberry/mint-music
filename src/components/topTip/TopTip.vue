<template>
  <transition name="drop">
    <div class="top-tip" v-show="showFlag">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
  export default {
    components: {
      
    },
    props: {
      
    },
    data () {
      return {
        showFlag = false;
      };
    },
    computed: {
      
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
      },
    },
}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl';
  .top-tip
    position fixed
    top 0
    width 100%
    z-index 500
    background $color-dialog-background
    &.drop-enter-active,
    &.drop-leave-active
      transition all .3s
    &.drop-enter,
    &.drop-leave-to
      transform translate3d(0,-100%,0)
</style>