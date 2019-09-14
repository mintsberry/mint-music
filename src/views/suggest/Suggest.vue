<template>
  <div class="suggest">
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
  </div>
</template>
<script>
  import {search} from '../../api/search'
  import {ERR_OK} from '../../api/config'
  import {filterSinger} from "../../common/js/song"
  const TYEP_SINGER = 'singer'
  export default {
    components: {
      
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
            console.log("TCL: search -> resp.code", resp)
            this.result = this._genResult(resp.data);
            console.log("TCL: search -> this.result", this.result)
          }
        })
      },
      getIconCls(item){
        console.log(item);
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
          return `${item.songname}-${filterSinger(item.singer)}`
        }
      },
      _genResult(data) {
        let ret = [];
        if (data.zhida && data.zhida.singermid){
          ret.push({...data.zhida, ...{type: TYEP_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(data.song.list)
        }
        return ret
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
      
</style>