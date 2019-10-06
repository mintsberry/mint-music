<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGruop">
      <slot>
      </slot>
    </div>
    <div class="dots">
        <span class="dot" v-for="(item, index) in dots" :key="index" :class="{active : currentIndex === index}">
        </span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import {addClass} from '../../common/js/dom'
import { setTimeout, clearTimeout } from 'timers';
import { truncate } from 'fs';
import { constants } from 'crypto';
  export default {
    components: {
    },

    props: {
      isLoop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 2000
      }
    },

    data () {
      return {
        currentIndex: 0,
        children:[],
        dots: []
      };
    },

    computed: {
      
    },

    mounted(){
      setTimeout(() => {
        //设置轮播图宽度
        this._setSliderWidth();
        //初始化
        this._initDots();
        this._initSlider();
        if (this.autoPlay){
          this._play();
        }
      },20);
      //检测窗口大小变更，刷新轮播图
      window.addEventListener('resize', () => {
        if (!this.slider){
          return 
        }
        this._setSliderWidth(true);
        this.slider.refresh;
      })
    },
    
    deactivated() {
      clearTimeout(this.timer)
    },
    
    beforeDestroy() {
      clearTimeout(this.timer)
    },

    methods: {
      //根据视口宽度计算出sliderGroup宽度
      //给sliderGroup子节点添加样式
      _setSliderWidth(isResize){
        this.children = this.$refs.sliderGruop.children;
        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth; 
        for (let i = 0; i < this.children.length; i++){
          let child = this.children[i];
          addClass(child, 'slider-item');
          child.style.width = sliderWidth + "px";
          width += sliderWidth;
        }
        if (this.isLoop && !isResize){
          width += 2 * sliderWidth;
        }
        this.$refs.sliderGruop.style.width = width + "px";
      },
      _initDots(){
        this.dots = new Array(this.children.length);
      },
      _initSlider(){
        //运行x轴滑动 禁止y轴
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap:  {
            loop: true,
            threshold: 0.3,
          },
        })
        this.slider.on('scrollEnd', () => {
          //获取轮播图当前页索引
          let pageIndex = this.slider.getCurrentPage().pageX;
          //循环轮播图会复制第一张图片 索引值需要--
          if (this.loop) {
            pageIndex -= 1;
          }
          this.currentIndex = pageIndex;
          //自动播放清除定时器，防止当手动滑动时与定时器滑动重复
          if (this.autoPlay){
            clearTimeout(this.timer)
            this._play();
          }
        })
      },
      _play(){
        // let pageIndex = this.currentIndex + 1;
        // if (this.loop){
        //   pageIndex += 1
        // }
        this.timer = setTimeout(() => {
          this.slider.next(400);
        }, this.interval);
      }
    },
}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl'
  .slider
    position relative
    min-height 1px
    .slider-group
      position relative
      overflow hidden
      white-space nowrap
      .slider-item
        float left
        box-sizing border-box
        text-align center
        a
          display block
          width 100%
          overflow hidden
          text-decoration none 
        img
          display block
          width 100%
    .dots
      position absolute
      right 0
      left 0
      bottom 12px
      text-align center
      font-size 0
      .dot
        display inline-block
        margin 0 4px
        width 8px
        height 8px
        border-radius 50%
        background $color-text-l
        &.active
          width 20px
          border-radius 4px
          background $color-text-ll
</style>