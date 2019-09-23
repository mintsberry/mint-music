<template>
  <div class="music-video">
    <div class="video-player">
      <video :src="videoUrl" width="100%" controls x5-video-player-type="h5" x5-video-orientation="landscape" :poster="this.video.cover"></video>
    </div>
    <div class="video-info">
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
        <div class="playCnt">总播放3438.0万次</div>
        <div class="pub"><span>发布:2019-09-16</span>&nbsp;<span>时长:03:42</span></div>
        <div class="desc">全球等到哭的激动!</div>
      </div>
      <ul class="relate-list">
        <li class="item">
          <div class="mv-pic">
            <img src="http://y.gtimg.cn/music/photo_new/T015R640x360M103000fHRU11gatzZ.jpg" alt="" width="135px">
          </div>
          <div class="content">
            <div class="name">深度解析，惊喜不断:周杰伦+阿信《说好不哭》</div>
            <div class="introduce">
              <span class="author">来自：ZIBO</span>&nbsp;
              <span class="time">2019-10-27</span>
            </div>
          </div>
        </li>
        <li class="item">
          <div class="mv-pic">
            <img src="http://y.gtimg.cn/music/photo_new/T015R640x360M103000fHRU11gatzZ.jpg" alt="" width="135px">
          </div>
          <div class="content">
            <div class="name">深度解析，惊喜不断:周杰伦+阿信《说好不哭》周杰伦+阿信《说好不哭》周杰伦+阿信《说好不哭》周杰伦+阿信《说好不哭》</div>
            <div class="introduce">
              <span class="author">来自：ZIBO</span>&nbsp;
              <span class="time">2019-10-27</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import {getMv} from '../../api/mv';
import { ERR_OK } from '../../api/config';
  export default {
    components: {
      
    },
    props: {
      
    },
    data () {
      return {
        mp4Url: [],
        videoUrl: ''
      };
    },
    computed: {
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
      console.log(this.video);
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
    },
    methods: {
    
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
      .relate-list
        background-color $color-background-d
        border-radius 4px
        padding 8px
        .item
          display flex
          padding 4px 0px
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
            flex 0 0 135px
            width 135px
            margin-right 8px
            text-align center
            img
              border-radius 4px
              vertical-align:bottom
          .content
            flex 1
            line-height 20px
            overflow hidden
            .name
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
          
</style>