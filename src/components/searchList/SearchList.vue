<template>
  <div class="search-list" v-show="searches.length">
    <ul>
      <li @click="selectItem(item)" class="search-item" v-for="(item,index) in searches" :key="index">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    components: {
      
    },
    props: {
      searches: {
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
      selectItem(item) {
        this.$emit('select', item);
      },
      deleteOne(item) {
        this.$emit('delete', item);
      }
    },
}
</script>
<style lang='stylus' scoped>
  @import '../../common/stylus/variable.styl'
  .search-list
    .search-item
      display flex
      align-items center
      height 40px
      .text
        flex: 1
        font-size $font-size-medium
        color $color-text-l
      .icon 
        extend-click()
        .icon-delete
          font-size $font-size-small
          color $color-text-d
</style>