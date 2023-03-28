import Vue from 'vue'
import App from './App.vue'
import router from './router'
import microApp from '@micro-zoe/micro-app'

Vue.config.productionTip = false

microApp.start()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
