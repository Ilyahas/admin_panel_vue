const configData = {
  defaultImg: '/img/default.png',
  serverHost: window.location.origin
}

const Config = {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          config: configData
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$config', {
      get () {
        return this.$root.config
      }
    })
  }
}
export default Config
