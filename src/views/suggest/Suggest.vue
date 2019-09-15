<template>
  <Scroll class="suggest" 
  :data="result" 
  :pullup="pullup"
  :beforeScroll="beforeScroll"
  @scrollToEnd="searchMore"
  @beforeScroll="listScroll"
  ref="scroll"
  >
    <div class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in result" :key="index" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <Loading v-show="hasMore"></Loading>
    </div>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <NoResult :title="title"></NoResult>
    </div>
  </Scroll>
</template>
<script>
  import {search} from '../../api/search'
  import {ERR_OK} from '../../api/config'
  import {filterSinger} from "../../common/js/song"
  import Scroll from '../../components/scroll/Scroll.vue'
  import {createSong} from '../../common/js/song'
  import Loading from '../../components/loading/Loading.vue'
  import {mapMutations,mapActions} from 'vuex'
  import Singer from '../../common/js/singer'
  import NoResult from '../../components/noResult/NoResult.vue'
  const TYEP_SINGER = 'singer'
  export default {
    components: {
      Scroll,
      Loading,
      NoResult
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
        result: [],
        pullup: true,
        hasMore: true,
        beforeScroll: true,
        title: '抱歉,暂无搜索结果'
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
        this.hasMore = true;
        this.page = 1;
        this.result = [];
        this.$refs.scroll.scrollTo(0,0);
        search(this.query, this.page, 1).then((resp)=>{
          if (resp.code === ERR_OK) {
            this.result = this._genResult(resp.data);
            this._checkMore(resp.data);
          }
        })
      },
      searchMore() {
        if (!this.hasMore) {
          return ;
        }
        this.page++
        search(this.query, this.page, 0).then((resp)=>{
          if (resp.code === ERR_OK) {
            this.result = this.result.concat(this._genResult(resp.data));
            this._checkMore(resp.data);
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
      selectItem(item) {
        if(item.type === TYEP_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.sigername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          this.setSinger(singer);
        } else {
          this.insertSong(item);
        }
      },
      listScroll(item) {
        this.$emit("listScroll")
      },
      _checkMore(data) {
        const song = data.song;
        if (!song.list.length || (song.curnum + song.curpage * 20) > song.totalnum){
          this.hasMore = false;
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
          if (element.songid) {
            ret.push(createSong(element))
          }
        });
        return ret;
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        "insertSong"
      ])
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