<template>
  <div class="recommend">
    <Scroll  class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div class="slider-wrapper">
        <div v-if="recommend.length">
          <Slider >
                <div v-for="(item, index) in recommend" :key="index" >
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" @load="imgLoad" alt="">
                </a>
              </div>
          </Slider>
        </div>    
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li class="item" v-for="(item, index) in discList" :key="index">
            <div class="icon">
              <img width="60" height="60" v-lazy="item.imgurl" alt="">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import {getRecommend,getDiscList} from '../../api/recommend'
  import {ERR_OK} from '../../api/config';
  import Slider from '../../components/silder/Silder.vue';
  import Scroll from '../../components/scroll/Scroll.vue';
  export default {
    components: {
        Slider,
        Scroll    
    },

    props: {
      
    },

    data () {
      return {
        recommend: [],
        discList: []
      };
    },

    computed: {
      
    },

    created() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK){
          this.recommend = res.data.slider;
        }
      })
      getDiscList().then((res) => {
        if (res.code === ERR_OK){
          console.log(res);
          this.discList = res.data.list;
        }
      })
    },

    methods: {
      imgLoad(){
        if (!this.imgLoadFlag){
          this.$refs.scroll.refresh();
          this.imgLoadFlag = true;
        }
      }
    },

}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl';
  .recommend
    position fixed
    top 80px
    bottom 0
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
          padding 0 20px 20px 20px
          .icon
            flex 0 0 60px
            width 60px
            padding-right 20px
          .text
            display flex
            flex-direction column
            justify-content center
            flex 1
            line-height 20px
            overflow hidden
            font-size $font-size-medium
            .name
              margin-bottom 10px
              color $color-text
            .desc
              color: $color-text-d


</style>