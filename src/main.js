import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import VueLazyLoad from 'vue-lazyload'
import store from './store/index'
import "./common/stylus/index.styl";
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('./common/image/mint.png')
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
