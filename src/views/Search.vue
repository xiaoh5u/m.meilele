<template>
  <div class="search">
    <div class="header">
      <div class="input">
        <input type="search" v-model="txt" @input="onInput(txt)" />
        <button class="iconfont icon-search"  @click="keySearch(txt)"></button>
      </div>
      <span @click="back">取消</span>
    </div>

    <!-- 输入联想列表 -->
    <ul class="lxList" v-show="isIpt">

      <li  v-for="(item) in catogyList" :key="item.name" @click="flSearch(item.name)">
        在
        <strong>{{item.name}}</strong> 分类中搜索
      </li>

      <li v-for="(item,index) in keywordList" :key="index" @click="keySearch(item.name)" >{{item.name}}</li>
    </ul>

    <!--热搜关键字 -->
    <div class="hotKey">
      <div class="title">正在热搜中</div>
      <div class="keyWord">
        <span
          v-for="(item,index) in hotKeyList"
          :key="index"
          @click="toGoodsList(item.name)"
        >{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotKeyList: [],
      txt: "",
      catogyList: [],
      keywordList: [],
      keyword: "",
      isIpt: false
    };
  },
  methods: {
    reqHotKey() {
      this.$axios.get("sale/api/solr_api/hotSearchWord/").then(res => {
        this.hotKeyList = res.hotSearchWordList;
      });
    },
    back() {
      this.$router.back();
    },
    toGoodsList(keyWord) {
      // console.log(keyWord)
      this.$router.push("/goodslist/" + keyWord);
    },
    onInput(txt) {
      if (txt != "") {
        this.$axios.get(`sale/api/suggestion/?q=${txt}`).then(res => {
          this.catogyList = res.catogyList;
          this.keywordList = res.keywordList;
          this.isIpt = true;
        });
      } else {
        this.isIpt = false;
      }
    },
    flSearch(key) {
      if (key.includes(">")) {
        this.keyword = key.split(">")[1];
      } else {
        this.keyword = key;
      }
      this.$router.push("/goodslist/" + this.keyword);
    },
    keySearch(key){
         this.$router.push("/goodslist/" + key);
    }
  },
  mounted() {
    this.reqHotKey();
  }
};
</script>

<style lang="scss" scoped>
.search {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.2rem;
    width: 100vw;
    padding: 0 0.3rem;
    .input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 85%;
      height: 0.7rem;
      border: 1px solid #c7c7c7;
      border-radius: 0.16rem;
      overflow: hidden;
      input {
        border: 0;
        height: 0.5rem;
        outline: 0;
        width: 85%;
        padding-left: 0.1rem;
      }
      button {
        flex: 1;
        height: 100%;
        border: 0;
        outline: 0;
        font-size: 0.38rem;
        background-color: #f5f5f5;
        color: gray !important;
      }
    }
    span {
      flex: 1;
      font-size: 0.34rem;
    }
  }

  .hotKey {
    .title {
      height: 0.7rem;
      line-height: 0.7rem;
      padding: 0 0.3rem;
      background-color: #ebebeb;
      text-align: left;
      font-size: 0.3rem;
      color: #999;
    }
    .keyWord {
      padding: 0.3rem;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      span {
        color: #333;
        padding: 0.1rem 0.3rem;
        border-radius: 0.1rem;
        border: 1px solid #ccc;
        margin-bottom: 0.2rem;
        margin-left: 0.1rem;
      }
    }
  }
  .lxList {
    position: fixed;
    top: 1rem;
    width: 100vw;
    background-color: #fff;
    li {
      height: 1rem;
      line-height: 1rem;
      text-align: left;
      margin: 0 0.3rem;
      border-bottom: 1px solid #aaa;
      font-size: 0.32rem;
    }
  }
}
</style>