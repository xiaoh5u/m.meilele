import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)
import Error from './views/Error.vue'
import Classify from './views/Classify.vue'
import Cart from './views/Cart.vue'
import Mine from './views/Mine.vue'
import GoodsList from './views/GoodsList.vue'


export default new Router({
  routes: [{
      path: '/', // 根路径
      redirect: '/home' // 重定向到首页
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/classify',
      name: 'classify',
      component: Classify
    },
    {
      path: '/goodslist',
      name: 'goodslist',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '*',
      name: 'error',
      component: Error // 内容
    }
  ]
})