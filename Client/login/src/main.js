// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'

import Notifications from './components/NotificationPlugin'

Vue.use(VueResource)
Vue.use(Notifications)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
