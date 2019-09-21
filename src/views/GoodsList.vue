<template>
  <div class="goodslist">
    <div class="header">
      <!-- 顶部搜索框部分 -->
      <div class="top">
        <span class="back iconfont icon-2fanhui"></span>

        <div class="search">
          <p></p>
          <div class="text">
            <i class="iconfont icon-guanbi"></i>
            <span>搜索商品</span>
          </div>
        </div>

        <div class="more iconfont icon-gengduomore10"></div>
      </div>
      <!-- 顶部分类筛选部分 -->

      <ul class="classify">
        <!-- 综合种类 -->
        <li>
          <span>综合</span>
          <i class="iconfont icon-icon--1"></i>
        </li>
        <!-- 价格排序 -->
        <li>
          <span>价格</span>
          <i class="iconfont icon-icon--1"></i>
        </li>
        <!-- 品牌筛选 -->
        <li>
          <span>品牌</span>
          <i class="iconfont icon-icon--1"></i>
        </li>
        <!-- 更多筛选 -->
        <li>
          <span>筛选</span>
          <i class="iconfont icon-shaixuan"></i>
        </li>
      </ul>
    </div>

    <!-- 加载UI组件 -->
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :auto-fill="false"
      ref="loadmore"
    >
      <!-- 列表渲染组件 -->
      <ul class="list">
        <li v-for="(item,index) in goodsList" :key="index">
          <img :src="item.goods_img" alt />
          <div class="status">
            <span class="baoyou" v-show="item.level_tag=='C'">包邮</span>
            <span class="ziying" v-show="item.shop_name=='美乐乐自营家具旗舰店'">自营</span>
            <span class="jingbao" v-show="item.level_tag=='B'">惊爆价</span>
            <span class="youxuan" v-show="item.level_tag=='A'">优选</span>
          </div>
          <p class="goodsName sl">{{item.goods_name}}</p>
          <div class="txt">
            <span class="goodsPrice">￥{{item.show_price}}</span>
            <span class="saleNum">已售{{item.total_sold_yes_count}}</span>
          </div>
        </li>
      </ul>

    </mt-loadmore>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      page: 1,
      allLoaded: false
    };
  },
  methods: {
    reqGoodsList(page) {
      return this.$axios.get(`/sale/api/category-chuang/list-p${page}/`, {
        params: {
          ajax: 1
        }
      });
    },
    loadTop() {
      this.reqGoodsList(1).then(res => {
        const list = res.goods_list;
          this.goodsList = list;
          this.page = 1;
       
        // 关闭顶部的loading
        this.$refs.loadmore.onTopLoaded();
        // 打开上拉加载更多
        this.allLoaded = false;
      });
    },
    loadBottom() {
        this.reqGoodsList(this.page + 1).then(res => {
           const list = res.goods_list;
            if (list.length) {
              // 将下一页的数据拼接到旧列表数据的后面
              this.goodsList = this.goodsList.concat(list);
              // 页数+1
              this.page++;
            } else {
              // 关闭上拉加载更多
              this.allLoaded = true;
            }
          // 关闭底部的loading
          this.$refs.loadmore.onBottomLoaded();
        });
    }
  },
  mounted() {
    this.reqGoodsList().then(res => {
      const list = res.goods_list;
      this.goodsList = list;
    });
  }
};
</script>

<style lang="scss" scoped>
.goodslist {
  padding: 0 0.2rem;
  // 一定要给容器添加这两个样式，否则就会出现bug
  height: 100vh;
  overflow: auto;
}
.header {
  margin-top: 0.2rem;
  .iconfont {
    font-size: 0.34rem !important;
  }
  .top {
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .search {
      display: inline-block;
      position: relative;
      p {
        width: 5rem;
        border-radius: 0.1rem;
        height: 0.58rem;
        margin-left: 0.15rem;
        font-size: 13px;
        border-radius: 4px;
        color: #aaa;
        background-color: #eee;
        overflow: hidden;
      }
      i {
        font-size: 0.34rem;
      }
      .text {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #aaa;
        display: flex;
        align-items: center;
      }
    }
  }

  // 筛选
  .classify {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.1rem 0;
    li {
      i {
        vertical-align: middle;
      }
    }
  }
}
.list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 0.1rem;
  
  li {
    width: 48%;
    margin-bottom: 0.3rem;
    img {
      width: 100%;
    }
    .status {
      display: flex;
      justify-content: flex-start;
      span {
        padding: 0.02rem;
        font-size: 0.24rem;
        color: #fff;
        border-radius: 0.02rem;
        margin: 0.1rem 0.1rem 0.1rem 0;
      }
    }
    .txt {
      text-align: left;
      margin-top: 0.1rem;
      .goodsPrice {
        color: #c81c28;
        font-size: 0.3rem;
      }
      .saleNum {
        color: #aaa;
        margin-left: 0.1rem;
      }
    }

    .ziying,
    .jingbao {
      background-color: #ff7a6a;
    }
    .baoyou,
    .youxuan {
      background-color: #d2b770;
    }
  }
}
</style>