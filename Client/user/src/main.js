// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueNoty from 'vuejs-noty'

import Config from './config'
// UIComponents
import Navigation from './components/UIComponents/Navigation'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// styles
import './assets/sass/main.scss'
import 'swiper/dist/css/swiper.css'
import 'vuejs-noty/dist/vuejs-noty.css'

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDQv6scxuf370EzYaKHIUPPa7qBzhaLT28',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})

Vue.use(VueResource)
Vue.use(Navigation)
Vue.use(Config)
Vue.use(VueAwesomeSwiper)
Vue.use(VueNoty, {
  timeout: 10000,
  progressBar: false
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
