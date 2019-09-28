<template>
  <div class="videoPlayer">
    <div class="top">
      <h1 class="title"></h1>
    </div>
    <video width="100%" height="100%" x5-video-player-type="h5" x5-video-orientation="landscape" 
      :src="videoUrl" ref="video"
      @canplay="canPlay"
      @timeupdate="timeUpdate"
      @click="toggleControll"
    ></video>
    <div class="bottom"
      :style="{visibility: showBottom}">
      <div class="part time-l">{{format(currentTime)}}</div>
      <div class="progress-bar-wrapper">
        <ProgressBar   @percentChange="onPorgressBarChange"></ProgressBar>
      </div>
      <div class="part time-r">{{format(duration)}}</div>
      <div class="part" @click="toggleFullScreen">
        <i class="ckin-expand"></i>
      </div>
    </div>
    <div class="poster" :style="posterImage" v-show="posterShow"></div>
    <div class="mask" v-show="controllShow"></div>
    <div class="play-btn" @click="playVideo" v-show="controllShow">
      <i class="ckin" :class="getIconCls" @click.stop="togglePlay"></i>
    </div>
  </div>
</template>
<script>
  import ProgressBar from '../../components/progressBar/ProgressBar.vue';
import { format } from 'path';
  export default {
    components: {
      ProgressBar
    },
    props: {
      videoUrl: {
        type: String,
        default: ''
      },
      posterUrl: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        isPlay: false,
        isFullScreen: false,
        posterShow: true,
        currentTime: 0,
        duration: 0,
        controllShow: true
      };
    },
    computed: {
      posterImage(){
        return `backgroundImage:url(${this.posterUrl})`;
      },
      percent() {
        return this.currentTime / this.duration
      },
      showBottom() {
        return this.controllShow ? 'visible' : 'hidden'
      },
      getIconCls() {
        return this.isPlay ? 'ckin-pause' : 'ckin-play';
      },
    },
    watch: {
      isFullScreen(newValue) {
        if (newValue) {
          if (this.$refs.video.requestFullscreen) {
              this.$refs.video.requestFullscreen();
          } else if (this.$refs.video.mozRequestFullScreen) {
              this.$refs.video.mozRequestFullScreen();
          } else if (this.$refs.video.webkitRequestFullscreen) {
              this.$refs.video.webkitRequestFullscreen(); 
          } else if (this.$refs.video.msRequestFullscreen) {
              this.$refs.video.msRequestFullscreen();
          }
        } else {
          if (document.cancelFullScreen) {
              document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
          }
        }
      }
    },
    methods: {
      playVideo() {
        this.$refs.video.play();
        this.posterShow = false;
        this.isPlay = true;
        this.controllShow = !this.controllShow;
      },
      canPlay(){
        this.duration = this.$refs.video.duration;
      },
      timeUpdate(e){
        this.currentTime = e.target.currentTime;
      },
      toggleFullScreen() {
        this.isFullScreen = !this.isFullScreen;
      },
      onPorgressBarChange(percent){
        const currentTime = this.duration * percent;
        if (this.videoUrl && this.videoUrl != ''){
          this.$refs.video.currentTime = currentTime;
        }
      },
      toggleControll() {
        this.controllShow = !this.controllShow;
      },
      togglePlay() {
        this.isPlay = !this.isPlay;
        this.posterShow = false;
        if (this.isPlay) {
          this.$refs.video.play();
        } else {
          this.$refs.video.pause();
        }
      },
      switchVideo() {
        this.isPlay = false;
        this.controllShow = true;
        this.posterShow = true
      },
      format(interval){
        interval = interval | 0;
        let minute = interval / 60 | 0;
        let second = interval % 60;
        if (second.toString().length == 1){
          second = '0' + second;
        }
        if (minute.toString().length == 1){
          minute = '0' + minute;
        }
        return `${minute}:${second}`
      },
    },
}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl';
  @import '../../common/stylus/mixin.styl'
  .videoPlayer
    position relative
    font-size 0
    overflow hidden
    cursor pointer
    video
      &::-webkit-media-controls-panel,
      &::-webkit-media-controls-panel-container,
      &::-webkit-media-controls-start-playback-button 
        display:none !important;
        -webkit-appearance: none;
      &::-moz-media-controls,
      &::-webkit-media-controls-enclosure
        display:none !important;
    .bottom
      display flex
      position absolute
      z-index 30
      bottom 0
      left 0
      right 0
      height 40px
      background linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 100%)
      text-align center
      align-items center
      .part
        flex 0 0 30px
        width 30px
        font-size 12px
        font-weight 300
        color $color-text-l
        margin 0 10px 0px 10px
        .ckin-expand
          color $color-theme
          font-size $font-size-large
      .progress-bar-wrapper
        flex 1
    .poster
      position: absolute;
      display: block
      top: 0
      left: 0
      right 0
      bottom 0
      background-size: 100% 100%;
    .mask
      position: absolute
      display: block
      top 0
      left 0
      width 100%
      height 100%
      background rgba(0,0,0,0.3);
    .play-btn
      display -webkit-box
      -webkit-box-orient horizontal
      -webkit-box-align center
      -webkit-box-pack center
      position absolute
      top 0
      left 0
      bottom 40px
      right 0
      .ckin
        position relative
        font-size $font-size-large-x
        color $color-theme-d
        &::after
          content: "";
          position: absolute;
          left: -10px;
          top: -10px; 
          right: -10px;
          bottom: -10px;
</style>