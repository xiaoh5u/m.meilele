<template>
  <div class="mine">
    <Header>
      <div class="topTitle">
        <span>个人中心</span>
      </div>
    </Header>

    <div class="head">
      <div class="top">
        <i></i>
        <i></i>
      </div>
      <div class="middle">
        <span class="photo">
          <img src="@/assets/images/head.png" alt />
        </span>
        <div class="text">
          <span>{{info}}</span>
          <span>注册会员</span>
        </div>
      </div>

      <ul class="bottom">
        <li>
          <span class="label">收藏</span>
          <span class="count">0</span>
        </li>
        <li>
          <span class="label">红包卡券</span>
          <span class="count">0</span>
        </li>
        <li>
          <span class="label">足迹</span>
          <span class="count">0</span>
        </li>
      </ul>
    </div>

    <div class="list">
      <div class="modle">
        <div class="title">
          <div class="left">
            <i></i>
            <span>我的订单</span>
          </div>
          <div class="right">
            <span>查看全部订单</span>
            <i></i>
          </div>
        </div>
        <ul class="icon">
          <li v-for="(item,index) in dingdan" :key="index">
            <i></i>
            <span>{{item}}</span>
          </li>
        </ul>
      </div>

      <div class="modle">
        <div class="title">
          <div class="left">
            <i></i>
            <span>我的钱包</span>
          </div>

          <div class="right">
            <span>更多</span>
            <i></i>
          </div>
        </div>
        <ul class="icon">
          <li v-for="(item,index) in money" :key="index">
            <i></i>
            <span>
              <strong>0</strong>
              {{item}}
            </span>
          </li>
        </ul>
      </div>

      <div class="modle">
        <div class="title">
          <div class="left">
            <i></i>
            <span>客户服务</span>
          </div>

          <div class="right">
            <span></span>
            <!-- <i></i> -->
          </div>
        </div>
        <ul class="icon">
          <li v-for="(item,index) in service" :key="index">
            <i></i>
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  data() {
    return {
      dingdan: ["待付款", "待发货", "待收货", "待评价", "售后服务"],
      money: ["张优惠券", "个红包", "个乐币", "个金币"],
      service: ["退款明细", "申请保价 ", "纠纷投诉", "在线服务"],
      token: "",
      info: ""
    };
  },
  components: {
    Header
  },
  methods: {
    reqUserInfo() {
      const { token } = this;

      this.$axios
        .post("/xiaohu/api/user/t/info", {
          token
        })
        .then(res => {
          const { code, msg, info } = res;

          if (code == -2) {
            this.$router.replace("/register");
          } else if( code ==1) {
            this.info = info;
          }
        });
    }
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.reqUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.mine {
  height: calc(100vh - 2rem);
  background-color: #f5f5f5;
}
.topTitle {
  width: 5rem;
  font-size: 0.32rem;
  font-weight: 400;
}
.head {
  display: flex;
  flex-direction: column;
  height: 3rem;
  background: url("../assets/images/timg.jpg");
  position: relative;
  margin-top: 1rem;
  justify-content: space-between;
  .top {
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 0.2rem;
    i {
      display: inline-block;
      width: 0.36rem;
     
      background: url("../assets/images/set.png");
      background-size: 25px 145px;
      margin-left: 0.2rem;
      &:nth-of-type(1) {
        background-position: 0 -14px;
         height: 0.32rem;
      }
      &:nth-of-type(2) {
        height: 0.25rem;
      }
    }
  }
  .middle {
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: absolute;
    top: 0.5rem;
    .photo {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      border: 1px solid transparent;

      img {
        width: 100%;
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin-left: 0.2rem;
      span {
        padding: 0.05rem 0;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;

    li {
      display: flex;
      flex-direction: column;
      .label {
        padding-bottom: 0.1rem;
      }
    }
  }
}

.list {
  .modle {
    //修改我的钱包头部图标
    &:nth-of-type(2) .title .left > i {
      background-position: -25px -19px;
    }
    //修改我的钱包下方组件图标
    &:nth-of-type(2) .icon li {
      strong {
        color: #da0000;
      }
      &:nth-of-type(1) i {
        background-position: -104px 0;
        width: 0.47rem;
          height: 0.34rem;
      }
      &:nth-of-type(2) i {
        background-position: -130px -73px;
        width: -4rem;
        height: 0.4rem;
      }
      &:nth-of-type(3) i {
        background-position: -103px -126px;
        width: 0.43rem;
        height: 0.48rem;
      }
      &:nth-of-type(4) i {
        background-position: -80px -127px;
        width: 0.42rem;
        height: 0.47rem;
      }
    }

    //修改客户服务头部图标
    &:nth-of-type(3) .title .left i {
      background-image: url("../assets/images/set.png");
      background-position: 0 -99px;
      background-size: 25px 145px;
    }

    //修改客户服务下方组件图标
    &:nth-of-type(3) .icon li {
      i {
        background-image: url("../assets/images/set.png");
        background-size: 25px 145px;
      }
      &:nth-of-type(1) i {
        background-position: 0 -79px;
        width: 0.42rem;
        height: 0.36rem;
      }
      &:nth-of-type(2) i {
        background-position: 0 -55px;
        width: 0.42rem;
        height: 0.43rem;
      }
      &:nth-of-type(3) i {
        background-position: 0 -32px;
        width: 0.46rem;
        height: 0.41rem;
      }
      &:nth-of-type(4) i {
        background-position: 0 -124px;
        width: 0.4rem;
        height: 0.4rem;
      }
    }

    background-color: #fff;
    margin: 0.2rem 0;
    .icon {
      display: flex;
      justify-content: space-around;
      height: 1rem;
      padding-bottom: 0.1rem;
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:nth-of-type(2) i {
          background-position: -129px -115px;
          height: 0.32rem;
        }
        &:nth-of-type(3) i {
          background-position: -127px -95px;
          height: 0.36rem;
        }
        &:nth-of-type(4) i {
          background-position: -81px 0;
          width: 0.37rem;
          height: 0.34rem;
        }
        &:nth-of-type(5) i {
          background-position: -62px -69px;
          height: 0.45rem;
          width: 0.45rem;
          margin: 0.06rem;
        }
      }
      i {
        display: inline-block;
        width: 0.46rem;
        height: 0.38rem;
        margin: 0.08rem 0;
        position: relative;
        background-position: -127px -133px;
        background-image: url("../assets/images/center.png");
        background-size: 150px 150px;
        background-repeat: no-repeat;
      }
    }
    .title {
      padding: 0.2rem;
      height: 0.9rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        display: inline-block;
        background-image: url("../assets/images/center.png");
        background-size: 150px 150px;
        background-repeat: no-repeat;
      }
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        i {
          width: 0.45rem;
          height: 0.45rem;
          background-position: 0 -19px;
          margin-right: 0.1rem;
        }
      }

      .right {
        display: flex;
        align-items: center;
        i {
          width: 0.17rem;
          height: 0.27rem;
          background-position: -142px -13px;
          margin-left: 0.1rem;
        }
      }
    }
  }
}
</style>