<template>
  <div class="goodslist" ref="goodsList">
    <div class="header">
      <!-- 顶部搜索框部分 -->
      <Header>
        
        <div class="search">
          <router-link to="/search">
            <div class="text">
              <i class="iconfont icon-guanbi"></i>
              <span>搜索商品</span>
            </div>
          </router-link>
        </div>

      </Header>
      
      <!-- 顶部分类筛选部分 -->

      <ul class="classify">
        <!-- 综合种类 -->
        <li @click="showTypes">
          <span>{{chosenName}}</span>
          <i :class="['iconfont',isType?' icon-icon--':'icon-icon--1']"></i>
          <div class="subMenu" v-show="isType">
            <span
              v-for="(item,index) in zhTypeList"
              :key="index"
              @click="chooseType(item.dataKey,item.name)"
              :class="{active :chosenType ==item.dataKey}"
            >{{item.name}}</span>
          </div>
        </li>
        <!-- 价格排序 -->
        <li @click="showPrc">
          <span>价格</span>
          <i :class="['iconfont',isPrc?' icon-icon--':'icon-icon--1']"></i>
          <div class="subMenu" v-show="isPrc">
            <span
              v-for="(item,index) in prcTypeList"
              :key="index"
              @click="chooseType(item.dataKey,'综合')"
              :class="{active :chosenType ==item.dataKey}"
            >{{item.name}}</span>
          </div>
        </li>
        <!-- 品牌筛选 -->
        <li @click="showBrand">
          <span>品牌</span>
          <i :class="['iconfont',isBrand?' icon-icon--':'icon-icon--1']"></i>
          <div class="subMenu" v-show="isBrand">
            <span
              @click.stop
              v-for="(item,index) in styTypeList"
              :key="index"
              :class="{active: item.isChosen}"
              @click="chooseBrand(item.keyWord,item)"
            >{{item.name}}</span>
            <div class="btn">
              <span @click="reset">重置</span>
              <span @click="submit">确定</span>
            </div>
          </div>
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
        <li
          v-for="(item,index) in goodsList"
          :key="index"
          @click="toDetail(item.goods_uri,item.total_sold_yes_count,item.id)"
        >
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
     <BackToTop v-if="$refs.goodsList" :scroll-obj="$refs.goodsList" />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import BackToTop from '@/components/BackToTop.vue'
export default {

  data() {
    return {
      goodsList: [],
      routerStatu: "",
      page: 1,
      allLoaded: false,
      goodsType: "",
      isPrc: false,
      isBrand: false,
      zhTypeList: [
        {
          name: "综合",
          dataKey: ""
        },
        {
          name: "新品",
          dataKey: "o7"
        },
        {
          name: "人气",
          dataKey: "o5"
        },
        {
          name: "自营",
          dataKey: "d1"
        },
        {
          name: "销量",
          dataKey: "o1"
        }
      ],
      prcTypeList: [
        {
          name: "从低到高",
          dataKey: "o4"
        },
        {
          name: "从高到低",
          dataKey: "o3"
        }
      ],
      styTypeList: [
        {
          name: "现代风格",
          keyWord: "_303",
          isChosen: false
        },
        {
          name: "中式风格",
          keyWord: "_302",
          isChosen: false
        },
        {
          name: "简美风格",
          keyWord: "_932",
          isChosen: false
        },
        {
          name: "欧式田园",
          keyWord: "_301",
          isChosen: false
        },
        {
          name: "北欧风格",
          keyWord: "_400",
          isChosen: false
        },
        {
          name: "美式田园",
          keyWord: "_294",
          isChosen: false
        },
        {
          name: "欧式简约",
          keyWord: "_401",
          isChosen: false
        },
        {
          name: "美式古典",
          keyWord: "_300",
          isChosen: false
        }
      ],
      isType: false,
      chosenType: "",
      chosenName: "综合",
      keyWord: ""
    };
  },
  components:{
    Header,
    BackToTop
  },

  methods: {
    //前往详情页
    toDetail(url, saleNum,id) {
      const info = [url,saleNum,id];
      sessionStorage.setItem('info',info)
      this.$router.push('/goodsdetail')
    },

    //品牌筛选
    chooseBrand(keyWord, item) {
      item.isChosen = !item.isChosen;

      this.keyWord += "," + keyWord;
    },

    //品牌筛选提交
    submit() {
      const str = this.keyWord;
      const arr = str.split(",");
      //去重
      Array.prototype.uniq = function() {
        let list = [];
        for (let i = 0; i < this.length; i++) {
          if (!list.includes(arr[i])) {
            list.push(arr[i]);
          }
        }
        return list;
      };
      let list = arr.uniq();
      let newarr = list.splice(0, 1);
      let string = list.join();
      const res = string.substr(1, string.length);

      this.keyWord = "s" + res;
      this.loadTop();
    },
    //重置条件
    reset() {
      this.styTypeList.forEach(item => {
        item.isChosen = false;
      });

      this.keyWord = "";
      this.loadTop();
    },
    //综合筛选
    chooseType(type, name) {
      this.chosenType = type;
      this.chosenName = name;
      this.loadTop();
    },
    //展示分类
    showTypes() {
      this.isType = !this.isType;
      this.isPrc = false;
      this.isBrand = false;
    },
    //价格排序
    showPrc() {
      this.isPrc = !this.isPrc;
      this.isType = false;
      this.isBrand = false;
    },
    //品牌筛选
    showBrand() {
      this.isBrand = !this.isBrand;
      this.isType = false;
      this.isPrc = false;
    },
    reqGoodsList(page, type, dataKey, keyWord) {
      return this.$axios.get(
        `/sale/api/category-${type}/list-${keyWord}-p${page}-${dataKey}/`,
        {
          params: {
            ajax: 1
          }
        }
      );
    },
    reqSearchList(page, type, dataKey, keyWord) {
      return this.$axios.get(
        `/sale/api/category-9999/list-${keyWord}-p${page}-${dataKey}/`,
        {
          params: {
            keywords: type,
            ajax: 1
          }
        }
      );
    },
    //下拉刷新组件
    loadTop() {
      this.routerStatu
        ? this.reqSearchList
        : this.reqGoodsList(
            1,
            this.goodsType,
            this.chosenType,
            this.keyWord
          ).then(res => {
            const list = res.goods_list;
            this.goodsList = list;
            this.page = 1;

            // 关闭顶部的loading
            this.$refs.loadmore.onTopLoaded();
            // 打开上拉加载更多
            this.allLoaded = false;
          });
    },
    //上拉加载更多组件
    loadBottom() {
      this.routerStatu
        ? this.reqSearchList
        : this.reqGoodsList(
            this.page + 1,
            this.goodsType,
            this.chosenType,
            this.keyWord
          ).then(res => {
            const list = res.goods_list;
            if (list != null) {
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
    },
    // 组件初始化的操作
    initComponent() {
      // 获取传入的商品类型
      const { goodsType } = this.$route.params;
      this.routerStatu = /[\u4e00-\u9fa5]/gm.test(goodsType);

      if (!this.routerStatu) {
        this.goodsType = goodsType;
        // 请求获取商品列表
        this.reqGoodsList(1, goodsType).then(res => {
          const list = res.goods_list;
          this.goodsList = list;
        });
      } else {
        this.goodsType = goodsType;
        // 请求获取商品列表
        this.reqSearchList(1, goodsType).then(res => {
          const list = res.goods_list;
          this.goodsList = list;
        });
      }
    }
  },
  mounted() {
    this.initComponent();
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  width: 100vw;
  background: #fff;
  .iconfont {
    font-size: 0.34rem !important;
  }
  .top {
    .search {
      display: inline-block;
      position: relative;
      a {
        display: inline-block;
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
    padding: 0.1rem 0 0.2rem 0;
    margin-top: 1rem;
    position: relative;
    li {
      i {
        vertical-align: top;
      }
      .subMenu {
        position: absolute;
        width: 100%;
        bottom: -1.35rem;
        padding: 0.2rem 0.2rem 0 0.2rem;
        left: 0;
        background: #fff;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        z-index: 99999;
        span {
          width: 23%;
          margin-left: 2%;
          padding: 0.1rem 0.05rem;
          border-radius: 0.05rem;
          color: #666;
          background-color: #f5f5f5;
          margin-bottom: 0.2rem;
        }
        .btn {
          width: 100%;
          display: flex;
          justify-content: space-between;
          span {
            width: 50% !important;
            padding: 0.1rem 0;
            margin-bottom: 0.1rem;
            &:last-child {
              background: #c81c28;
              color: #fff !important;
            }
          }
        }

        .active {
          color: #c81c28 !important;
          background: #fff3f4 !important;
        }
      }
      &:nth-of-type(2) .subMenu {
        bottom: -0.7rem;
      }
      &:nth-of-type(3) .subMenu {
        bottom: -2rem;
      }
      .on {
        color: black;
      }
    }
  }
}
/deep/.mint-loadmore {
  margin-top: 1.8rem;
}
.list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

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