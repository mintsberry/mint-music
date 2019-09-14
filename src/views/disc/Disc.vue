<template>
  <MusicList :title="title" :bgImage="bgImage" :songs="songs"></MusicList>
</template>
<script> 
  import MusicList from '../musicList/MusicList.vue'
  import {mapGetters} from 'vuex'
  import {getSongList} from '../../api/recommend'
  import {ERR_OK} from '../../api/config'
  import Song, {filterSinger} from '../../common/js/song'
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
      title(){
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    created() {
      this._getSongList();
    },
    methods: {
      _getSongList(){
        if(!this.disc.dissid){
          this.$router.push("/recommend");
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK){
            let data = res.cdlist[0].songlist;
            this.songs = this._normalizeSongs(data);
          }
        })
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach(musicData => {
          if (musicData.mid && musicData.album) {
            ret.push(new Song({
              id:musicData.id,
              mid: musicData.mid, 
              singer: filterSinger(musicData.singer), 
              name: musicData.name, 
              album: musicData.album.name,
              duration: musicData.interval, 
              image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`, 
              url: ''
            }));
          }
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