<template>
  <div class="video">
    <div class="top">
      <h1 class="title"></h1>
    </div>
    <video src=""></video>
    <div class="toggle-play">
      <i class="ckin-play"></i>
    </div>
    <div class="bottom">
      <div class="time-l"></div>
      <div class="progress"></div>
      <div class="time-r"></div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
      
    },
    props: {
      videoUrl: {
        type: String,
        default: ''
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
<style lang='' scoped>
</style>