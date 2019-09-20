<template>
  <transition name="slider">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <Switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></Switches>
      </div>
      <div class="play-btn" ref="playBtn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <Scroll class="list-scroll" v-if="currentIndex === 0" :data="favoriteList" ref="favoriteList">
          <div class="scroll-inner">
            <SongList :songs="favoriteList" @select="selectSong"></SongList>
          </div>
        </Scroll>
        <Scroll class="list-scroll" v-if="currentIndex === 1" :data="playHistory" ref="playList">
          <div class="scroll-inner">
            <SongList :songs="playHistory" @select="selectSong"></SongList>
          </div>
        </Scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <NoResult :title="noResultDesc"></NoResult>
      </div>
    </div>
  </transition>
</template>
<script>
  import Switches from '../switches/Switches.vue'
  import Scroll from '../scroll/Scroll.vue';
  import SongList from '../songList/SongList.vue';
  import Song from '../../common/js/song';
  import {mapGetters, mapActions} from 'vuex';
  import {playlistMixin} from '../../common/js/mixin';
  import NoResult from '../noResult/NoResult.vue';
  export default {
    components: {
      Switches,
      Scroll,
      SongList,
      NoResult
    },
    props: {
      
    },
    mixins:[
      playlistMixin
    ],
    data () {
      return {
        currentIndex: 0,
        switches: [
          {name: '我喜欢的'},
          {name: '最近听的'}
        ]
      };
    },
    computed: {
      noResult() {
        if (this.currentIndex === 0){
          return !this.favoriteList.length
        } else {
          return !this.playHistory.length
        }
      },
      noResultDesc(){
        if (this.currentIndex === 0){
          return '暂无收藏歌曲'
        } else {
          return '你还没听过歌曲'
        }
      },
      ...mapGetters([
        'favoriteList',
        'playHistory'
      ])
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : '';
        this.$refs.listWrapper.style.bottom = bottom;
        this.$refs.favoriteList && this.$refs.favoriteList.refresh()
        this.$refs.playList && this.$refs.playList.refresh()
      },
      back(){
        this.$router.back();
      },
      switchItem(index) {
        this.currentIndex = index;
      },
      selectSong(song) {
        this.insertSong(new Song(song))
      },
      random() {
        let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
        if(list.length === 0){
          return;
        }
        list = list.map((song)=>{
          return new Song(song)
        })
        this.randomPlay({list})
      },
      ...mapActions([
        'insertSong',
        'randomPlay'
      ])
    },
}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl'
  .user-center
    position fixed
    top 0
    bottom 0
    z-index 100
    width 100%
    background $color-background
    &.slide-enter-active,
    &.slide-leave-active
      transition all .3s
    &.slider-enter,
    &.slider-leave-to
        transform translate3d(100%, 0, 0)
    .back
      position absolute
      top 0
      left 6px
      z-index 50
      .icon-back
        display block
        padding 10px
        font-size $font-size-large-x
        color $color-theme
    .switches-wrapper
      margin 10px 0 18px 0
    .play-btn
      box-sizing border-box
      width 135px
      padding 7px 0
      margin 0 auto
      text-align center
      border 1px solid $color-text-l
      color $color-text-l
      border-radius 100px
      font-size 0
      .icon-play
        display inline-block
        vertical-align middle
        margin-right 6px
        font-size $font-size-medium-x
      .text
        display inline-block
        vertical-align middle
        font-size $font-size-small
    .list-wrapper
      position absolute
      top 110px
      bottom 0
      width 100%
      .list-scroll
        height 100%
        overflow hidden
        .list-inner
          padding 20px 30px
    .no-result-wrapper
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>