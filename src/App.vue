<template>
  <div id="app">
    <keep-alive include="home">
      <router-view />
    </keep-alive>

    <div id="nav" v-show="isNav">
      <ul>
        <li @click="activeA" :class="{active:index==1}">
          <router-link to="/home">
            <img
              :src="index==1?require('@/assets/images/OnHome.png'):require('@/assets/images/Home.png')"
              alt
            />
            <p>首页</p>
          </router-link>
        </li>
        <li @click="activeB" :class="{active:index==2}">
          <router-link to="/classify">
            <img
              :src="index==2?require('@/assets/images/OnClassify.png'):require('@/assets/images/Classify.png')"
              alt
            />
            <p>分类</p>
          </router-link>
        </li>
        <li @click="activeC" :class="{active:index==3}">
          <router-link to="/cart">
            <img
              :src="index==3?require('@/assets/images/OnCart.png'):require('@/assets/images/Cart.png')"
              alt
            />
            <p>购物车</p>
          </router-link>
        </li>
        <li @click="activeD" :class="{active:index==4}">
          <router-link to="/mine">
            <img
              :src="index==4?require('@/assets/images/OnMine.png'):require('@/assets/images/Mine.png')"
              alt
            />
            <p>我的</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNav: false,
      index: 1
    };
  },
  methods: {
    activeA() {
      this.index = 1;
    },
    activeB() {
      this.index = 2;
    },
    activeC() {
      this.index = 3;
    },
    activeD() {
      this.index = 4;
    }
  },
  mounted() {
    const name = this.$route.name;
    this.isNav = /home|classify|cart|mine/.test(name);
  },
  watch: {
    $route(to, from) {
      // 跳转路由的时候，只在首页、商品和关于这几个路由中显示底部的导航
      this.isNav = /home|classify|cart|mine/.test(to.name);
    }
  }
};
</script>

<style lang="scss">
@charset "UTF-8";
* {
  /*页面点击链接时会出现高亮框，此代码用来解决*/
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  /*禁用手机浏览器的用户选择文本(复制)功能 */
  /*-webkit-user-select: none;*/
  /*设置怪异盒子*/
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /*解决IOS上面的按钮显示问题*/
  -webkit-appearance: none;
}
body,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
dl,
dd,
p {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #666;
}
input:focus {
  outline: none;
}
ul,
ol {
  list-style: none;
}
img {
  vertical-align: top;
  border: 0;
}
input,
select,
textarea {
  color: inherit;
  font-size: inherit;
  font-family: "";
}
.clear:after {
  content: ".";
  clear: both;
  display: block;
}
html {
  /*7.5为设计稿的宽度*/
  font-size: -webkit-calc(100vw/7.5);
  font-size: calc(100vw / 7.5);
  /*此时定义了在750的设计稿下  1rem=100px*/
}
body {
  font-size: 0.24rem;
}
.sl {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.sl2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  position: fixed;
    bottom: 0;
  ul {
    height: 1rem;
    width: 100vw;
    padding: 0 0.2rem;
    
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    li {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 0.45rem;
        height: 0.45rem;
      }
      p {
        padding-bottom: 0.07rem;
        padding-top: 0.05rem;
      }
    }
  }
  .active {
    a {
      color: #c81c28 !important;
    }
  }

  a {
    width: 100%;
    display: inline-block;
    font-weight: bold;
    color: #2c3e50;
    font-weight: 100;
  }
}
</style>
