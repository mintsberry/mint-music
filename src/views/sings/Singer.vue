<template>
  <div class="singer">
    歌手
  </div>
</template>

<script>
  import {getSingerList} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  const HOT_NAME = "热门";
  const HOT_SINGER_LEN = 10;
  export default {
    components: {
      
    },

    props: {
      
    },

    data () {
      return {
        singers: []
      };
    },

    computed: {
      
    },

    created(){
      this._getSingerList();
    },

    methods: {
      _getSingerList(){
        getSingerList().then((res) =>{
          if (res.code === ERR_OK) {
            this.singers = res.data.list;
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
        this.singers.forEach((element,index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push
          }
        });
      }
    },

}
</script>
<style lang='stylus' scoped>
  .sing
    position fixed
    top 88px
    bottom 0
    width 100%
</style>