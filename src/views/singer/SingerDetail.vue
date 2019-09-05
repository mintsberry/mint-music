<template>
    <div class="singer-detail">
      歌手详情
    </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  import {getSingerDetail} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  export default {
    components: {
      
    },

    props: {
      
    },

    data () {
      return {
        show: true
      };
    },

    computed: {
      ...mapGetters([
        'singer'
      ])
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
            console.log(res.data.list);
          }
        })
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