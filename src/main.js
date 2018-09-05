// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import "../static/src/reset.css"
import "../static/src/swiper.min.css"
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Resource from 'vue-resource'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(Resource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
