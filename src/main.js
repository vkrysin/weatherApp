import Vue from 'vue'
import app from './App.vue'
import VueRouter from 'vue-router'
import routes from '@/router/index.js'
import store from '@/store/index.js'

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  store,
  router,
  render: h => h(app)
}).$mount('#app')
