<template>
  <transition name="silde">
    <div class="add-song" v-show="showFlag"  @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <SearchBox placeholder="搜索歌曲" @query='onQueryChange' ref="searchBox"></SearchBox>
      </div>
      <div class="shortcut" v-show="!query">
        <Switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></Switches>
        <div class="list-wrapper">
          <Scroll class="list-scroll" v-if="currentIndex === 0" :data="playHistory" ref="songList">
            <div class="scroll-inner">
              <SongList :songs="playHistory" @select="selectSong"></SongList>
            </div>
          </Scroll>
          <Scroll class="list-scroll" v-if="currentIndex === 1" :data="searchHistory" ref="searchList">
            <div class="list-inner">
              <SearchList @delete='deleteSearchHistory' @select="addQuery" :searches="searchHistory"></SearchList>
            </div>
          </Scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <Suggest :query="query" :showSinger="showSinger" @select="selectSuggest" @listScroll="blurInput"></Suggest>
      </div>
    </div>
  </transition>
</template>
<script>
  import SearchBox from '../../components/searchBox/SearchBox.vue'
  import Suggest from '../../views/suggest/Suggest.vue';
  import {searchMixin} from '../../common/js/mixin'
  import Switches from '../switches/Switches.vue'
  import Scroll from '../scroll/Scroll.vue';
  import {mapGetters, mapActions} from 'vuex';
  import SongList from '../songList/SongList.vue';
  import Song from '../../common/js/song'
  import SearchList from '../searchList/SearchList.vue'
  export default {
    components: {
      SearchBox,
      Suggest,
      Switches,
      Scroll,
      SongList,
      SearchList
    },
    props: {
      
    },
    mixins:[
      searchMixin
    ],
    data () {
      return {
        showFlag: false,
        showSinger: false,
        currentIndex: 0,
        switches: [
          {name:'最近播放'},
          {name:'搜索历史'}
        ]
      };
    },
    computed: {
      ...mapGetters([
        'playHistory'
      ])
    },
    methods: {
      show() {
        this.showFlag = true;
        setTimeout(() => {
          if (this.currentIndex===0) {
            this.$refs.songList.refresh();
          } else if (this.currentIndex===1) {
            this.$refs.searchList.refresh();
          }
        }, 20);
      },
      hide() {
        this.showFlag = false;
      },
      selectSuggest() {
        this.saveSearch();
      },
      switchItem(index) {
        this.currentIndex = index;
      },
      selectSong(song, index){
        if (index !== 0) {
          this.insertSong(new Song(song));
        }
      },
      ...mapActions([
        'insertSong'
      ])
    },
}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/mixin.styl';
  @import '../../common/stylus/variable.styl';
  .add-song
    position fixed
    top 0
    bottom 0
    width 100%
    z-index 200
    background $color-background
    &.slide-enter-active,
    &.slide-leave-active
      transition all .3s
    &.slide-enter,
    &.slide-leave-to
      transform translate3d(100%, 0, 0)
    .header
      position relative
      height 44px
      text-align center
      .title
        line-height 44px
        font-size $font-size-large
        color $color-text-ll
      .close  
        position absolute
        top 0
        right 8px
        .icon-close
          display block
          padding 12px
          font-size 20px
          color $color-theme
    .search-box-wrapper
      margin 20px
    .shortcut
      .list-wrapper
        position absolute 
        top 165px
        bottom 0
        width 100%
        .list-scroll
          height 100%
          overflow hidden
          .list-inner
            padding 10px 0px
          .list-inner
            padding 10px 30px
    .search-result
      position fixed
      top 124px
      bottom 0
      width 100%
    
</style>