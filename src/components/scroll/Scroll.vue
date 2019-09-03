<template>
  <div ref="wrapper">
    <slot>

    </slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    components: {
      
    },

    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
    },

    data () {
      return {
      };
    },

    computed: {
      
    },

    watch: {
      data() {
        setTimeout(() => {
          this.scroll.refresh()
        }, 20);
      }
    },

    mounted(){
      setTimeout(() => {
        this._initScroll();  
      }, 20);
    },

    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return ;
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: this.click
        })
      },
      enable(){
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      }
    },

}
</script>
<style lang='stylus' scoped>
</style>