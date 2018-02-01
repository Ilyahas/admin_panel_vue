const configData = {
  defaultImg: 'static/img/default.png',
  serverHost: 'http://192.168.1.129:3000'
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
