<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="btn"
        @touchstart.prevent = "progressTouchStart"
        @touchmove.prevent = "progressTouchMove"
        @touchend.prevent = 'progressTouchEnd'
      >
        <div class="progress-btn" ></div>
      </div>
    </div>
  </div>
</template>
<script>
  const progressBtnWidth = 16;
  export default {
    components: {
      
    },
    props: {
      percent: {
        type: Number,
        default: 0
      },

    },
    data () {
      return {
      };
    },
    computed: {
      
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated && this.progressBarWidth > 0){
          const barWidth = this.progressBarWidth - progressBtnWidth;
          const offsetWidth = newPercent * barWidth;
          console.log("TCL: percent -> offsetWidth", offsetWidth)
          this._offset(offsetWidth);
        }
      }
    },
    created(){
      this.touch = {}
    },
    mounted() {
      this.progressBarWidth = this.$refs.progressBar.clientWidth;
    },
    methods: {
      progressClick(e) {
        this._offset(e.offsetX - progressBtnWidth/2);
        this._triggerPercent();
      },
      progressTouchStart(e) {
        this.touch.initiated = true;
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return 
        }
        const deltaX = e.touches[0].pageX - this.touch.startX;
        const offsetWidth = Math.min(Math.max(0, this.touch.left + deltaX), this.$refs.progressBar.clientWidth - progressBtnWidth);
        this._offset(offsetWidth);
      },
      progressTouchEnd(e) {
        this.touch.initiated = false;
        this._triggerPercent();
      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.btn.style.transform = `translate3d(${offsetWidth}px, 0px, 0px)`
      },
      _triggerPercent(){
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const percent = this.$refs.progress.clientWidth / barWidth;
        this.$emit('percentChange', percent);
      }
    },
}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl';
  .progress-bar
    height 30px
    .bar-inner
      position relative
      top 13px
      height 4px
      background rgba(0,0,0,0.3)
      .progress
        position absolute
        height 100%
        background $color-theme
      .progress-btn-wrapper
        position absolute
        left -8px
        top -13px
        width 30px
        height 30px
        .progress-btn
          position relative
          top 7px
          left 7px
          box-sizing border-box
          width 16px
          height 16px
          border 3px solid $color-text
          border-radius 50%
          background $color-theme
</style>