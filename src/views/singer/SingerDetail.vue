<template>
    <div class="singer-detail">
      <MusicList  :songs="songs" :title="title" :bgImage="bgImage"></MusicList>
    </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  import {getSingerDetail} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  import {createSong} from '../../common/js/song'
  import {getSong} from '../../api/song'
  import MusicList from '../musicList/MusicList.vue'
  export default {
    components: {
      MusicList
    },

    props: {
      
    },

    data () {
      return {
        songs: []
      };
    },

    computed: {
      ...mapGetters([
        'singer'
      ]),
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      }
    },

    created() {
      this._getDetail();
    },

    methods: {
      _getDetail(){
        if (!this.singer.id){
          this.$router.go(-1)
          return 
        }
        getSingerDetail(this.singer.id).then((res)=>{
          if (res.code === ERR_OK){
            this.songs = this._normalizeSongs(res.data.list);
          }
        })
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach((item) => {
          let {musicData} = item;
          if (musicData.songid && musicData.albummid){
            ret.push(createSong(musicData));
          }
        })
        return ret;
      }
    },

}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl'
  .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background-color $color-background

</style>