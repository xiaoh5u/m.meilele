<template>
  <div class="classify">
    <div class="header">
      <div class="search">
        <router-link to="/search">
          <div class="text">
            <i class="iconfont icon-guanbi"></i>
            <span>搜索商品</span>
          </div>
        </router-link>
      </div>
    </div>

    <div class="mian">
      <ul>
        <li>儿童房</li>
      </ul>
      <div class="right">
        <div class="top clear">
          <dl>
            <dt>热门专场</dt>
            <dd v-for="(item,index) in Special" :key="index" @click="toList(item.keyword)">
              <img :src="'https://image.meilele.com'+item.img" alt />
            </dd>
          </dl>
        </div>
        <div class="mid">
          <dl>
            <dt>热门搜索</dt>
            <dd v-for="(item,index) in hotList" :key="index" @click="toList(item.keyword)">
              <img :src="'https://image.meilele.com'+item.img" alt />
              <p>{{item.name}}</p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotList: [
        {
          img: "/images/upload/201806/e987495bac5b92e704b869bf0008005a.jpg",
          keyword: "ertongchuang",
          name: "儿童床"
        },
        {
          img: "/images/upload/201806/23c3b1c8059fd67ac68da80bffd3d17f.jpg",
          keyword: "ertongchuangdian",
          name: "儿童床垫"
        },
        {
          img: "/images/upload/201806/c4a83ae298a600fc70b63cf740d94f8f.jpg",
          keyword: "ertongchuangtougui",
          name: "儿童床头柜"
        },
        {
          img: "/images/upload/201806/b50ab12a715322f4d8a215131aaf8cdd.jpg",
          keyword: "ertongyigui",
          name: "儿童衣柜"
        },
        {
          img: "/images/upload/201806/95c91796a98e9910b9afba6697b9f7ec.jpg",
          keyword: "ertongshuzhuoertongdiannaotai",
          name: "儿童桌"
        },
        {
          img: "/images/upload/201806/cea35f3666ff51b3c6e407fb6dc14fcb.jpg",
          keyword: "ertongyi",
          name: "儿童椅"
        },
        {
          img: "/images/upload/201806/e0813a5dc7e47d16ab2e69ff5ff9f81a.jpg",
          keyword: "ertongfangtaozhuang",
          name: "儿童房套装"
        },
        {
          img: "/images/upload/201806/819932d346876406060c55e3868faaab.jpg",
          keyword: "ertonggui",
          name: "儿童柜类"
        }
      ],
      Special: [
        {
          img: "/images/upload/201806/57a11cffe7188961bdf768df1c734c4b.png",
          keyword: "ertongchuang",
          name: ""
        },
        {
          img: "/images/upload/201806/e94bd59b089c6cee04cf72b447596a21.png",
          keyword: "tianyuanertongchuang",
          name: ""
        },
        {
          img: "/images/upload/201806/3ee22740f2c5778edb9d924ccacc2b9c.png",
          keyword: "ertongchuangdian",
          name: ""
        }
      ]
    };
  },
  method: {
    goBack() {
      this.$router.back();
    }
  },
  methods: {
    // 跳转到列表页
    toList(type) {
      // console.log(type);
      this.$router.push("/goodslist/" + type);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  .search {
    width: 100vw;
    position: relative;
    height: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: inline-block;
      width: 90%;
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
    }
  }
}
.mian {
  overflow: hidden;
  height: calc(100vh - 1.8rem);
  display: flex;
  justify-content: space-between;
  color: #3a3a3a;
  border-top: 0.025rem solid #dfdfdf;
  border-bottom: 0.025rem solid #dfdfdf;
  ul {
    flex: 1;
    border-right: 0.025rem solid #dfdfdf;
    li {
      margin: 0.16rem 0;
      padding: 0.02rem;
      border-left: 2px solid #c81c28;
      color: #c81c28;
    }
  }
  .right {
    width: 6rem;
    padding: 0.3rem 0.2rem;

    .top {
      dl {
        dt {
          text-align: left;
          margin-bottom: 0.2rem;
        }
        dd {
          width: 30%;
          float: left;
          margin-left: 3%;
          &:nth-of-type(1) {
            margin-left: 0;
          }
          img {
            width: 100%;
          }
        }
      }
    }
    .mid {
      dl {
        dt {
          text-align: left;
          margin-bottom: 0.2rem;
        }
        dd {
          width: 33.3%;
          float: left;

          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>