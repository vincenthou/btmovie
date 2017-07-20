import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/pages/Search'
import List from '@/pages/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'movies',
      component: List
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/tvplays',
      name: 'tvplays',
      component: List
    }
  ]
})
