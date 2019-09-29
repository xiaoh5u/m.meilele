<template>
  <div class="goodsDetail">
    <!-- TOP部分 -->
    <Header>
      <div class="topTitle">
        <span>商品详情</span>
      </div>
      <template v-slot:icon>
        <i @click="toCart" class="iconfont icon-gouwuche"></i>
      </template>
    </Header>

    <!-- 幻灯片 -->
    <div class="banner">
      <mt-swipe :auto="0" :show-indicators="false" @change="handleChange">
        <mt-swipe-item v-for="(item,index) in swiperList" :key="index">
          <!-- <cube-button @click="showImagePreview"> -->
          <img :src="item" alt />
         
          <!-- </cube-button> -->
        </mt-swipe-item>
      </mt-swipe>
       <div class="label">{{swiperIndex+1+ '/' +(swiperLength*1)}}</div>
    </div>

    <div class="goodsInfo">
      <!-- 详情头部 -->
      <div class="goodsTitle">
        <div class="saleInfo">
          <div class="left">
            <strong class="price">{{goodsPrice}}</strong>
            <span class="delPrice">{{delPrice}}</span>
          </div>
          <span class="right">已售{{goodsSaleNum}}</span>
        </div>

        <div class="name">{{goodsName}}</div>

        <div class="bottom">超值好货，狂享优惠</div>
      </div>

      <!-- 商品样式选择 -->
      <div class="chosen">
        <div class="chooise" @click="showAttr">
          <div class="text">
            <span>已选:</span>
            <span>{{arrAttr[isActive]}} {{colorArr[isColor]}} {{buyNum}}件</span>
          </div>
          <i class="iconfont icon-youjiantou"></i>
        </div>
        <!--  -->
        <div>
          <div class="text">
            <span>送至:</span>
            <span>
              <i class="iconfont icon-location"></i>请选择配送区域
            </span>
          </div>
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </div>

      <transition name="fade" @mousemove.prevent>
        <!-- 商品选择组件 -->
        <div class="chosneAttr" v-if="isAttr">
          <div class="back" @click="closeAttr">点击此处返回</div>
          <div class="info">
            <div class="title">
              <span @click="closeAttr">取消</span>
              <strong>选择样式</strong>
              <span @click="closeAttr">确定</span>
            </div>
            <!-- 头部 -->
            <div class="top">
              <img :src="buyInfo.imgUrl" alt />
              <div class="txt">
                <p class="name sl2">{{buyInfo.title}}</p>
                <p class="price">{{buyInfo.price}}</p>
              </div>
            </div>

            <div class="main">
              <!--类型选择 -->
              <div class="modle">
                <div class="attrTitle">类型</div>
                <div class="pop">
                  <span
                    v-for="(item,index) in arrAttr"
                    :key="index"
                    @click="attrChooise(index)"
                    :class="{attrChooise: isActive==index}"
                  >{{item}}</span>
                </div>
              </div>
              <!--颜色选择 -->
              <div class="modle" v-show="colorArr!=''">
                <div class="attrTitle">颜色</div>
                <div class="pop">
                  <span
                    v-for="(item,index) in colorArr"
                    :key="index"
                    @click="colorChooise(index)"
                    :class="{attrChooise: isColor==index}"
                  >{{item}}</span>
                </div>
              </div>
              <!--规格展示 -->
              <div class="modle">
                <div class="attrTitle">规格</div>
                <div class="attr">{{buyInfo.size}}</div>
              </div>
              <!--数量选择 -->
              <div class="modle">
                <div class="attrTitle">数量</div>
                <div class="num">
                  <span class="reduce iconfont icon-jian" @click="reduce"></span>
                  <span class="val">{{buyNum}}</span>
                  <span class="add iconfont icon-jia" @click="add"></span>
                </div>
              </div>
            </div>
            <div class="btn" @click="addCar" @click.stop>加入购物车</div>
          </div>
        </div>
      </transition>
      <!-- 图文详情 -->
      <ul class="detail">
        <li
          @click="onActive(index)"
          :class="{on:num == index}"
          v-for="(item,index) in detailTtilel"
          :key="index"
        >{{item}}</li>
      </ul>
      <!-- 图片组件 -->
      <div class="showPic" v-show="num==0">
        <div class="photo" v-for="(item,index) in imgList" :key="index">
          <img v-lazy="item" alt />
        </div>
      </div>

      <!-- 底部菜单栏 -->
      <div class="footer">
        <div class="icon">
          <div class="toHome" @click="toHome">
            <i class="iconfont icon-shouye"></i>
            <p>首页</p>
          </div>
          <div class="shop">
            <i class="iconfont icon-buoumaotubiao10"></i>
            <p>客服</p>
          </div>
        </div>

        <div class="buy">
          <div class="item">
            <span class="text" @click="showAttr">添加到购物车</span>
          </div>

          <div class="item">
            <span class="text" @click="toSettlement">立即购买</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      imgList: [],
      swiperList: [],
      swiperLength: 0,
      goodsName: "",
      goodsPrice: 0,
      num: 0,
      goodsSaleNum: 0,
      delPrice: 0,
      buyInfo: {},
      detailTtilel: ["图文详情", "规格参数", "相似推荐"],
      buyNum: 1,
      isAttr: false,
      isActive: 0,
      isColor: 0,
      arrAttr: [],
      colorArr: [],
      goodsId: "",
      buyColor: "",
      buyAttr: "",
      token: "",
      swiperIndex:0,
    };
  },
  components: {
    Header
  },
  methods: {
    showImagePreview() {
      this.$createImagePreview({
        imgs: this.swiperList
      }).show();
    },
    handleChange(index) {
      this.swiperIndex = index;
    },
    toHome() {
      this.$router.push("/home");
    },
    toCart() {
      const token = this;
      if (!token) {
        // MessageBox({
        //   title: "提示",
        //   message: "您还未登录,是否去登录?",
        //   showCancelButton: true
        // }).then(data => {
        // if (data == "confirm") {
        //   this.$router.push("/register");
        // }
        // });
        this.$router.push("/register");
        return;
      } else {
        this.$router.push("/cart");
      }
    },
    showAttr() {
      this.isAttr = true;
      document.documentElement
        .querySelector("body")
        .setAttribute("style", "overflow:hidden");
    },
    closeAttr() {
      this.isAttr = false;
      document.documentElement
        .querySelector("body")
        .setAttribute("style", "overflow:auto");
    },
    reqGoodsDetail() {
      const infoStr = sessionStorage.getItem("info");
      const infoArr = infoStr.split(",");
      const url = infoArr[0];
      this.goodsSaleNum = infoArr[1];
      this.goodsId = infoArr[2];
      return this.$axios.get(`/sale/api${url}`);
    },
    //头部导航栏选中效果
    onActive(index) {
      this.num = index;
    },
    //点击商品增加
    add() {
      this.buyNum++;
    },
    attrChooise(index) {
      this.isActive = index;
      this.buyAttr = this.arrAttr[index];
    },
    colorChooise(index) {
      this.isColor = index;
      this.buyColor = this.colorArr[index];
    },

    //点击商品减少
    reduce() {
      if (this.buyNum == 1) {
        Toast("商品数量不能小于一件");
      } else {
        this.buyNum--;
      }
    },
    //点击添加到购物车
    addCar() {
      const {
        token,
        goodsId,
        buyAttr,
        buyNum,
        buyColor,
        goodsName,
        goodsPrice
      } = this;
      const imgUrl = this.swiperList[0];
      if (!token) {
        // MessageBox({
        //   title: "提示",
        //   message: "您还未登录,是否去登录?",
        //   showCancelButton: true
        // }).then(data => {
        //   if (data == "confirm") {

        //   }
        // });

        this.$router.push("/register");
        return;
      }
      // 发出请求
      this.$axios
        .post("/xiaohu/api/cart/t/add", {
          token,
          goodsId,
          goodsName,
          imgUrl,
          buyAttr,
          buyNum,
          buyColor,
          goodsPrice
        })
        .then(res => {
          const { code, msg } = res;

          if (code == 1) {
            Toast({
              message: msg,
              duration: 1200
            });
            setTimeout(() => {
              this.isAttr = false;
              document.documentElement
                .querySelector("body")
                .setAttribute("style", "overflow:auto");
            }, 1200);
          } else if (code == -1) {
            Toast(msg);
          } else if (code == -2) {
            Toast(msg);
            // 自动跳转到登录页
            this.$router.push("/register");
          }
        });
    },
    //去往结算页
    toSettlement() {
      const {
        token,
        goodsId,
        buyAttr,
        buyNum,
        buyColor,
        goodsName,
        goodsPrice
      } = this;
      const imgUrl = this.swiperList[0];
      if (!token) {
        this.$router.push("/register");
        return;
      }
      // 发出请求
      this.$axios
        .post("/xiaohu/api/cart/t/add", {
          token,
          goodsId,
          goodsName,
          imgUrl,
          buyAttr,
          buyNum,
          buyColor,
          goodsPrice
        })
        .then(res => {
          const { code, msg } = res;

          if (code == 1) {
            const { goodsId, token } = this;
            this.$axios
              .post("/xiaohu/api/cart/t/nowBuy", {
                goodsId,
                token
              })
              .then(res => {
                const { msg, code, data } = res;
                if (code == 1) {
                  let buyIds = data[0]._id;
                  localStorage.setItem("buyIds", buyIds);
                  this.$router.push("/Settlement");
                } else if (code == -2) {
                  this.$router.push("/register");
                } else {
                  Toast(msg);
                }
              });
          } else if (code == -1) {
            Toast(msg);
          } else if (code == -2) {
            Toast(msg);
            // 自动跳转到登录页
            this.$router.push("/register");
          }
        });
    }
  },
  mounted() {
    //获取商品信息(HTML)
    this.reqGoodsDetail().then(res => {
      //从DOM节点里拿数据
      let parser = new DOMParser();
      let doc = parser.parseFromString(res, "text/html");

      //详情图片地址列表
      let attr = doc.querySelector("#JS_goods_attr_textarea").innerHTML;
      let arr = attr.split("/div&gt;");
      arr = arr.slice(0, arr.length - 1);
      arr.forEach(item => {
        const start_index = item.indexOf("/");
        const end_index = item.indexOf("jpg");
        this.imgList.push(
          item.substring(start_index, end_index + 4).split('"')[0]
        );
      });

      //轮播图列表
      let swipe = doc.querySelectorAll(
        "#JS_gallery_swiper_container .swiper-wrapper .swiper-slide img"
      );
      swipe.forEach(item => {
        this.swiperList.push(item.getAttribute("data-src"));
      });
      this.swiperLength = this.swiperList.length;

      //商品选择参数
      let info = doc.querySelector("#JS_goods_property_textarea").innerText;
      let dom = parser.parseFromString(info, "text/html");

      //类型数组
      const attrInfo = dom.querySelectorAll("#JS_goods_attr_attr a");

      if (attrInfo.length) {
        attrInfo.forEach(item => {
          this.arrAttr.push(item.innerText);
        });
      } else {
        this.arrAttr = ["默认类型"];
      }

      //颜色数组
      const colorInfo = dom.querySelectorAll("#JS_goods_attr_color a");

      if (colorInfo.length) {
        colorInfo.forEach(item => {
          this.colorArr.push(item.innerText);
        });
      } else {
        this.colorArr = ["默认颜色"];
      }

      //默认购买样式
      (this.buyColor = this.colorArr[0]), (this.buyAttr = this.arrAttr[0]);

      this.goodsPrice = doc.querySelector(".goods-sell .t2").innerText;
      this.delPrice = doc.querySelector(
        ".goods-sell .t2"
      ).nextElementSibling.innerText;
      this.goodsName = doc.querySelector(".padding-box h2").innerText;

      //信息赋值
      this.buyInfo = {
        imgUrl: dom.querySelector(".face img").src,
        title: dom.querySelector(".info .title").innerText,
        price: dom.querySelector(".info .price").innerText,
        size: dom.querySelector("#JS_goods_attr_size dd").innerText
      };
    });
    this.token = localStorage.getItem("token");
  }
};
</script>

<style lang="scss" scoped>
.cube-btn {
  border: 0;
  padding: 0;
  width: 0;
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 9;
}
.attrChooise {
  border: 1px solid #da0000 !important;
  color: #da0000;
}
.goodsDetail {
  background: #f5f5f5;
}
.topTitle {
  width: 5rem;
  font-size: 0.38rem;
}
.icon-gouwuche {
  display: inline-block;
  margin-right: 0.2rem;
}
.banner {
  height: 5rem;
  position: relative;
  margin-top: 1rem;
  img {
    object-fit: cover;
  }
  .label {
    position: absolute;
    bottom: 0.3rem;
    right: 0.3rem;
    padding: 0.078rem 0.3rem;
    border-radius: 0.2rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 0.3rem;
  }
}

.goodsInfo {
  .goodsTitle {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding: 0 0.2rem;
    .saleInfo {
      width: 100%;
      padding: 0.32rem 0 0.28rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        .price {
          font-size: 0.4rem;
          font-weight: 400;
          color: #cf000e;
          &::before {
            content: "￥";
            font-size: 0.2rem;
            margin-right: -0.05rem;
          }
        }
        .delPrice {
          color: #aaa;
          text-decoration: line-through;
        }
      }
      .right {
        color: #aaa;
        align-self: flex-end;
      }
    }
    .name {
      font-size: 0.3rem;
    }
    .bottom {
      color: #777;
      font-size: 0.24rem;
      padding: 0.15rem 0;
    }
  }
}
.chosen {
  width: 100%;
  margin-top: 0.2rem;
  div {
    padding: 0.2rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      &:nth-of-type(2) {
        margin-left: 0.2rem;
      }
    }
  }
  .chooise {
    border-bottom: solid 1px #d8d8d8;
  }
}
.detail {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0 0.3rem 0;
  background-color: #fff;
  margin-top: 0.2rem;
  li {
    padding: 0 0.1rem 0.1rem 0.1rem;
  }
  .on {
    color: #da0000;
    border-bottom: 2px solid #da0000;
  }
}
.showPic {
  width: 100vw;
  margin-bottom: 0.8rem;
  .photo {
    img {
      width: 100%;
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  .icon {
    width: 40%;
    height: 0.7rem;
    display: flex;
    justify-content: space-around;
    text-align: center;
    align-items: center;
    background-color: #fff;

    div {
      width: 50%;
      height: 100%;
      vertical-align: middle;

      &:nth-of-type(1) i {
        font-size: 0.5rem;
      }
      &:nth-of-type(2) i {
        font-size: 0.34rem;
        display: inline-block;
        margin-top: 0.08rem;
      }
      &:nth-of-type(2) p {
        margin-top: 0.09rem;
      }
    }
    p {
      font-size: 0.12rem;
    }
    .icon-buoumaotubiao10 {
      font-size: 0.24rem;
    }
    .toHome {
      border-right: 1px solid #aaa;
    }
  }
  .buy {
    width: 80%;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      width: 50%;
    }
    .item:nth-of-type(1) {
      background-color: orangered;
    }
    .item:nth-of-type(2) {
      background-color: #e62318;
    }
  }
}
.chosneAttr {
  width: 100vw;
  height: 100vh;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  .back {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    writing-mode: vertical-rl;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.3rem;
    flex: 1;
  }
  .info {
    position: relative;
    width: 6.6rem;
    height: 100%;
    background-color: #fff;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      height: 1rem;
      span {
        width: 20%;
        font-size: 0.32rem;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        &:nth-of-type(2) {
          margin-right: 0.22rem;
        }
      }
      strong {
        font-size: 0.34rem;
        align-self: flex-start;
        margin-top: 0.1rem;
        color: #333;
      }
    }
    .btn {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      background-color: #ff9402;
      font-size: 0.3rem;
      color: white;
    }
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.2rem 0 0.2rem 0.25rem;
    height: 1.7rem;
    width: 100%;
    text-align: left;
    position: relative;
    border-top: 1px solid #d8d8d8;
    border-bottom: 1px solid #d8d8d8;
    img {
      width: 30%;
    }
    .txt {
       padding:0 .2rem;
       line-height: .3rem;
      .price {
        position: absolute;
        bottom: 0.26rem;
        color: #c00;
        font-size: 0.2rem;
      }
     
    }
  }
  .main {
    height: 100%;
    color: #333;
    overflow: auto;
    .modle {
      padding: 0.2rem;
      margin: 0.1rem 0;
      text-align: left;

      .pop {
        margin-top: 0.1rem;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        span {
          padding: 0.1rem;
          margin: 0.1rem 0.08rem;
          border: 1px solid #ccc;
          border-radius: 0.1rem;
        }
      }
      .attr {
        margin-top: 0.1rem;

        line-height: 0.3rem;
      }
    }
    .num {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 0.2rem 0;
      text-align: center;
      line-height: 0.6rem;

      .name {
        font-size: 0.32rem;
      }
      .reduce,
      .add {
        width: 0.6rem;
        height: 0.6rem;
        border: 1px solid #ddd;
      }
      .val {
        width: 1rem;
        height: 0.6rem;
        font-size: 0.3rem;
        line-height: 0.6rem;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
      }
    }
  }
}
/**
    * 定义进入动画和退出动画的过程
    * 代表关注的是height的变化，动画的时间是5
    */
.fade-enter-active,
.fade-leave-active {
  transition: width 0.6s;
}

/* 定义进入动画的初始状态*/
.fade-enter {
  width: 0vw;
}

/* 定义进入动画的结束状态*/
.fade-enter-to {
  width: 100vw;
}

/* 定义离开动画的初始状态*/
.fade-leave {
  width: 100vw;
}

// /* 定义离开动画的结束状态*/
.fade-leave-to {
  width: 0vw;
}
</style>