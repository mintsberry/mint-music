<template>
  <transitio name="list-fade">
    <div class="playlist">
      <div class="list-wrapper">
        <div class="list-header">
          <h1 class="title">
            <i class="icon"></i>
            <span class="text"></span>
            <span class="clear"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <div class="list-content">
          <ul>
            <li class="item">
              <i class="current"></i>
              <span class="text"></span>
              <span class="like">
                <i class="icon-not-favorite"></i>
              </span>
              <span class="icon-delete"></span>
            </li>
          </ul>
        </div>
        <div class="list-operate">
          <div class="add">
            <i class="icon-add"></i>
          </div>
          <span class="text">添加歌曲到队列</span>
        </div>
        <div class="list-close">
          <span>关闭</span>
        </div>
      </div>
    </div>
  </transitio>
</template>
<script>
  export default {
    components: {
      
    },
    props: {
      
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
</style>