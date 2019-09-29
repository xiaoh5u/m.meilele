<template>
  <div class="container">
    <Header2>
      <template v-slot:content>
        <span>确认订单</span>
      </template>
    </Header2>

    <div class="addressInfo" @click="toAddConsignee">
      <i class="iconfont icon-location"></i>
      <div class="content">
        <div class="top">
          <span>收货人:{{addressInfo.name}}</span>
          <span>{{addressInfo.telephone}}</span>
        </div>
        <div class="bottom">
          <p class="info">收货地址:{{addressInfo.address}}</p>
        </div>
      </div>
      <i class="iconfont icon-youjiantou"></i>
    </div>

    <!-- 购买商品的列表 -->
    <ul class="goodsList">
      <li class="list" v-for="(item,index) in buyList" :key="index">
        <div class="mid">
          <div class="pic">
            <img :src="item.imgUrl" alt />
          </div>

          <div class="info">
            <div class="goodsName sl2">{{item.goodsName}}</div>
            <div class="buyInfo sl">
              <span class="sl">类型：{{item.buyAttr}}&nbsp;&nbsp;颜色：{{item.buyColor}}</span>
              <span class="iconfont icon-chenghao buyNum">{{item.buyNum}}</span>
            </div>
            <div class="goodsPrice">￥{{item.goodsPrice}}</div>
          </div>
        </div>
      </li>
    </ul>

    <div class="footer">
      <div class="text">应付总额:&nbsp;&nbsp;￥{{total}}</div>
      <div class="button">提交订单</div>
    </div>
  </div>
</template>

<script>
import Header2 from "@/components/Header2.vue";
export default {
  data() {
    return {
      token: "",
      buyIds: "",
      buyList: [],
      addressInfo: "",
      total: 0
    };
  },
  components: {
    Header2
  },

  methods: {
    //获取购买商品列表
    reqBuyList() {
      const { token, buyIds } = this;
      this.$axios
        .post("/xiaohu/api/cart/t/buyList", {
          buyIds,
          token
        })
        .then(res => {
          const { code, msg, list } = res;
          if (code == -2) {
            showAlert(msg);
            this.$router.push("/register");
          } else if (code == -1) {
            showAlert(msg);
          } else {
            this.buyList = list;
            //合计this.total
            let num = list.reduce((prevTotal, currItem) => {
              return prevTotal + currItem.goodsPrice * currItem.buyNum;
            }, 0);
            this.total = num.toFixed(2);
          }
        });
    },
    //获取地址信息列表
    reqAddressList() {
      const { token } = this;
      this.$axios
        .post("/xiaohu/api/address/t/list", {
          token
        })
        .then(res => {
          const { code, msg, list } = res;
          if (code) {
            //如果只有一条地址，那么就设为默认地址
            if (list.length == 1) {
              const addressId = list[0]._id;
              this.$axios
                .post("/xiaohu/api/address/t/chosen", {
                  token,
                  addressId,
                  chosen: true
                })
                .then(() => {
                  this.addressInfo = list[0]
                });
            } else if (!list.length) {
              this.$router.push("/consigneeInfo");
            }

            //循环列表 设置默认地址为true的项为显示地址
            list.forEach(ele => {
              if (ele.chosen == true) {
                this.addressInfo = ele;
              }
            });
          }
        });
    },

    showAlert(msg) {
      this.$createDialog({
        type: "alert",
        title: "提示",
        content: msg,
        icon: "cubeic-alert"
      }).show();
    },
    toAddConsignee() {
      this.$router.push("/addConsignee");
    }
  },

  mounted() {
    this.buyIds = localStorage.getItem("buyIds");
    this.token = localStorage.getItem("token");
    this.reqBuyList();
    this.reqAddressList();
  }
};
</script>

<style lang="scss" scoped>
.addressInfo {
  width: 100vw;
  padding: 0.1rem 0.2rem;
  background-color: #5e6b85;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-top: 1rem;
  .content {
    width: 100%;
    padding: 0 0.1rem;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0;
  }
  .bottom {
    text-align: left;
    padding: 0.2rem 0;
  }
  .icon-location {
    height: 0.932rem;
    display: flex;
    align-items: flex-end;
  }
  .icon-youjiantou {
    font-size: 0.4rem;
  }
}
.goodsList {
  margin-bottom: 1rem;
}
.list {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  position: relative;
  .left {
    width: 0.4rem;
    height: 0.4rem;
    vertical-align: middle;
  }
  .mid {
    flex: 1;
    display: flex;
    border-bottom: 1px dashed #ddd;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0.3rem 0.2rem 0.3rem 0;
    .pic {
      margin-left: 0.3rem;
      img {
        width: 2rem;
        object-fit: cover;
      }
    }
    .info {
      color: #666;
      padding-left: 0.2rem;
      position: relative;
      .goodsName {
        text-align: left;
        text-indent: 0.7em;
        line-height: 0.32rem;
      }
      .goodsPrice {
        font-weight: 700;
        color: #da0000;
        text-align: left;
      }
      .buyInfo {
        padding: 0.1rem 0;
        text-align: left;
        font-size: .2rem;
      }

      .buyNum {
        position: absolute;
        right: 0;
        bottom: 0.2rem;
        font-size: 0.2rem;
      }
    }
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  .text {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #da0000;
    padding-left: 0.2rem;
  }
  .button {
    color: white;
    flex: 1;
    height: 100%;
    background-color: #da0000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.32rem;
  }
}
</style>