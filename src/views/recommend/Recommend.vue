<template>
  <div class="recommend" ref="recommend">
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
            <li class="item" v-for="(item, index) in discList" :key="index" @click="selectItem(item)">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" alt="">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.dissname"></h2>
                <p class="desc" v-html="item.creator.name"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <Loading></Loading>
      </div>
    </Scroll>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {getRecommend,getDiscList} from '../../api/recommend'
  import {ERR_OK} from '../../api/config';
  import Slider from '../../components/silder/Silder.vue';
  import Loading from '../../components/loading/Loading.vue';
  import Scroll from '../../components/scroll/Scroll.vue';
  import {playlistMixin} from '../../common/js/mixin'  
  import {mapMutations} from "vuex"
  export default {
    components: {
        Slider,
        Scroll,
        Loading
    },

    props: {
      
    },

    data () {
      return {
        recommend: [],
        discList: []
      };
    },
    mixins: [playlistMixin],
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
          this.discList = res.data.list;
        }
      })
    },

    methods: {
      handlePlaylist(playlist){
        const bottom = playlist.length > 0 ? '60px' : '';
        this.$refs.recommend.style.bottom = bottom;
        this.$refs.scroll.refresh();
      },
      imgLoad(){
        if (!this.imgLoadFlag){
          this.$refs.scroll.refresh();
          this.imgLoadFlag = true;
        }
      },
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item);
      },
      ...mapMutations({
        setDisc: "SET_DISC"
      })
    },

}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl';
  .recommend
    position fixed
    top 84px
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
      .loading-container
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
    .fade-enter-active,
    .fade-leave-active
      transition all .2s linear 
    .fade-enter,
    .fade-leave-to
      transform translateX(100%)

</style>