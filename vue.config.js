module.exports = {
    devServer: {
        proxy: {
            /*
                当你的请求路径是/xiaobu/api/goods/list
                实际的请求路径是target + '/xiaobu/api/goods/list'
                然后使用pathRewrite将/xiaobu/api转换为空
                所以最后的请求路径就是target + '/goods/list'
            */
       
            '/xiaohu/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/xiaohu/api': ''
                }
            },
            '/sale/api': {
                target: 'http://m.meilele.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/sale/api': ''
                }
            },
            '/muji/api': {
                target: 'https://www.muji.com.cn/',
                changeOrigin: true,
                pathRewrite: {
                    '^/muji/api': ''
                }
            },
            
            // 其他代理接口
        }
    }
}  