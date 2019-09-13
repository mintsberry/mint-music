<template>
  <div class="rank">
    <div class="toplist">
      <ul>
        <li class="item">
          <div class="icon">
            <img src="" alt="" width="100" height="100">
          </div>
          <ul class="songlist">
            <li class="song">
              <span></span>
              <span></span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script> 
  import {mixin} from "../../common/js/mixin"
  import {getTopList} from "../../api/rank"
  import {ERR_OK} from '../../api/config'
  export default {
    components: {
      
    },

    props: {
      
    },

    data () {
      return {
      };
    },
    mixins: [ 
      // mixin
    ],
    computed: { 
    },
    created() {
      this._getTopList()
    },
    methods: {
      _getTopList(){
        getTopList().then((resp)=>{
          if (resp.code === ERR_OK){
            console.log(resp);
          }
        })
      }
    },

}
</script>
<style lang='stylus' scoped>
  .rank
    position fixed
    width 100%
    top 88px
    bottom 0
    .toplist
      height 100%
      overflow hidden
      .item
        display flex
        margin 0 20px
        padding-top 20px

</style>