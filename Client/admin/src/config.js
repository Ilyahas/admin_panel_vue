const configData = {
  defaultImg: 'static/img/default.png',
  pathToCovers: 'static/img/photoSectionCovers/',
  serverHost: 'http://localhost:3000'
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
