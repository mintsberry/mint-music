import Vue from 'vue'
import Router from 'vue-router'
import Rank from './views/rank/Rank.vue'
import Recommend from './views/recommend/Recommend.vue'
import Search from './views/search/Search.vue'
import Singer from './views/sings/Singer.vue'
Vue.use(Router)
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'recommend'
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer
    }
  ]
})
