import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import vuetify from './plugins/vuetify'
// import { createApp } from 'vue'
// import './scss/variables.scss'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

// const app = createApp(App)
// app.use(router).use(store).mount('#app')