<template>
  <transition class="fade">
    <MusicList :title="topList.title" :bgImage="bgImage" :songs="songs" :rank="rank"></MusicList>
  </transition>
</template>
<script>
  import MusicList from '../musicList/MusicList.vue'
  import {getMusicList} from '../../api/rank';
  import {mapGetters} from 'vuex'
  import {ERR_OK} from '../../api/config';
  import Song,{filterSinger} from "../../common/js/song"
  export default {
    components: {
      MusicList 
    },
    props: {
      
    },
    data () {
      return {
        songs: [],
        rank: true
      };
    },
    computed: {
      bgImage(){
        if (this.songs.length) {
          return this.songs[0].image
        }
      },
      ...mapGetters([
        'topList'
      ])
    },
    created() {
      if (!this.topList.topId){
        this.$router.push('/rank');
      }
      this._getMusicList()
    },
    methods: {
      _getMusicList(){
        getMusicList(this.topList.topId).then((resp) => {
          if (resp.code === ERR_OK){
            this.songs = this._normalizeSongs(resp.detail.data.songInfoList)
          }
        })
      },
      _normalizeSongs(list){
        let ret = []
        list.forEach(item => {
          ret.push(new Song({
            id:item.id,
            mid:item.mid,
            singer:filterSinger(item.singer),
            name:item.name,
            album: item.album.name,
            duration: item.interval,
            image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg?max_age=2592000`,
            url: ""
          }))
        });
        return ret;
      }
    },
}
</script>
<style lang='stylus' scoped>
  .fade-enter-active,
  .fade-leave-active
    transition all .2s linear 
  .fade-enter,
  .fade-leave-to
    transform translateX(100%)
</style>