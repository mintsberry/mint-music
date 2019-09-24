<template>
  <div class="music-video">
    <div class="video-player">
      <video :src="videoUrl" width="100%" controls x5-video-player-type="h5" x5-video-orientation="landscape" :poster="this.video.cover" ref="video"></video>
    </div>
    <Scroll class="video-info" :data="this.other" ref="scroll">
      <div>
        <div class="mv-info">
          <div class="title"><svg class="icon_mv" viewBox="0 0 38 22" width="22" height="22">
              <title>MV</title>
              <path d="M33,0.5H5c-2.5,0-4.5,2-4.5,4.5v12c0,2.5,2,4.5,4.5,4.5h28c2.5,0,4.5-2,4.5-4.5V5C37.5,2.5,35.5,0.5,33,0.5z
              M36,17c0,1.7-1.4,3-3,3H5c-1.7,0-3-1.3-3-3V5c0-1.7,1.3-3,3-3h28c1.7,0,3,1.3,3,3V17z M17.8,5.6h2.1V17h-1.7V8.9H18L14.5,17H13
              L9.5,8.9H9.4V17H7.7V5.6h2.1l4,9.2L17.8,5.6z M29.3,5.6h1.9l-4,11.4h-2.1L21,5.6h1.9l3.2,9.5L29.3,5.6z"></path>
              </svg>
              <span class="text">{{video.name}}</span>
              
          </div>
          <div class="author"><i class="icon-mine"></i><span class="text">{{video.singers}}</span></div>
          <div class="playCnt">总播放{{countPlay}}次</div>
          <div class="pub"><span>发布:{{pubDate(this.mvInfo.pubdate)}}</span>&nbsp;<span>时长{{durTime}}</span></div>
          <div class="desc" v-html="parseDesc(this.mvInfo.desc)"></div>
        </div>
        <ul class="relate-list">
          <li class="item" v-for="(item, index) in other" :key="index">
            <div class="mv-pic" width="135px">
              <img :src="item.cover_pic" alt="" width="100%" height="100%">
            </div>
            <div class="content">
              <div class="name">{{item.name}}</div>
              <div class="introduce">
                <span class="author">来自：{{item.uploader_nick}}</span>&nbsp;
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
import { mapGetters } from 'vuex';
import {getMv,getMvInfoAndOther} from '../../api/mv';
import Scroll from '../../components/scroll/Scroll.vue';
import { ERR_OK } from '../../api/config';
import { numParse, formatDate } from '../../common/js/util';
  export default {
    components: {
      Scroll
    },
    props: {
      
    },
    data () {
      return {
        mp4Url: [],
        videoUrl: '',
        mvInfo: {},
        other: []
      };
    },
    computed: {
      countPlay() {
        if (this.mvInfo.playCnt) {
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
      videoUrl(){

      }
    },
    created(){
      if (Object.keys(this.video).length === 0) {
        this.$router.push('/recommend');
        return;
      }
      getMv(this.video.vid).then((resp)=>{
        if (resp.code === ERR_OK) {
          if (resp.getMvUrl.data && resp.getMvUrl.data[this.video.vid]) {
            this.mp4Url = resp.getMvUrl.data[this.video.vid].mp4;
          }
        }
      })
      getMvInfoAndOther(this.video.vid).then((resp)=>{
        if (resp.code === ERR_OK) {
          this.mvInfo = resp.mvinfo.data[this.video.vid];
          this.other = resp.other.data.list;
        }
      })
    },
    mounted() {
      this.$refs.scroll.$el.style.top = `${this.getVideoHight()}px`;
      this.$refs.scroll.refresh();
    },
    methods: {
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
        return this.$refs.video.clientHeight;
      }
    },
}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl'
  .music-video
    position fixed
    z-index 50
    top 0
    left 0
    bottom 0
    right 0
    background-color  $color-highlight-background
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
        margin-bottom 10px
        font-size $font-size-small
        color $color-text-l
        .title
          margin-bottom 4px
          height 22px
          line-height 22px
          font-size $font-size-medium-x
          color $color-text-ll
          .icon_mv
            fill $color-text-ll
            margin-right 4px
          .text
            vertical-align top
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
          border-bottom 1px solid $color-highlight-background
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