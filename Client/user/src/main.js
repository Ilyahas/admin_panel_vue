// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

import Config from './config'
// UIComponents
import Navigation from './components/UIComponents/Navigation'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// styles
import './assets/sass/main.scss'
import 'swiper/dist/css/swiper.css'

Vue.use(VueResource)
Vue.use(Navigation)
Vue.use(Config)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
