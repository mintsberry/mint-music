<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapp">
        <div v-if="recommend.length">
          <Slider>
            
                <div v-for="(item, index) in recommend" :key="index" >
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" alt="">
                </a>
              </div>
            
          </Slider>
        </div>  
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {getRecommend} from '../../api/recommend'
  import {ERR_OK} from '../../common/js/config';
  import Slider from '../../components/silder/Silder.vue';
  export default {
    components: {
        Slider      
    },

    props: {
      
    },

    data () {
      return {
        recommend: []
      };
    },

    computed: {
      
    },

    created() {
      getRecommend().then((res) => {
        if (res.code === 0){
          this.recommend = res.data.slider;
        }
      })
    },

    methods: {
      
    },

}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl';
  .recommend
    position fixed
    top 80px
    left 0
    width 100%
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position relative
        width 100%
        overflow hidden
      .recommend-list
        .list-title
          height 65px
          line-height 65px
          text-align center
          font-size $font-size-medium
          color $color-theme
        .item
          display flex
          box-sizing border-box
          align-items center; 
          


</style>