import Navigation from './Navigation.vue'

const NavigationStore = {
  navbarLinks: [
    {
      name: 'Home',
      path: '/home'
    },
    {
      name: 'News',
      path: '/news'
    },
    {
      name: 'Photos',
      path: '/photo-sections'
    },
    {
      name: 'Articles',
      path: '/articles'
    },
    {
      name: 'Article',
      path: '/article'
    }
  ]
}

const NavigationPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          navigationStore: NavigationStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$navbar', {
      get () {
        return this.$root.navigationStore
      }
    })
    Vue.component('nav-bar', Navigation)
  }
}

export default NavigationPlugin
