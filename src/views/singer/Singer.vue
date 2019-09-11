<template>
  <div class="singer" ref="singer">
    <ListView :data="singers" @select="selectSinger" ref="list"></ListView>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {getSingerList} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  import ListView from '../../components/listview/ListView.vue'
  import Singer from '../../common/js/singer'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from '../../common/js/mixin'
  const HOT_NAME = "热门";
  const HOT_SINGER_LEN = 10;
  export default {
    components: {
      ListView
    },

    props: {
      
    },

    data () {
      return {
        singers: []
      };
    },
    mixins: [playlistMixin],
    computed: {

    },

    created(){
      this._getSingerList();
    },

    methods: {
      handlePlaylist(playlist){
        const bottom = playlist.length > 0 ? '60px' : '';
        this.$refs.singer.style.bottom = bottom;
        this.$refs.list.refresh();
      },
      selectSinger(singer){     
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer);
      },
      _getSingerList(){
        getSingerList().then((res) =>{
          if (res.code === ERR_OK) {
            this.singers = res.data.list;
            this.singers = this._normalizeSigner(this.singers);
          }
        })
      },
      _normalizeSigner(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            item: []
          },
        }
        list.forEach((item,index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.item.push(new Singer({
              id:item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]){
            map[key] = {
              title: key,
              item: []
            }
          }
          map[key].item.push(new Singer({
              id:item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          
        });
        let hot = [];
        let ret = [];
        for (let key in map){
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)){
            ret.push(val);
          } else if(val.title == HOT_NAME){
            hot.push(val);
          }
        }

        ret.sort( (a,b)=>{
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        })
        return hot.concat(ret);
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },

}
</script>
<style lang='stylus' scoped>
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
  .fade-enter-active,
  .fade-leave-active
    transition all .2s linear 
  .fade-enter,
  .fade-leave-to
    transform translateX(100%)
</style>