<template>
  <div class="home" ref='home'>
    <div class="header">
      <div class="top">
        <!-- logo -->
        <img :src="require('@/assets/images/logo.png')" alt />
        <!-- 搜索 -->
        <div class="search">
          <router-link to="/search">
            <div class="text">
              <i class="iconfont icon-guanbi"></i>
              <span>搜索商品</span>
            </div>
          </router-link>
        </div>
        <!-- 选择所在城市 -->
        <div class="choice">
          <span>全国</span>
          <i class="iconfont icon-icon--1"></i>
        </div>
      </div>
      <!-- 头部导航栏 -->
      <div class="nav">
        <cube-tab-bar v-model="selectedLabelSlots" show-slider inline>
          <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index">{{item.label}}</cube-tab>
        </cube-tab-bar>
      </div>
    </div>

    <!-- 轮播图 -->
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in swiperList" :key="index">
          <img :src="item" alt />
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 中间导航 -->
    <ul class="midNav">
      <li v-for="(item,index) in midIcon" :key="index" @click="toList(item.type)">
        <img :src="'http://image.meilele.com/images/201907/'+item.img" alt />
        <p class="sl">{{item.name}}</p>
      </li>
    </ul>

    <div class="main">
      <!-- 限时抢购 -->
      <div class="groupBuy">
        <div class="title">
          <span>限时抢购</span>
          <i></i>
        </div>

        <ul class="saleGoods">
          <li
            v-for="(item,index) in groupBuyList"
            :key="index"
            @click="toDetail(item.good_url,randomList[index],item.id)"
          >
            <img class="goodsImg" :src="'https://image.meilele.com/'+item.img_url" alt />
            <p class="time">
              <i></i>
              <!-- 倒计时 -->
              <span>{{item.txt}}</span>
            </p>
            <div class="goodsTitle sl">{{item.title}}</div>
            <div class="text">
              <span class="price">￥{{item.good_price}}</span>
              <span class="originPrice">{{item.ori_price}}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 新品首发 -->
      <div class="newGoods">
        <div class="title">
          <span>新品首发</span>
          <i></i>
        </div>

        <div class="container">
          <div class="left">
            <img
              src="https://image.meilele.com//images/upload/201908/7f63ed785cb085d0c276bd810eaaa9e8.jpg"
              alt
            />
            <div class="info">
              <p class="name">清新实木餐台套装</p>
              <div class="price">￥4599</div>
            </div>
          </div>

          <div class="right">
            <div class="top">
              <img
                src="https://img004.mll3321.com//images/upload/201908/e59e3ae6094e76e963296a9228cdc6f5.jpg"
                alt
              />
              <div class="info">
                <p class="name">1.8米鹅掌楸实木床</p>
                <div class="price">￥7299</div>
              </div>
            </div>
            <div class="bottom">
              <img
                src="https://img003.mll3321.com//images/upload/201908/61fad1da0290008ef32cc83c71025121.jpg"
                alt
              />
              <div class="info">
                <p class="name">皮布沙发套装</p>
                <div class="price">￥17999</div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div class="clickSwipe">
        <template>
          <cube-tab-bar v-model="selectedLabel" show-slider>
            <cube-tab v-for="(item, index) in qwlist" :label="item.label" :key="index"></cube-tab>
          </cube-tab-bar>
          <cube-tab-panels v-model="selectedLabel">
            <cube-tab-panel v-for="(item, index) in qwlist" :label="item.label" :key="index">
              <div class="swipeModle">
                <!-- 上方图片部分 -->
                <div class="top">
                  <img :src="item.bigImg" alt />
                  <span class="label"></span>
                  <i class="arrow"></i>
                </div>
                <!-- 下方小图 -->
                <ul class="bottom">
                  <li v-for="(itemInfo,index) in item.bottom" :key="index">
                    <img :src="itemInfo.smallImg" />
                    <p class="goodsName">{{itemInfo.goodsName}}</p>
                    <p class="price">￥{{itemInfo.goodsPrice}}</p>
                  </li>
                </ul>
              </div>
            </cube-tab-panel>
          </cube-tab-panels>
        </template>
      </div>



       <!-- 猜你喜欢 -->
    <div class="like">
      <div class="title">猜你喜欢</div>
      <ul>
        <li
          v-for="(item,index) in LikeGoodsList"
          :key="index"
          @click="toDetail(item.goods_uri,randomList[index],item.id)"
        >
          <img v-lazy="'https://image.meilele.com/'+item.goods_thumb" alt />
          <p class="goodsPrice">
            ￥{{item.show_price}}
            <span v-show="item.activity_search_name_List">促销</span>
          </p>
          <p class="goodsTitle sl">{{item.new_goods_name}}</p>
          <p class="sale">已售{{randomList[index]}}</p>
        </li>
      </ul>
    </div>
    </div>

       <BackToTop/>

  </div>
</template>

<script>
import BackToTop from "@/components/BackToTop.vue";
export default {
  components:{
    BackToTop
  },
  data() {
    return {
      navTitle: [
        "首页",
        "新品",
        "每日特卖",
        "沙发",
        "床",
        "床垫",
        "实木家具",
        "地板"
      ],
      selectedLabel: "客厅",
      choiseName: [
        {
          label: "客厅"
        },
        {
          label: "卧室"
        },
        {
          label: "餐厅"
        }
      ],
      selectedLabelSlots: "首页",
      tabs: [
        {
          label: "首页"
        },
        {
          label: "新品"
        },
        {
          label: "每日特卖"
        },
        {
          label: "沙发"
        },
        {
          label: "床"
        },
        {
          label: "床垫"
        },
        {
          label: "实木家具"
        },
        {
          label: "地板"
        }
      ],
      swiperList: [
        "http://image.meilele.com/images/201812/1544662133279151921.jpg",
        "http://image.meilele.com/images/201907/1564091856054255759.jpg"
      ],
      midIcon: [
        {
          name: "体验馆",
          img: "1563130946587908766.jpg"
        },
        {
          name: "排行榜",
          img: "1563130976630267490.jpg"
        },
        {
          name: "每日特卖",
          img: "1563131021896383462.jpg"
        },
        {
          name: "阅木",
          img: "1563131064221658082.jpg"
        },
        {
          name: "实木家具",
          img: "1563131080096635544.jpg"
        },
        {
          name: "沙发",
          img: "1563131093521181710.jpg",
          type: "shafa"
        },
        {
          name: "床",
          img: "1563131115705453289.jpg",
          type: "chuang"
        },
        {
          name: "床垫",
          img: "1563131129464675923.jpg",
          type: "chuangdian"
        }
      ],
      groupBuyList: [],
      num: 0,
      timeList: [],
      ins: 0,
      qwlist: [
        {
          label: "客厅",
          bigImg:
            "https://img003.mll3321.com//images/upload/201908/c8611e94cde8058e1f869ed2b4b79b1f.jpg",

          bottom: [
            {
              smallImg:
                "https://img004.mll3321.com//images/small/297/width/210/height/210/mode/1/encrypt/97cb995c458c03d76717e60ce344a6fb/path/YKkxtD0+l8CT6mdTP0jUTosXyzGqRaYb484nDncYwHONm1jfRzWkc_ZfDzqdQtpqBOeBoInQss01m1_QU+p72A==.jpg",
              goodsName: "布艺沙发套装",
              goodsPrice: "8499"
            },
            {
              smallImg:
                "https://image.meilele.com//images/small/401/width/210/height/210/mode/1/encrypt/101788d90c1bc6baea129148390bbd84/path/YKkxtD0+l8CT6mdTP0jUTosXyzGqRaYb484nDncYwHO044qmt3A3nToQl6LimbjcYo9hvMIKUi4OX89uHn5M6g==.jpg",
              goodsName: "北欧简约电视柜",
              goodsPrice: "2499"
            },
            {
              smallImg:
                "https://image.meilele.com//images/small/190/width/210/height/210/mode/1/encrypt/111101a133b21456b0f8bc2349e55e96/path/YKkxtD0+l8CT6mdTP0jUTosXyzGqRaYb484nDncYwHO0tC1xMdmSFQHeCE_ZjNOcKl_y_5DO4hll4TuQywEvIg==.jpg",
              goodsName: "全实木茶几",
              goodsPrice: "1799"
            }
          ]
        },
        {
          label: "卧室",
          bigImg:
            "https://image.meilele.com//images/upload/201908/a3176c7dece9e9608aa04292f940f928.jpg",

          bottom: [
            {
              smallImg:
                "https://img001.mll3321.com//images/small/121/width/210/height/210/mode/1/encrypt/db52f6255a14bd7ec0d1052c17e5843a/path/YKkxtD0+l8CT6mdTP0jUTosXyzGqRaYb484nDncYwHProosullpSNtGUyqRSdA_r05cDCqBXMBXm1hXdyq7faw==.jpg",
              goodsName: "1.8米软包床",
              goodsPrice: "1699"
            },
            {
              smallImg:
                "https://img002.mll3321.com//images/small/424/width/210/height/210/mode/1/encrypt/0bda337af37a33d624ccf5a183b76ba6/path/YKkxtD0+l8CT6mdTP0jUTosXyzGqRaYb484nDncYwHNknX9IJBPd9UEig1IOwNpOz1epTn8r2t6rfe8WF3_KQg==.jpg",
              goodsName: "双抽床头柜",
              goodsPrice: "599"
            },
            {
              smallImg:
                "https://img001.mll3321.com//images/small/192/width/210/height/210/mode/1/encrypt/8e23d5e5c183b078791340137a044110/path/YKkxtD0+l8CT6mdTP0jUTosXyzGqRaYb484nDncYwHN262ZF+8SSR3VcxTGA5soWB1mPllpe_KM75roXYjq6og==.jpg",
              goodsName: "平开四门衣柜",
              goodsPrice: "5699"
            }
          ]
        },
        {
          label: "餐厅",
          bigImg:
            "https://image.meilele.com//images/upload/201908/279d1013b54970936d3511255507d623.jpg",

          bottom: [
            {
              smallImg:
                "https://img004.mll3321.com//images/small/295/width/210/height/210/mode/1/encrypt/04378fe9dabcaef98ad984528d6540c3/path/YKkxtD0+l8CT6mdTP0jUTosXyzGqRaYb484nDncYwHOjy5YLG8BGRpV2dULIbdS4xk52i7gvD7mSw0i3MbaJGw==.jpg",
              goodsName: "1.5米餐厅套装",
              goodsPrice: "3199"
            },
            {
              smallImg:
                "https://img004.mll3321.com//images/small/165/width/210/height/210/mode/1/encrypt/6891c798d8a865b54f614ceb2d11bf41/path/YKkxtD0+l8CT6mdTP0jUTosXyzGqRaYb484nDncYwHO3xAZBzg1LZOg1mPVeuPu8SpXz2K+wxft30j4PMoRg2A==.jpg",
              goodsName: "储物餐边柜",
              goodsPrice: "2299"
            },
            {
              smallImg:
                "https://img002.mll3321.com//images/small/225/width/210/height/210/mode/1/encrypt/8e93e31095cd99454a673bfa07508e55/path/YKkxtD0+l8CT6mdTP0jUTosXyzGqRaYb484nDncYwHPFtqvZ2Y7V1CoZH7j9QW3iJrUv9lSS2jDNIFqZf2o_dQ==.jpg",
              goodsName: "全实木餐椅",
              goodsPrice: "550"
            }
          ]
        }
      ],
      LikeGoodsList: "",
      randomList: []
    };
  },
  methods: {
    //跳转到列表页
    toList(type) {
      if (type) {
        this.$router.push("/goodslist/" + type);
      }
    },
    toDetail(url, saleNum, id) {
      const info = [url, saleNum, id];
      sessionStorage.setItem("info", info);
      this.$router.push("/goodsdetail");
    },

    //头部导航栏选中效果
    onActive(index) {
      this.num = index;
    },
    //获取限时抢购商品
    reqGroupBuyList() {
      return this.$axios.get("/sale/api/mob_api/app_tg_goods");
    },
    //猜你喜欢商品列表
    reqLikeGoodsList() {
      this.$axios
        .get("/sale/api/dubbo_api/mll/articleAd/getLikeProducts", {
          params: {
            userTags:
              "k010z*k060e*k110a*m0104*m0703*m0803*s0801*m4202*f1505*s0503*v2002*k1602*c0102*f1602*g0402*k0504*r6203*s100a",
            pagSize: 30,
            cid: "qqqk0sue7sv_9027387"
          }
        })
        .then(data => {
          const { msg, error, result } = data;
          if (!error) {
            this.LikeGoodsList = result;
          }
        });
    },
    buzero(n) {
      return n < 10 ? "0" + n : n;
    },
    //限时购买商品倒计时
    getTime(goods_status, start_time, end_time) {
      //获取当前时间戳
      const timestamp = new Date().getTime();
      let timeTxt = "";
      if (goods_status == 2) {
        const time = end_time - timestamp / 1000;
        const day = parseInt(time / 60 / 60 / 24);
        const hours = parseInt(time / 60 / 60) % 24;
        const minutes = parseInt(time / 60) % 60;
        const s = parseInt(time % 60);
        return (timeTxt = `仅剩${this.buzero(day)}天${this.buzero(hours) +
          ":" +
          this.buzero(minutes) +
          ":" +
          this.buzero(s)}`);
      } else {
        const time = start_time - timestamp / 1000;
        const day = parseInt(time / 60 / 60 / 24);
        const hours = parseInt(time / 60 / 60) % 24;
        const minutes = parseInt(time / 60) % 60;
        const s = parseInt(time % 60);
        return (timeTxt = `${this.buzero(day)}天${this.buzero(hours) +
          ":" +
          this.buzero(minutes) +
          ":" +
          this.buzero(s)}开始`);
      }
    },
    //轮播自带组件
    handleChange(index) {
      this.ins = index;
    },
    //随机已售数量
    randomNum() {
      for (let i = 0; i < 30; i++) {
        this.randomList.push(parseInt(Math.random() * 30500) + 500);
      }
    }
  },
  mounted() {
    //获取限时抢购商品
    this.reqGroupBuyList().then(res => {
      const { error, msg, result } = res;
      const goodsList = result["2018Msy_tg"].goods_info;

      goodsList.forEach(item => {
        const { start_time, end_time, good_status } = item;

        const txt = this.getTime(good_status, start_time, end_time);
        this.timeList.push(txt);
      });
      setInterval(() => {
        this.groupBuyList = goodsList.map(item => ({
          ...item,
          txt: this.getTime(item.good_status, item.start_time, item.end_time)
        }));
      }, 1000);
    });

    //猜你喜欢商品列表
    this.reqLikeGoodsList();
    this.randomNum();
  }
};
</script>

<style lang="scss" scoped>
.like {
  padding: 0 0.2rem;
  background-color: #fff;
  ul {
    display: flex;
    justify-content: flex-start;
    text-align: left;
    flex-wrap: wrap;
    li {
      line-height: 0.36rem;
      width: 49%;
      margin-bottom: 0.4rem;
      img {
        width: 100%;
      }
     
      &:nth-of-type(2n) {
        margin-left: 2%;
      }
      .goodsPrice {
        color: #c81c28;
        margin-top: 0.18rem;
        span {
          padding: 0.04rem 0.15rem;
          border-radius: 0.05rem;
          margin-left: 0.05rem;
          margin-bottom: 0.1rem;
          line-height: 0.15rem;
          font-size: 0.15rem;
          color: #fff;
          background-color: #ff7a6a;
          vertical-align: middle;
        }
      }
      .sale {
        color: #aaa;
      }
    }
  }
}

.clickSwipe {
  height: 9rem;
  padding: .5rem 0.2rem;
  background: #fff;
  .cube-tab-bar{
    padding-bottom: .1rem;
  }
  img {
    width: 100%;
  }
  .top {
    position: relative;
    .arrow {
      position: absolute;
      bottom: -0.01rem;
      left: 0.5rem;
      border-width: 0 0.2rem 0.2rem 0.2rem;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
    }
  }
  .choise {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.24rem;
    span {
      padding: 0 0.01rem 0.1rem 0.01rem;
      margin-left: 0.8rem;
      &:nth-of-type(1) {
        margin: 0;
      }
    }
    .active {
      border-bottom: 2px solid black;
    }
  }

  .title {
    padding-bottom: 0;
  }
  .bottom {
    margin-top: 0.15rem;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 0.15rem;
      justify-content: flex-start;
      background: #fff;
      &:nth-of-type(1) {
        margin: 0;
      }
      img {
        width: 100%;
      }
      p {
        width: 100%;
        text-align: left;
        padding: 0.03rem;
        font-size: 0.26rem;
        &:nth-of-type(2) {
          color: #c81c28;
        }
      }
    }
  }
}

.newGoods {
  margin-top: 0.1rem;
  background: #fff;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.25rem;
    img {
      width: 100%;
      color: #333;
    }
    .info {
      text-align: left;
      position: absolute;
      top: 0.4rem;
      left: 0.34rem;
      .name {
        font-size: 0.28rem;
      }
      .price {
        color: #c81c28;
        font-size: 0.3rem;
        margin-top: .1rem;
      }
    }
    .left {
      width: 49%;
      float: left;
      position: relative;
    }
    .right {
      width: 49%;
      display: flex;
      flex-direction: column;
      .top {
        margin-bottom: 2%;
      }

      .top,
      .bottom {
        position: relative;
      }
    }
  }
}

.home {
  background-color: #f5f5f5;
  .main {
    background-color: #f5f5f5;
    padding-bottom: 1.2rem;
  }
}
.header {
  background-color: #fff;
  position:fixed;
  top:0;
  z-index: 999;
  .top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.1rem 0.2rem;

    img {
      width: 1.7rem;
    }
    .search {
      position: relative;
      a {
        display: inline-block;
        width: 3.85rem;
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
    .choice {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 0.3rem;
      i {
        font-size: 0.5rem;
      }
    }
  }

  /deep/.cube-tab-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow-y: scroll;
    margin-top: 0.1rem;

    .cube-tab {
      font-size: 0.29rem;
      margin: 0 0.15rem;
      padding: 0 0.1rem 0.14rem 0.1rem;
      flex: auto;
      flex-shrink: 0;
    }
  }
}

.banner {
  width: 100%;
  height: 3.6rem;
  overflow: hidden;
  margin-top: 1.4rem;
  img {
    width: 100%;
  }
}
.midNav {
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-bottom: .1rem;
  li {
    width: 25%;
  }
  img {
    width: 1.1rem;
  }
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 0;
  font-size: 0.3rem;
  font-weight: 700;
  i {
    width: 0.3rem;
    height: 0.3rem;
    display: inline-block;
    background: url("../assets/images/youjian.png");
    background-size: 0.3rem 0.3rem;
    margin: 0 0.15rem;
  }
}
.groupBuy {
  background-color: #fff;
  margin-top: 0.1rem;

  .saleGoods {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: scroll;
    padding-bottom: 0.5rem;

    li {
      width: 3rem;
      margin-left: 0.25rem;
      text-align: center;
      .goodsImg {
        height: 2.8rem;
      }
      .goodsTitle {
        padding: 0 0.2rem;
        text-overflow: ellipsis;
        font-size: 0.26rem;
      }
      .time {
        width: 90%;
        margin: 0.12rem 0 0.12rem 5%;
        background-color: #fff4e6;
        border-radius: 0.12rem;
        height: 0.38rem;
        line-height: 0.38rem;
        font-size: 0.2rem;
        color: #bf915a;
        text-align: left;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          background: url("../assets/images/clock.png");
          background-size: 0.2rem 0.2rem;
          margin-right: 0.03rem;
        }
      }
      .text {
        text-align: left;
      }
      .price {
        color: #c81c28;
        padding: 0 0.1rem 0 0.12rem;
        font-size: 0.28rem;
      }
      .originPrice {
        text-decoration: line-through;
        color: #aaa;
      }
    }
  }
}
</style>
