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
        default: 2
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
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
          click: this.click,
          probeType: this.probeType
        })
        if(this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
      },
      enable(){
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },

}
</script>
<style lang='stylus' scoped>
</style>