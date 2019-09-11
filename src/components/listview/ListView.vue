<template>
  <Scroll class="listview" 
  :data="data" 
  ref="listview" 
  :listenScroll = "listenScroll"
  :probeType="probeType"
  @scroll="scroll">
    <ul>
      <li v-for="(group, index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item, index) in group.item" :key="index"  class="list-group-item" @click="selectItem(item)">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" v-show="data.length" @touchstart="onShortcutTouchStart" @touchmove.stop="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" class="item" :class="{ 'current' : currentIndex === index }" :key="index" :data-index="index" >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <dir v-show="!data.length" class="loading-container">
      <Loading></Loading>
    </dir>
  </Scroll>
</template>

<script>
  import {getData} from '../../common/js/dom'
  import Scroll from '../scroll/Scroll.vue'
  import Loading from '../loading/Loading.vue'
  const ANCHOR_HEIGHT = 18;
  const TITLE_HEIGHT = 30
  export default {
    components: {
      Scroll,
      Loading
    },

    props: {
      data: {
        type: Array,
        default: [],
      }
    },

    data () {
      return {
        scrollY: -1, 
        currentIndex: 0,
        diff:-1
      };
    },
    computed: {
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1);
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
      },
  
    },

    watch: {
      data(){
        setTimeout(() => {
          this._calculateHeight()
        }, 20);
      },
      scrollY(newY){
        const listenHeight = this.listenHeight;
        if (newY > 0) {
          this.currentIndex = 0;
          return;
        }
        for (let i = 0; i < listenHeight.length - 1; i++){
          let heightlow = listenHeight[i];
          let heighttop = listenHeight[i+1];
          if (-newY >= heightlow && -newY < heighttop) {
            this.currentIndex = i
            this.diff = heighttop + newY;
            return 
          }
        }
        this.currentIndex = listenHeight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < 30) ? newVal - TITLE_HEIGHT : 0;
        if (this.fixedTop === fixedTop) {
          return 
        }
        this.fixedTop = fixedTop;
        this.$refs.fixed.style.transform = `translate3D(0,${fixedTop}px,0`
      }
    },

    created() {
      this.touch = {};
      this.listenScroll = true;
      this.listenHeight = [];
      this.probeType = 3;
    },

    methods: {
      onShortcutTouchStart(event) {
        let anchorIndex = getData(event.target, 'index');
        let firstTouch = event.touches[0];
        this.touch.y1 = firstTouch.pageY;
        this.touch.anchorIndex = anchorIndex;
        this._scrollTo(this.touch.anchorIndex);
      },
      onShortcutTouchMove(event) {
        let firstTouch = event.touches[0];
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let index = parseInt(this.touch.anchorIndex) + parseInt(delta);
        this._scrollTo(index);
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      refresh(){
        this.$refs.listview.refresh();
      },
      selectItem(item) {
        this.$emit("select", item)
      },
      _scrollTo(index) {
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
      },
      _calculateHeight() {
        this.listenHeight = []; 
        const list = this.$refs.listGroup;
        let height = 0;
        this.listenHeight.push(height);
        for (let i = 0; i < list.length; i++){
          let el = list[i];
          height += el.clientHeight;
          this.listenHeight.push(height);
        }
      }
    },

}
</script>
<style lang='stylus' scoped>
  @import "../../common/stylus/variable.styl";
  .listview
    position relative
    width 100%
    height 100%
    overflow hidden
    background $color-background
    .list-group
      padding-bottom 30px
      .list-group-title
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background $color-highlight-background
      .list-group-item
        display flex
        align-items center
        padding 20px 0 0 30px
        .avatar 
          width 50px
          height 50px
          border-radius 50%
        .name
          margin-left 20px
          color $color-text-l
          font-size $font-size-medium
    .list-shortcut
      position absolute
      z-index 30
      right 10px
      top 50%
      transform translateY(-50%)
      width 20px
      padding 20px 0
      border-radius 10px
      text-align center
      background $color-background-d
      font-family Helvetica
      .item
        padding 3px
        line-height 1
        color $color-text-l
        font-size $font-size-small
        &.current
          color $color-theme
          transform scale(1.2)
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
      padding 0
</style>