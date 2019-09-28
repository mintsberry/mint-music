<template>
  <div class="music-video">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <VideoPlayer ref="video" class="video" :videoUrl="videoUrl" :posterUrl="mvInfo.cover_pic"></VideoPlayer>
    <Scroll class="video-info" :data="this.other" ref="scroll">
      <div>
        <div class="mv-info">
          <div class="title">
              <h1 class="text" :style="mvInfo.desc ? '24px' : '0'"> 
              <svg class="icon-mv" viewBox="0 0 38 22" width="22" height="22" v-show="mvInfo.type === 0">
              <title>MV</title>
              <path d="M33,0.5H5c-2.5,0-4.5,2-4.5,4.5v12c0,2.5,2,4.5,4.5,4.5h28c2.5,0,4.5-2,4.5-4.5V5C37.5,2.5,35.5,0.5,33,0.5z
              M36,17c0,1.7-1.4,3-3,3H5c-1.7,0-3-1.3-3-3V5c0-1.7,1.3-3,3-3h28c1.7,0,3,1.3,3,3V17z M17.8,5.6h2.1V17h-1.7V8.9H18L14.5,17H13
              L9.5,8.9H9.4V17H7.7V5.6h2.1l4,9.2L17.8,5.6z M29.3,5.6h1.9l-4,11.4h-2.1L21,5.6h1.9l3.2,9.5L29.3,5.6z"></path>
              </svg>
              {{mvInfo.name}}
              </h1>
              <svg v-show="this.mvInfo.desc" @click="moreDesc" ref="arrow" t="1569394825973" class="arrow" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7547" width="16" height="16" >
                <path d="M75.243 550.694L511.291 88.357l436.047 462.337z" fill="#cdcdcd" p-id="7548"></path><path d="M948.766 622.173a4.972 4.972 0 0 0-1.431 0H75.228c-28.518 0-54.35-16.965-65.625-43.145a71.548 71.548 0 0 1 13.615-77.424L459.272 39.3c27.018-28.623 77.005-28.623 104.021 0l428.374 454.206c17.349 13.055 28.588 33.79 28.588 57.178 0 39.515-32.01 71.489-71.489 71.489zM240.93 479.196h540.705L511.283 192.542 240.931 479.196z" fill="#cdcdcd" p-id="7549">
                </path>
              </svg>
          </div>
          <div class="author"><i class="icon-mine"></i><span class="text">{{getVideoAuthor(mvInfo)}}</span></div>
          <div class="playCnt">总播放{{countPlay}}次</div>
          <div class="pub"><span>发布:{{pubDate(this.mvInfo.pubdate)}}</span>&nbsp;<span>时长{{durTime}}</span></div>
          <div class="desc" v-show="this.mvInfo.desc" v-html="parseDesc(this.mvInfo.desc)" ref="desc"></div>
        </div>
        <ul class="relate-list">
          <li class="item border-1px" v-for="(item, index) in other" :key="index" @click="selectItem(item)">
            <div class="mv-pic" width="135px">
              <img :src="item.cover_pic" alt="" width="100%" height="100%">
            </div>
            <div class="content">
              <h2 class="name">{{item.name}}</h2>
              <div class="introduce">
                <span class="author">来自：{{getVideoAuthor(item)}}</span>&nbsp;
                <!-- <span class="time">{{pubDate(item.pubdate)}}</span> -->
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Scroll>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import {getMv,getMvInfoAndOther} from '../../api/mv';
import Scroll from '../../components/scroll/Scroll.vue';
import VideoPlayer from '../videoPlayer/VideoPlayer.vue';
import { ERR_OK } from '../../api/config';
import { numParse, formatDate } from '../../common/js/util';
import { filterSinger } from '../../common/js/song';
  export default {
    components: {
      Scroll,
      VideoPlayer
    },
    props: {
      
    },
    data () {
      return {
        mp4Url: [],
        videoUrl: '',
        mvInfo: {},
        other: [],
        toggleDesc: false
      };
    },
    computed: {
      countPlay() {
        if (!this.mvInfo.playcnt) {
          return '';
        }
        return numParse(this.mvInfo.playcnt);
      },
      durTime() {
        if (!this.mvInfo.duration){
          return '';
        }
        return this.format(this.mvInfo.duration);
      },
      ...mapGetters([
        'video'
      ])
    },
    watch: {
      mp4Url(){
        for (let i = this.mp4Url.length-1; i >= 0; i--){
        let freeflow = this.mp4Url[i].freeflow_url;
          if (freeflow.length) {
            for (let j = 0; j < freeflow.length; j++){
              if (freeflow[j] && freeflow[j]!==''){
                this.videoUrl = freeflow[j];
                return;
              }
            }
          }
        }
      },
      toggleDesc(newValue) {
        if (newValue) {
          this.$refs.desc.style.height = 'auto';
        } else {
          this.$refs.desc.style.height = '16px';
        }
      }
    },
    created(){
      this.rotate = 0;
      if (Object.keys(this.video).length === 0) {
        this.$router.push('/rank');
        return;
      }
      this.closePlayer();
      this.getMvInfo(this.video.vid);
    },
    mounted() {
      let width = document.documentElement.offsetWidth;
      let height = width / 1.75 | 0
      this.$refs.video.$el.style.width = `${width}px`;
      this.$refs.video.$el.style.height = `${height}px`;
      this.$refs.scroll.$el.style.top = `${height}px`;
      this.$refs.scroll.refresh();
    },
    beforeDestroy() {
      this.setPlayerDisplay(true);
    },
    methods: {
      back(){
        this.$router.back();
      },
      selectItem(item){
        this.getMvInfo(item.vid);
        this.$refs.video.switchVideo();
        console.log("TCL: selectItem -> this.$refs.video", this.$refs.video.switchVideo())
      },
      moreDesc() {
        this.rotate += 180;
        this.$refs.arrow.style.transform = `rotate(${this.rotate}deg)`;
        this.toggleDesc = !this.toggleDesc;
      },
      getMvInfo(vid){
        getMv(vid).then((resp)=>{
          if (resp.code === ERR_OK) {
            if (resp.getMvUrl.data && resp.getMvUrl.data[vid]) {
              this.mp4Url = resp.getMvUrl.data[vid].mp4;
            }
          }
        })
        getMvInfoAndOther(vid).then((resp)=>{
          if (resp.code === ERR_OK) {
            this.mvInfo = resp.mvinfo.data[vid];
            this.other = resp.other.data.list;
          }
        })
      },
      getVideoAuthor(mvInfo) {
        if (!mvInfo.singers && !mvInfo.uploader_nick){
          return '';
        }
        if (mvInfo.singers.length) {
          return filterSinger(mvInfo.singers);
        } else {
          return mvInfo.uploader_nick
        }
      },
      format(interval){
        interval = interval | 0;
        let minute = interval / 60 | 0;
        let second = interval % 60;
        if (second.toString().length == 1){
          second = '0' + second;
        }
        return `${minute}:${second}`
      },
      pubDate(update) {
        if (!update){
          return '';
        }
        let date = new Date(update*1000);
        return formatDate(date,"yyyy-MM-dd")
      },
      parseDesc(text) {
        if (!text || text===''){
          return '';
        }
        return text.replace(/\n/ig,"<br>")
      },
      getVideoHight() {
        console.log(this.$refs.video.clientHeight);
        return this.$refs.video.clientHeight;
      },
      ...mapActions([
        'closePlayer'
      ]),
      ...mapMutations({
        setPlayerDisplay: 'SET_PLAYER_DISPLAY'
      })
    },
}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl'
  .music-video
    position fixed
    z-index 200
    top 0
    left 0
    bottom 0
    right 0
    background-color  $color-highlight-background
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
    // .video-player
    //   .video
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    .video-info
      position absolute
      top 233px
      right 0
      bottom 0
      left 0
      overflow hidden
      .mv-info
        background-color $color-background-d
        border-radius 4px
        padding 8px
        margin-bottom 6px
        font-size $font-size-small
        color $color-text-l
        .title
          position relative
          margin-bottom 4px
          line-height 22px
          font-size $font-size-medium-x
          color $color-text-ll
          .icon-mv
            fill $color-text-ll
            margin-right 4px
            vertical-align: top;
          .text
            margin-right: 24px
            vertical-align top
          .arrow
            position absolute
            top 6px
            right 0
            transform-origin 50% 30%
            transition all 0.3s ease
        .author
          margin-bottom 8px
          .text
            margin 0 4px;
        .playCnt
          margin-bottom 8px
        .pub
          margin-bottom 8px
        .desc
          word-break: break-all
          height 16px;
          overflow hidden;
          line-height 16px
      .relate-list
        background-color $color-background-d
        border-radius 4px
        padding 8px
        .item
          display flex
          padding 8px 0px
          align-items center
          font-size $font-size-medium
          color $color-text-ll
          border-1px($color-highlight-background)
          &:first-child
            padding-top 0
          &:last-child
            padding-bottom 0
            border none
          .mv-pic
            position relative
            flex 0 0 135px
            width 135px
            margin-right 8px
            text-align center
            &:before            
              content: "";
              display: block;
              padding-top: 56.267%;
            img
              position absolute
              top 0
              left 0
              border-radius 6px
              vertical-align:bottom
              object-fit cover
          .content
            display flex
            flex 1
            height 70px
            flex-direction column
            justify-content space-between
            line-height 20px
            overflow hidden
            .name
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            .introduce
              display: flex;
              justify-content: space-between;
              color $color-text-l
              font-size $font-size-small
</style>