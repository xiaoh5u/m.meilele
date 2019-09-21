import axios from 'axios'
import {Indicator} from 'mint-ui'

//请求拦截器，在请求发到接口之前
axios.interceptors.request.use(function(config){

    Indicator.open('加载中')
    return config
},function(error){
    return Promise.reject(error)
})

// 响应拦截器，在响应回到页面之前
axios.interceptors.response.use(function(response){

    Indicator.close()
    return response.data
},function(error){
    return Promise.reject(error)
})

export default axios

