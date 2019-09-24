<template>
  <transition class="fade">
    <div class="mv-list">
      <div class="back">
        <i class="icon-back" @click="back"></i>
      </div>
      <h1 class="title" v-html="topList.title"></h1>
      <div class="bg-image" :style="bgStyle" ref="bgImage">
        <div class="play-wrapper">
        </div>
        <div class="filter" ref="filter"></div>
      </div>
      <Scroll :data="video" class="list" ref="list" >
        <div class="mv-list-wrapper">
          <ul>
            <li class="item" v-for="(item,index) in video" :key="index" @click="selectItem(item)">
              <div class="media">
                <img class="cover" :src="item.cover">
                <div class="filter" ref="filter"></div>
              </div>
              <div class="item-title">
                <div class="name">{{item.name}}</div>
                <div class="singer">{{item.singers}}</div>
              </div>
              <div class="song-info">
                <span class="rank">{{index + 1}}</span>
                <span class="updateTime">{{updTime(item.pudate)}}</span>
              </div>
              <div class="play-count">
                <svg t="1569070216082" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3538" width="20" height="20"><path d="M825.167761 350.235053L344.653225 36.853457C281.976141-4.931691 224.525867-10.152124 177.51901 15.962796 125.287894 42.078992 99.172973 94.305007 99.172973 167.426784v689.4339c0 73.120502 26.11492 125.352893 73.121778 151.467813 15.670227 10.444693 36.560889 15.670227 57.450274 15.670228 36.560889 0 73.121777-15.670227 109.682666-36.560889l485.74007-329.051823c57.45155-41.782598 88.792005-94.012438 88.792005-156.688247s-31.34173-114.901824-88.792005-151.462713zM778.160905 580.045077L292.420834 909.090525c-31.335354 20.890661-57.45155 26.116196-78.342211 20.890661-15.670227-10.443418-26.11492-36.560889-26.11492-73.120502V167.426784c0-36.560889 10.444693-67.896243 26.11492-73.121777 5.220434-5.220434 10.445968-5.220434 20.890661-5.220434 15.670227 0 36.560889 5.220434 62.675809 20.890662L778.160905 423.35683c31.335354 20.889386 52.231116 52.226015 52.231116 78.340936 0 26.116196-20.894487 57.45665-52.231116 78.347311z m0 0" fill="#e6e6e6" p-id="3539"></path></svg>
                <span class="count">{{countParse(item.play)}}</span>
              </div>
              <div class="play-icon" v-if="item.pic">
                <img :src="item.pic" width="48px" height="48px" alt="">
              </div>
            </li>
          </ul>
        </div>
        <div class="loading-container" v-show="!video.length">
          <Loading></Loading>
        </div>
    </Scroll>
    <router-view></router-view>
    </div>
  </transition>
</template>
<script>
  import {getMvList} from '../../api/rank';
  import { ERR_OK } from '../../api/config';
  import Video from '../../common/js/video';
  import { mapGetters, mapMutations } from 'vuex';
  import Scroll from '../../components/scroll/Scroll.vue';
  import Loading from '../../components/loading/Loading.vue';
  import {numParse,formatDate} from '../../common/js/util';
  export default {
    components: {
      Scroll,
      Loading
    },
    props: {
      
    },
    data () {
      return {
        video: []
      };
    },
    computed: {
      bgStyle() {
        if (this.video.length){
          return `background-image:url(${this.video[0].cover})`
        }
      },
      ...mapGetters([
        'topList'
      ])
    },
    created() {
      getMvList().then((resp)=>{
        if (resp.code === ERR_OK) {
          this.video = this._normalizeVideo(resp.request.data.rank_list);
        }
      })
    },
    methods: {
      back(){
        this.$router.back();
      },
      countParse(count) {
        return numParse(count);
      },
      updTime(time) {
        let date = new Date(time);
        // return formatDate(time,'yyyy-MM-dd')
      },
      selectItem(item) {
        this.setVideo(item);
        this.$router.push({
          path: `/rank/mv/${item.vid}`
        })
      },
      updTime(time) {
        let date = new Date(time * 1000);
        return formatDate(date,"yyyy-MM-dd");
      },
      _normalizeVideo(list){
        let ret = [];
        list.forEach(element => {
          ret.push(new Video(element.video_info,element.medal.basic,element.rank_data));
        });
        return ret;
      },
      ...mapMutations({
        setVideo: 'SET_VIDEO'
      })
    },
}
</script>
<style lang='stylus' scoped>
  @import "../../common/stylus/variable.styl";
  @import "../../common/stylus/mixin.styl";
  .mv-list
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    z-index 100
    background $color-background
    .back
      position fixed
      z-index 40
      top 0
      left 6px
      .icon-back
        display: block;
        padding: 10px;
        font-size: 22px;
        color: $color-theme
    .title
      position absolute
      top 0
      left 10%
      z-index 40
      width 80%
      no-wrap()
      text-align center
      line-height 42px
      font-size $font-size-large
      color $color-text
    .list
      position fixed
      top 48px
      bottom 0
      width 100%
      background $color-background
      overflow hidden
      .mv-list-wrapper
        padding 0px
        .item
          display flex
          position relative
          margin 16px
          box-sizing border-box
          font-size $font-size-medium
          .item-title
            position absolute
            margin 14px
            color $color-text
            left 0
            right 80px
            .name
              margin-bottom 4px
              font-size $font-size-medium-x
              no-wrap()
            .singer
              font-size $font-size-medium
          .song-info
            position absolute
            margin 14px
            bottom 0px
            color $color-text
            .rank
              margin-right 4px
              font-size 26px
            .updateTime
              font-size $font-size-small
          .play-icon
            position absolute
            margin 14px
            bottom 0
            right 0
          .play-count
            position absolute
            margin 14px
            top 0
            right 0
            .count
              margin-left 2px
              line-height 16px
              vertical-align top
          .media
            position relative
            width 100%
            &:before
              content ''
              display block
              padding-top 56.2%
          .cover
            position absolute 
            top 0
            left 0 
            border-radius 4px
            width 100%
            height 100%
          .filter
            position absolute
            width 100%
            height 100%
            top 0
            left 0
            background rgba(7,17,27,0.4)
      .loading-container
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
</style>