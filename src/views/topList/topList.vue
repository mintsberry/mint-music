<template>
  <div class="slide">
    <MusicList :title="topList.title" :bgImage="bgImage" :songs="songs"></MusicList>
  </div>
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
        songs: []
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
      this._getMusicList()
    },
    methods: {
      _getMusicList(){
        if (!this.topList.id){
          this.$router.push('/rank');
        }
        getMusicList(this.topList.topId).then((resp) => {
          if (resp.code === ERR_OK){
            this.songs = this._normalizeSongs(resp.detail.data.songInfoList)
            console.log("TCL: _getMusicList -> this.songs", this.songs)
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
</style>