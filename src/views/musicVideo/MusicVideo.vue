<template>
  <div class="music-video"></div>
</template>
<script>
import { mapGetters } from 'vuex';
import {getMv} from '../../api/mv';
  export default {
    components: {
      
    },
    props: {
      
    },
    data () {
      return {
      };
    },
    computed: {
      ...mapGetters([
        'video'
      ])
    },
    created(){
      getMv(this.video.vid).then((resp)=>{
        console.log(resp);
      })
    },
    methods: {
    
    },
}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl'
  .music-video
    position fixed
    z-index 50
    top 0
    left 0
    bottom 0
    right 0
    background-color  $color-highlight-background
</style>