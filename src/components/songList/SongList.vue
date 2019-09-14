<template>
  <div class="song-list">
    <ul>
      <li v-for="(song, index) in songs" :key="index" class="item" @click='selectItem(song, index)'> 
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)">{{getRankText(index)}}</span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    components: {
      
    },

    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
      };
    },

    computed: {
      
    },

    methods: {
      getDesc(song){
        return `${song.singer}·${song.album}`
      },
      selectItem(item, index) {
        this.$emit('select', item, index);
      },
      getRankCls(index) {
        if (index<=2) {
          let text = "icon icon" + index;
          return text 
        } else {
          return 'text'
        }
      },
      getRankText(index) {
        if (index <= 2) {
          return ''
        } else {
          return index+1;
        }
      }
    },

}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl';
  .song-list
    .item
      display flex
      align-items center
      box-sizing border-box
      height 64px
      font-size $font-size-medium
      &:nth-child(odd)
        background-color #3335
      .rank
        flex 0 0 25px
        width 25px
        margin-left 30px
        text-align center
        .text
          color  $color-theme
          font-size $font-size-large
        .icon
          display inline-block
          width 25px
          height 25px
          background-size 25px 25px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')  
      .content
        flex 1
        padding-left 20px
        line-height 20px
        overflow hidden
        .name
          no-wrap()
          color $color-text
        .desc
          no-wrap()
          margin-top 4px
          color $color-text-d
</style>