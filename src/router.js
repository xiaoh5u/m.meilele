import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)
import Error from './views/Error.vue'
import Classify from './views/Classify.vue'
import Cart from './views/Cart.vue'
import Mine from './views/Mine.vue'
import GoodsList from './views/GoodsList.vue'
import Search from './views/Search.vue'
import GoodsDetail from './views/GoodsDetail.vue'
import Register from './views/Register.vue'
import Settlement from './views/Settlement.vue'
import ConsigneeInfo from './views/ConsigneeInfo.vue'
import AddConsignee from './views/AddConsignee.vue'


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
      path: '/goodslist/:goodsType',
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
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/goodsdetail',
      name: 'goodsdetail',
      component: GoodsDetail
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/settlement',
      name: 'settlement',
      component: Settlement
    },
    {
      path: '/consigneeInfo',
      name: 'consigneeInfo',
      component: ConsigneeInfo
    },
    {
      path: '/addConsignee',
      name: 'addConsignee',
      component: AddConsignee
    },
    {
      path: '*',
      name: 'error',
      component: Error // 内容
    }
  ]
})