<template>
  <div class="address">
    <Header>
      <div class="topTitle">
        <span>收货地址</span>
      </div>
    </Header>

    <div class="addAddress" @click="toAddAddress">
      <div>
        <i class="iconfont icon-jia1"></i>
        <span>添加收货地址</span>
      </div>
    </div>

    <ul class="addressList">
      <li class="addressInfo" v-for="(item,index) in addressList" :key="index">
        <div class="content">
          <div class="top">
            <span>收货人:{{item.name}}</span>
            <span>{{item.telephone}}</span>
          </div>
          <div class="bottom">
            <p class="info">收货地址:&nbsp;{{item.address}}</p>
          </div>
        </div>
        <ul class="tools">
          <li @click="changeChosen(item)">
            <i class="iconfont icon-danxuankuangxuanzhong"></i>送到这里
          </li>
          <li>
            <span @click="changeAddress(item)">
              <i class="iconfont icon-xiugai"></i> 修改
            </span>
            <span @click="delAddress(item,index)">
              <i class="iconfont icon-iconfont-shanchu"></i>删除
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  data() {
    return {
      addressList: [],
      token: ""
    };
  },
  components: {
    Header
  },
  methods: {
    reqAddressList() {
      const { token } = this;
      this.$axios
        .post("/xiaohu/api/address/t/list", {
          token
        })
        .then(res => {
          const { code, msg, list } = res;
          if (code == -2) {
            this.$router.push("/register");
          } else if (code == 1) {
            this.addressList = list;
          }
        });
    },
    //修改默认地址
    changeChosen(item) {
      const { token } = this;
      const addressId = item._id;
      //把该用户ID下的所有默认地址设为false
      this.$axios
        .post("/xiaohu/api/address/t/chosenAll", {
          token
        })
        .then(res => {
          const { code, msg } = res;
          if (code == -2) {
            this.$router.push("/register");
          } else if (code == 1) {
            //设置点击项的默认地址为true
            this.$axios
              .post("/xiaohu/api/address/t/chosen", {
                token,
                addressId,
                chosen: true
              })
              .then(({ code, msg }) => {
                if (code == -2) {
                  this.$router.push("/register");
                } else {
                  this.$router.push("/settlement");
                }
              });
          }
        });
    },
    changeAddress(item) {
      localStorage.setItem("changeId", item._id);
      this.$router.push("/consigneeInfo");
    },
    toAddAddress() {
      this.$router.push("/consigneeInfo");
    },
    //删除某项
    delAddress(item, index) {
      const addressId = item._id;
      const { token } = this;
      this.$createDialog({
        type: "confirm",
        icon: "cubeic-alert",
        title: "提示",
        content: "确认删除？",
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
            .post("/xiaohu/api/address/t/del", {
              token,
              addressId
            })
            .then(res => {
              // 请求成功之后才会删除页面上的地址
              this.addressList.splice(index, 1);
            });
        }
      }).show();
    }
  },
  mounted() {
    localStorage.removeItem("changeId");
    this.token = localStorage.getItem("token");
    this.reqAddressList();
  }
};
</script>

<style lang="scss" scoped>
.addressInfo {
  width: 100vw;
  padding: 0.1rem 0.2rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #333;
  margin: 0.2rem 0;
  .content {
    width: 100%;
    padding: 0 0.1rem;
    border-bottom: 1px dashed #d7d6da;
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
  .tools {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.2rem 0;
    i {
      margin-right: 0.02rem;
    }
    li:nth-of-type(1) {
      i {
        color: #ddd !important;
      }
    }
  }
}
.topTitle {
  width: 5rem;
  font-size: 0.32rem;
  font-weight: 400;
}
.addAddress {
  margin-top: 1rem;
  height: 2rem;
  background: #5e6b85;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.3rem;
  i {
    position: relative;
    bottom: -0.1rem;
    left: -0.1rem;
    font-size: 0.4rem;
  }
}
.address {
  height: 100vh;
  background-color: #f5f5f5;
}
</style>