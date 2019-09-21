import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './assets/js/axios'

Vue.config.productionTip = false

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 把axios注入到根实例，这样每个vue组件都能通过this获取到这里的axios
Vue.prototype.$axios = axios


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
