<template>
  <div class="rank">
    <div class="toplist">
      <ul>
        <li v-for="(item, index) in topGroup" :key="index" class="group">
          <div class="top-title">{{item.groupName}}</div>
          <ul>
            <li class="item" v-for="(item, index) in item.toplist" :key="index">
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
    </div>
    <router-view></router-view>
  </div>
</template>

<script> 
  import {mixin} from "../../common/js/mixin"
  import {getTopList} from "../../api/rank"
  import {ERR_OK} from '../../api/config'
  export default {
    components: {
      
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
      // mixin
    ],
    computed: { 
    },
    created() {
      this._getTopList()
    },
    methods: {
      _getTopList(){
        getTopList().then((resp)=>{
          if (resp.code === ERR_OK){
            this.topGroup = resp.req_0.data.group
          }
        })
      }
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
          height 30px
          line-height 30px
          text-align:center
          color $color-text-l
          font-size $font-size-medium-x
          background $color-background           
        .item
          &:first-child
            padding-top 0px
          display flex
          margin 0 20px
          padding-top 20px
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

</style>