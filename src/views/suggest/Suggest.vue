<template>
  <Scroll class="suggest">
    <div class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </div>
  </Scroll>
</template>
<script>
  import {search} from '../../api/search'
  import {ERR_OK} from '../../api/config'
  import {filterSinger} from "../../common/js/song"
  import Scroll from '../../components/scroll/Scroll.vue'
  import {createSong} from '../../common/js/song'
  const TYEP_SINGER = 'singer'
  export default {
    components: {
      Scroll
    },
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        page: 1,
        result: []
      };
    },
    computed: {
      
    },
    watch: {
      query() {
        this.search()
      }
    },
    methods: {
      search() {
        search(this.query, this.page, 1).then((resp)=>{
          if (resp.code === ERR_OK) {
            this.result = this._genResult(resp.data);
          }
        })
      },
      getIconCls(item){
        if (item.type === TYEP_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName(item) {
        if (item.type === TYEP_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      _genResult(data) {
        let ret = [];
        if (data.zhida && data.zhida.singermid){
          ret.push({...data.zhida, ...{type: TYEP_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach(element => {
          if (element.songid && element.albumid) {
            ret.push(createSong(element))
          }
        });
        return ret;
      }
    },
}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl';
    .suggest
      height 100%
      overflow hidden
      .suggest-list
        padding 0 30px
        .suggest-item
          display flex
          align-items center
          padding-bottom 20px
        .icon
          flex 0 0 30px
          width 30px
          [class^="icon-"]
            font-size 14px
            color $color-text-d
        .name
          flex 1
          font-size $font-size-medium
          color $color-text-d
          overflow hidden
          .text
            no-wrap()
    .no-result-wrapper
      position absolute
      width 100%
      top: 50%
      transform translateY(-50%)
</style>