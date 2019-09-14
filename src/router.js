import Vue from 'vue'
import Router from 'vue-router'
import Rank from './views/rank/Rank.vue'
import Recommend from './views/recommend/Recommend.vue'
import Disc from './views/disc/Disc.vue'
import Search from './views/search/Search.vue'
import Singer from './views/singer/Singer.vue'
import SingerDetail from './views/singer/SingerDetail.vue'
import TopList from './views/topList/topList.vue'
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
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [
        { 
          path: ':id',
          component:SingerDetail
        }
      ]
    }
  ]
})
