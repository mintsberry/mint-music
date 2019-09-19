<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <Scroll class="list-content" :data="playList" ref="scroll">
          <transition-group name="list" tag="ul">
            <li class="item" v-for="(item,index) in playList" :key="index" @click="selectItem(item,index)" ref="listItem">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like">
                <i class="icon-not-favorite"></i>
              </span>
              <span  class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </Scroll>
        <div class="list-operate">
          <div class="add" @click="addSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
        <Confirm ref="confirm" text="是否清空播放列表" confirmBtnText="清空" @confirm="confirmClear"></Confirm>
        <AddSong ref="addSong"></AddSong>
    </div>
  </transition>
</template>
<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import Confirm from '../../components/confirm/Confirm.vue';
  import Scroll from '../../components/scroll/Scroll.vue';
  import {playerMixin} from '../../common/js/mixin'
  import {playMode} from '../../common/js/config';
  import AddSong from '../../components/addSong/AddSong.vue'
  export default {
    components: {
      Scroll,
      Confirm,
      AddSong,
    },
    props: {
      
    },
    mixins: [
      playerMixin
    ],
    data () {
      return {
        showFlag: false
      };
    },
    computed: {
      modeText() {
        return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.loop ? '循环播放' : '随机播放'
      },
      ...mapGetters([
        'playList',
        'currentSong',
        'currentIndex'
      ])
    },
    watch:{
      currentIndex(newIndex, oldIndex) {
        if (!this.showFlag || newIndex === oldIndex){
          return 
        }
        this.scrollToCurrent(newIndex);
      }
    },
    methods: {
      show(){
        this.showFlag = true;
        setTimeout(() => {
          this.$refs.scroll.refresh();
          this.scrollToCurrent(this.currentIndex);
        }, 20);
      },
      addSong() {
        this.$refs.addSong.show();
      },
      scrollToCurrent(current){
        this.$refs.scroll.scrollToElement(this.$refs.listItem[current], 300);
      },
      hide() {
        this.showFlag = false
      },
      getCurrentIcon(item) {
        return this.currentSong.id === item.id ? 'icon-play' : '';
      },
      selectItem(item,index) {
        this.setCurrentIndex(index);
        this.setPlayingState(true);
      },
      deleteOne(item){
        this.deleteSong(item);
        if (!this.playList.length){
          this.hide();
        }
      },
      showConfirm() {
        this.$refs.confirm.show();
      },
      confirmClear(){
        this.deleteSongList();
        this.hide();
      },
      ...mapMutations({
        'setCurrentIndex': 'SET_CURRENT_INDEX',
        'setPlayingState': 'SET_PLAYING_STATE',
      }),
      ...mapActions([
        'deleteSong',
        'deleteSongList'
      ])
    },
}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl';
  .playlist
    position fixed;
    left 0
    right 0
    top 0
    bottom 0
    z-index 200
    background-color $color-background-d
    &.list-fade-enter-active,
    &.list-fade-leave-active
      transition opacity 0.3s
      .list-wrapper
        transition all 0.3s
    &.list-fade-enter,
    &.list-fade-leave-to
      opacity 0
      .list-wrapper
        transform translate3d(0, 100%, 0);
    .list-wrapper
      position absolute
      left 0
      bottom 0
      width 100%
      background-color $color-highlight-background
      .list-header
        position relative
        padding 20px 30px 10px 20px
        .title
          display flex
          align-items center
          .icon
            margin-right 10px
            font-size 30px
            color $color-theme-d
          .text
            flex 1
            font-size $font-size-medium
            color $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size $font-size-medium
              color $color-text-d
      .list-content
        max-height 240px
        overflow hidden
        .item
          display flex;
          align-items center
          height 40px
          padding 0 20px 0 10px
          overflow hidden
          &.list-enter-active,
          &.list-leave-active
            transition all 0.1s
          &.list-enter,
          &.list-leave-to
            height 0
          .current
            flex 0 0 20px
            width 20px
            margin-right 10px
            color $color-theme-d
          .text
            flex 1
            no-wrap()
            font-size $font-size-medium
            color $color-text-d
          .like
            extend-click()
            margin-right 15px
            font-size $font-size-medium
            color $color-theme
            .icon-favorite
              color $color-sub-theme
          .delete
            extend-click()
            font-size $font-size-medium
            color $color-theme
      .list-operate
        width 140px
        margin 20px auto 20px auto 
        .add
          display flex
          align-items center
          padding 8px 16px
          border 1px solid #fff
          border-radius 100px
          color $color-text-l
          .icon-add
            margin-right 5px
            font-size $font-size-small-s
          .text
            font-size $font-size-small
      .list-close
        text-align center
        line-height 50px
        background $color-background
        font-size $font-size-medium-x
        color $color-text-l
</style>