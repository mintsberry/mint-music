<template>
  <div class="search">
    <div class="search-box-wrapper">
      <SearchBox ref="searchBox" @query="onQueryChange"></SearchBox>
    </div>
    <div class="shortcut-wrapper"  v-show="!query">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="(item, index) in hotKey" :key="index" @click="addQuery(item.k)">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <SearchList :searches="searchHistory" @select="addQuery" @delete="deleteOne"></SearchList>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <Suggest :query="query" @listScroll="blurInput" @select="saveSearch"></Suggest>
    </div>
    <Confirm ref="confirm" :text="'是否清空所有搜索历史'" :confirmBtnText="'清空'" @confirm="clearSearchHistory"></Confirm>
    <transition name='fade'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import SearchBox from "../../components/searchBox/SearchBox.vue";
  import {getHotKey} from '../../api/search';
  import {ERR_OK} from '../../api/config';
  import Suggest from '../suggest/Suggest.vue'
  import SearchList from '../../components/searchList/SearchList.vue'
  import {mapActions, mapGetters} from 'vuex';
  import Confirm from '../../components/confirm/Confirm.vue'
  export default {
    components: {
      SearchBox,
      Suggest,
      SearchList,
      Confirm
    },

    props: {
      
    },

    data () {
      return {
        hotKey: [],
        query: ''
      };
    },

    computed: {
      ...mapGetters([
        'searchHistory'
      ])
    },
    created() {
      this._getHotKey();
    },
    methods: {
      addQuery(query){
        this.$refs.searchBox.setQuery(query);
      },
      onQueryChange(query) {
        this.query = query
      },
      deleteOne(item) {
        this.deleteSearchHistory(item)
      },
      deleteAll() {
        this.clearSearchHistory();
      },
      saveSearch() {
        this.saveSearchHistory(this.query)
      },
      showConfirm() {
        this.$refs.confirm.show();
      },
      _getHotKey() {
        getHotKey().then((resp) => {
          if(resp.code == ERR_OK) {
            let hotKey = resp.data.hotkey
            let nums = this._randGetNum(hotKey.length, 10)
            this.hotKey = [];
            nums.forEach((item)=>{
              this.hotKey.push(hotKey[item]);
            })
          }
        })
      },
      blurInput() {
        this.$refs.searchBox.blur();
      },
      _randGetNum(max, num) {
        let ret = [];
        while (ret.length < num) {
          let ran = Math.random() * max | 0
          let flag = ret.every((item)=>{
            return ran !== item;
          })
          if (flag) {
            ret.push(ran);
          }
        }
        return ret;
      },
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory',
        'clearSearchHistory'
      ])
    },

}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl';
  .search
    .fade-enter-active,
    .fade-leave-active
      transition all .2s linear 
    .fade-enter,
    .fade-leave-to
      transform translateX(100%)
    .search-box-wrapper
      margin 20px
    .shortcut-wrapper
      position fixed
      top 178px
      bottom 0
      width 100%
      .shortcut
          height 100%
          overflow hidden
          .hot-key
            margin 0 20px 20px 20px
            .title
              margin-bottom 20px
              font-size $font-size-medium
              color $color-text-l
            .item
              display inline-block
              padding 5px 10px
              margin 0 15px 10px 0
              border-radius 6px
              background $color-highlight-background
              font-size $font-size-medium
              color $color-text-d
          .search-history
            position: relative
            margin: 0 20px
            .title
              display: flex
              align-items: center
              height: 40px
              font-size: $font-size-medium
              color: $color-text-l
              .text
                flex: 1
              .clear
                extend-click()
                .icon-clear
                  font-size: $font-size-medium
                  color: $color-text-d
    .search-result
      position fixed
      width 100%
      top 178px
      bottom 0
</style>