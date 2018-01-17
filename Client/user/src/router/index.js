import Vue from 'vue'
import Router from 'vue-router'

import MainLayout from '../components/General/Layout/MainLayout.vue'
import Main from '../components/General/View/Main.vue'
import Photos from '../components/General/View/Photos.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/home',
      component: MainLayout,
      children: [
        {
          path: 'home',
          name: 'Main',
          component: Main
        },
        {
          path: 'photos',
          name: 'photos',
          component: Photos
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
