import Navigation from './Navigation.vue'

const NavigationStore = {
  navbarLinks: [
    {
      name: 'Головна',
      path: '/home'
    },
    {
      name: 'Новини',
      path: '/news'
    },
    {
      name: 'Фотограії',
      path: '/photo-sections'
    },
    {
      name: 'Статті',
      path: '/articles'
    },
    {
      name: 'Історія',
      path: '/history'
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
