<template>
  <div class="progress-circle" @click.stop="click">
    <slot></slot>
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" 
        :stroke-dasharray="dasharray"
        :stroke-dashoffset="dashoffset"
        />
    </svg>
  </div>
</template>
<script>
  export default {
    components: {
      
    },
    props: {
      radius: {
        type: Number,
        default: 100
      },
      percent: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        dasharray: Math.PI *  100
      };
    },
    computed: {
      dashoffset() {
        return -this.percent * this.dasharray;
      }
    },
    methods: {
      click() {
        this.$emit('clickProgress');
      }
    },
}
</script>
<style lang='stylus' scoped> 
  @import '../../common/stylus/variable.styl';
  .progress-circle
    position: relative
    circle
      stroke-width: 8px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-theme
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme-d
</style>