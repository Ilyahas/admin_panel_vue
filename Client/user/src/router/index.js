import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '../components/General/Layout/MainLayout.vue'
import Overview from '../components/General/View/Overview.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
      children: [
        {
          path: 'overview',
          name: 'overview',
          component: Overview
        }
      ]
    }
  ]
})
