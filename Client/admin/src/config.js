const configData = {
  defaultImg: 'static/img/default.png',
  pathToSectionCovers: 'static/img/photoSectionCovers/',
  pathToPhotos: 'static/img/photos/',
  pathToNewsCover: 'static/img/newsCovers/',
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
