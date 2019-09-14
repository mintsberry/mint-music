<template>
  <div class="rank" ref="rank">
    <Scroll :data="topGroup" class="toplist" ref="scroll"> 
      <ul>
        <li v-for="(item, index) in topGroup" :key="index" class="group">
          <div class="top-title">{{item.groupName}}</div>
          <ul>
            <li class="item" v-for="(item, index) in item.toplist" :key="index" @click="selectItem(item)">
              <div class="icon">
                <img :src="item.frontPicUrl" alt="" width="100" height="100">
              </div>
              <ul class="songlist">
                <li class="song" v-for="(song, index) in item.song" :key="index">
                  <span>{{index+1}}</span>&nbsp;
                  <span class="song-text">{{song.title}}</span>
                  <span> - {{song.singerName}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </Scroll>
    <div class="loading-wrapper" v-show="!topGroup.length">
      <Loading></Loading>
    </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>  
  </div>
</template>

<script> 
  import {mixin} from "../../common/js/mixin"
  import {getTopList} from "../../api/rank"
  import {ERR_OK} from '../../api/config'
  import Scroll from '../../components/scroll/Scroll.vue'
  import Loading from '../../components/loading/Loading.vue'
  import {playlistMixin} from '../../common/js/mixin'
  import {mapMutations} from 'vuex'
  export default {
    components: {
      Scroll,
      Loading
    },

    props: {
      
    },

    data () {
      return {
        topGroup: [],
        topList: []
      };
    },
    mixins: [ 
      playlistMixin
    ],
    computed: { 
    },
    created() {
      this._getTopList()
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length? '60px' : '';
        this.$refs.rank.style.bottom = bottom;
        this.$refs.scroll.refresh();
      },
      selectItem(item) {
        this.setTopList(item);
        this.$router.push({
          path: `/rank/${item.topId}`
        })
      },
      _getTopList(){
        getTopList().then((resp)=>{
          if (resp.code === ERR_OK){
            this.topGroup = resp.req_0.data.group
          }
        })
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
        }
      )
    },

}
</script>
<style lang='stylus' scoped>
  @import "../../common/stylus/variable.styl";
  @import "../../common/stylus/mixin.styl";
  .rank
    position fixed
    width 100%
    top 88px
    bottom 0
    .toplist
      height 100%
      overflow hidden
      .group
        .top-title
          height 32px
          line-height 32px
          text-align:center
          color $color-text-l
          font-size $font-size-medium-x
          background $color-background           
        .item
          display flex
          margin 0 20px
          padding-top 20px
          &:first-child
            padding-top 0px
          .icon
            flex: 0 0 100px
            width: 100px
            height: 100px
          .songlist
            flex 1
            display flex
            flex-direction column
            justify-content center
            padding 0 20px
            height 100px
            overflow hidden
            background $color-highlight-background
            color $color-text-d
            font-size $font-size-medium
            .song
              no-wrap()
              line-height 26px
            .song-text
              color $color-text-ll
        &:last-child
          padding-bottom 20px
    .loading-wrapper
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
    .fade-enter-active,
    .fade-leave-active
      transition all .2s linear 
    .fade-enter,
    .fade-leave-to
      transform translateX(100%)
</style>