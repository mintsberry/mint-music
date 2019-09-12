<template>
  <MusicList :title="title" :bgImage="bgImage"></MusicList>
</template>
<script> 
  import MusicList from '../music-list/MusicList.vue'
  import {mapGetters} from 'vuex'
  import {getSongList} from '../../api/recommend'
  export default {
    components: {
      MusicList
    },
    props: {
      
    },
    data () {
      return {
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
        getSongList(this.disc.dissid).then((res) => {
          console.log(res);
        })
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