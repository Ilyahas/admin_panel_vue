import Navigation from './Navigation.vue'

const NavigationStore = {
  sidebarLinks: [
    {
      name: 'Overview',
      path: '/overview'
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
