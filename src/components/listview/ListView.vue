<template>
  <Scroll class="listview" :data="data">
    <ul>
      <li v-for="(group, index) in data" :key="index" class="list-group">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item, index) in group.item" :key="index"  class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </Scroll>
</template>

<script>
  import Scroll from '../scroll/Scroll.vue'
  export default {
    components: {
      Scroll
    },

    props: {
      data: {
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
      
    },

}
</script>
<style lang='stylus' scoped>
  @import "../../common/stylus/variable.styl";
  .listview
    position relative
    width 100%
    height 100%
    overflow hidden
    background $color-background
    .list-group
      padding-bottom 30px
      .list-group-title
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background $color-highlight-background
      .list-group-item
        display flex
        align-items center
        padding 20px 0 0 30px
        .avatar 
          width 50px
          height 50px
          border-radius 50%
        .name
          margin-left 20px
          color $color-text-l
          font-size $font-size-medium
</style>