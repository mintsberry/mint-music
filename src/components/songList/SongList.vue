<template>
  <div class="song-list">
    <ul>
      <li v-for="(song, index) in songs" :key="index" class="item"> 
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