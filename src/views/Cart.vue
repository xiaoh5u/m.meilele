<template>
  <div class="cart">
    <Header>
      <div class="topTitle">
        <span>购物车</span>
      </div>
    </Header>

    <div class="main">
      <mt-cell-swipe
        :right="[
                {
                    content: '删除',
                    style: { background: '#ff7900', color: '#fff'},
                     handler: () => messagebox(item,index)
                }
            ]"
        v-for="(item,index) in cartList"
        :key="item._id"
      >
        <div class="list">
          <img
            class="left"
            :src="require('@/assets/images/' + (item.isChosen ? 'chosen' : 'unchosen') + '.png')"
            @click="chooseItem(item)"
            alt
          />
          <div class="mid">
            <div class="pic">
              <img :src="item.imgUrl" alt />
            </div>

            <div class="info">
              <div class="goodsName sl2">{{item.goodsName}}</div>
              <div class="goodsPrice">￥{{item.goodsPrice}}</div>
            </div>

            <div class="num">
              <span
                class="reduce iconfont icon-jian"
                @click="onDecrease(item)"
                :class="{active: item.buyNum>1}"
              ></span>
              <input
                type="num"
                v-model="item.buyNum"
                class="count"
                @change="onChange(item,item.buyNum)"
              />
              <span class="add iconfont icon-jia" @click="onIncrease(item)"></span>
            </div>
          </div>
        </div>
      </mt-cell-swipe>
    </div>

    <div class="bottom" v-if="cartList.length">
      <div class="left">
        <!-- 全部选中 -->
        <div class="checkAll" @click="checkAll">
          <img
            class
            :src="require('@/assets/images/' + (isAll ? 'chosen' : 'unchosen') + '.png')"
            alt
          />
          <span class="text">全选</span>
        </div>
        <!-- 删除选中 -->
        <span class="deleteAll" @click="delAll" type="primary">删除</span>
      </div>

      <div class="right">
        <span class="total">合计:{{chosenList|calcTotal|keepDouble}}</span>
        <mt-button @click="toSettlement" class="buy" type="primary">去下单</mt-button>
      </div>
    </div>

    <!-- 没有商品时显示 -->
    <div class="noGoods" v-if="!cartList.length">
      <img src="http://image.meilele.com/wap/images/nodata/nodata_02.png" alt />
      <p class="text">您还没有加入任何商品</p>
      <cube-button :primary="true">
        <router-link to="/home">随便逛逛</router-link>
      </cube-button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      token: "",
      cartList: [],
      isBlack: false
    };
  },

  computed: {
    isAll: {
      get() {
        //用数组的Every方法，来判断是否全部都满足条件
        return (
          this.cartList.length && this.cartList.every(item => item.isChosen)
        );
      },
      set(newVal) {
        //改变全选的状态，就是让每个选项都发生相同的改变
        return this.cartList.forEach(item => (item.isChosen = newVal));
      }
    },
    //获取选中的集合
    chosenList() {
      const result = this.cartList.filter(item => item.isChosen);
      return result;
    }
  },
  /* 
            过滤器，其实就是定义一些函数，针对传入的数据做一些处理，并导出处理结果
            使用方式，就是把函数放在小胡子某个变量的后面，中间加上一条竖线
        */
  filters: {
    calcTotal(list) {
      return list.reduce((prevTotal, currItem) => {
        return prevTotal + currItem.goodsPrice * currItem.buyNum;
      }, 0);
    },
    // 保留两位小数
    keepDouble(num) {
      return num.toFixed(2);
    }
  },

  components: {
    Toast,
    Header
  },
  methods: {
    //商品点击数量加
    onIncrease(item) {
      const buyNum = item.buyNum + 1;

      // 发出请求
      this.$axios
        .post("/xiaohu/api/cart/t/update", {
          token: this.token,
          cartId: item._id,
          buyNum: buyNum
        })
        .then(res => {
          const { code, msg } = res;

          if (code == 1) {
            // 请求成功之后才会改变页面上的商品数量
            item.buyNum = buyNum;
          } else {
            this.$createToast({
              type: "alert",
              time: 1000,
              txt: msg
            }).show();
          }
        });
    },
    //商品点击数量减
    onDecrease(item) {
      if (item.buyNum == 1) {
        this.$createToast({
          type: "alert",
          time: 1000,
          txt: "商品数量不能小于1件"
        }).show();
        return false;
      }
      const buyNum = item.buyNum - 1;

      // 发出请求
      this.$axios
        .post("/xiaohu/api/cart/t/update", {
          token: this.token,
          cartId: item._id,
          buyNum: buyNum
        })
        .then(res => {
          const { code, msg } = res;

          if (code == 1) {
            this.$createToast({
              type: "alert",
              time: 1000,
              txt: msg
            }).show();

            // 请求成功之后才会改变页面上的商品数量
            item.buyNum = buyNum;
          } else {
            this.$createToast({
              type: "alert",
              time: 1000,
              txt: msg
            }).show();
          }
        });
    },
    //商品输入框...
    onChange(item, number) {
      if (number < 1) {
        this.$createToast({
          type: "alert",
          time: 1000,
          txt: "商品数量不能小于1"
        }).show();
        item.buyNum = 1;
        return false;
      } else if (number > 999) {
        this.$createToast({
          type: "alert",
          time: 1000,
          txt: "商品超过最大购买限制"
        }).show();
        item.buyNum = 999;
        return false;
      }

      // 发出请求
      this.$axios
        .post("/xiaohu/api/cart/t/update", {
          token: this.token,
          cartId: item._id,
          buyNum: number
        })
        .then(res => {
          const { code, msg } = res;

          if (code == 1) {
            this.$createToast({
              type: "alert",
              time: 1000,
              txt: msg
            }).show();
            // 请求成功之后才会改变页面上的商品数量
            item.buyNum = number - 0;
          } else {
            this.$createToast({
              type: "alert",
              time: 1000,
              txt: msg
            }).show();
          }
        });
    },

    //点击全选
    checkAll() {
      this.isAll = !this.isAll;
    },
    // 点击单选
    chooseItem(item) {
      item.isChosen = !item.isChosen;
    },
    //单个商品删除
    messagebox(item, index) {
      MessageBox({
        title: "提示",
        message: "确定要删除吗?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          this.$axios
            .post("/xiaohu/api/cart/t/del", {
              token: this.token,
              cartIds: item._id
            })
            .then(res => {
              const { code, msg } = res;

              if (code == 1) {
                this.$createToast({
                  type: "alert",
                  time: 1000,
                  txt: msg
                }).show();

                // 请求成功之后才会删除页面上的商品
                this.cartList.splice(index, 1);
              } else {
                this.$createToast({
                  type: "alert",
                  time: 1000,
                  txt: msg
                }).show();
              }
            });
        }
      });
    },
    //删除选中商品
    delAll() {
      const chosenList = this.chosenList;

      //至少选择一件商品
      if (!chosenList.length) {
        this.$createToast({
          type: "warn",
          time: 1200,
          txt: "请选择商品"
        }).show();
        return;
      }

      let cartIds = "";
      for (let e of chosenList) {
        cartIds += "," + e._id;
      }
      cartIds = cartIds.slice(1);

      this.$createDialog({
        type: "confirm",
        icon: "cubeic-alert",
        title: "提示",
        content: "确认删除所选商品？",
        confirmBtn: {
          text: "确定",
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "取消",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => {
          this.$axios
            .post("/xiaohu/api/cart/t/del", {
              cartIds,
              token: this.token
            })
            .then(({ code, msg }) => {
              if (code == 1) {
                // 请求成功之后才会删除页面上的商品
                const cartList = this.cartList;
                this.$createToast({
                  type: "alert",
                  time: 1000,
                  txt: msg
                }).show();
                for (let i = 0; i < cartList.length; i++) {
                  if (cartList[i].isChosen) {
                    cartList.splice(i, 1);
                    i--; // 每次删完，下标减1
                  }
                }
              } else {
                this.$createToast({
                  type: "warn",
                  time: 1000,
                  txt: msg
                }).show();
              }
            });
        }
      }).show();
    },
    //获取商品列表
    reqGoodsList() {
      this.$axios
        .post("/xiaohu/api/cart/t/list", {
          token: this.token
        })
        .then(({ code, msg, list }) => {
          if (code == 1) {
            //使用map方法，给每件商品添加一个是否选中的属性，默认值未选中（false）
            this.cartList = list.map(item => ({
              ...item,
              isChosen: false
            }));
          } else if (code == -2) {
            Toast({
              duration: 1200,
              message: msg
            });
            this.$router.replace("/register");
          } else {
            z;
            console.log(msg);
          }
        });
    },
    //去往结算页
    toSettlement() {
      const { chosenList } = this;
      if (!chosenList.length) {
        this.showAlert("还未选择商品");
        return;
      }

      //遍历要买的商品ID，存到本地，去下一个页面拿
      let str = "";
      chosenList.forEach(e => {
        str += e._id + ",";
      });
      const buyIds = str.slice(0, str.length - 1);
      localStorage.setItem("buyIds", buyIds);
      this.$router.push("/Settlement");
    },

    showAlert(msg) {
      this.$createDialog({
        type: "alert",
        title: "提示",
        content: msg,
        icon: "cubeic-alert"
      }).show();
    }
  },
  mounted() {
    // 从localStorage中获取token
    const token = localStorage.getItem("token");
    this.token = token;

    this.reqGoodsList();

  }
};
</script>

<style lang="scss" scoped>
.noGoods {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  .text {
    padding: 0.2rem 0;
  }
  .cube-btn {
    background-color: #da0000;
    a {
      color: #f5f5f5;
    }
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.cart {
  height: 100vh;
  background: #f5f5f5;
}
.main {
  margin: 1rem 0;
}
.header {
  height: 1rem;
  background-color: #99cccc;
  text-align: center;
  letter-spacing: 0.2rem;
  font-size: 0.4rem;
  display: flex;
  font-weight: 600;
  color: white;
  justify-content: center;
  align-items: center;
}

/deep/.mint-cell-title {
  flex: none;
}
/deep/.mint-cell-value {
  width: 100vw;
}
/deep/ .mint-cell-swipe-button {
  line-height: 2rem;
  font-size: 0.32rem;
}

.container {
  width: 100%;
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
      .goodsName {
        text-align: left;
        text-indent: 0.7em;
        line-height: 0.4rem;
      }
      .goodsPrice {
        font-weight: 700;
        color: #da0000;
        text-align: left;
        margin-top: .1rem;
      }
    }

    .num {
      color: black;
      position: absolute;
      right: 0.2rem;
      bottom: 0.3rem;
      border: 1px solid #d8d8d8;
      .add,
      .reduce {
        padding: 0 0.05rem !important;
      }
      .reduce {
        color: #d8d8d8;
      }
      .count {
        width: 1rem;
        outline: none;
        border: 0;
        padding: 0 0.2rem;
        text-align: center;
        border-left: 1px solid #d8d8d8;
        border-right: 1px solid #d8d8d8;
      }
      .active {
        color: #333;
      }
    }
  }
}
.bottom {
  padding: 0.2rem;
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 99999;
  background-color: #fff;
  .text {
    margin-left: 0.1rem;
  }
  .left,
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .checkAll {
    img {
      width: 0.4rem;
      height: 0.4rem;
      vertical-align: middle;
    }
  }
  .deleteAll {
    margin-left: 0.2rem;
    font-size: 0.24rem;
  }
  .buy {
    height: 0.8rem;
    width: 2rem;
    margin-left: 0.2rem;
    font-size: 0.36rem;
    border-radius: 0;
    background: #e62318 !important;
  }
  .right {
    flex: 1;
    justify-content: flex-end;
  }
}
.topTitle {
  width: 5rem;
  font-size: 0.32rem;
  font-weight: 400;
}
</style>