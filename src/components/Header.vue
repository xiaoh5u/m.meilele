<template>
  <div class="top">
    <span class="back iconfont icon-2fanhui" @click="goBack"></span>

    <slot />

    <div class="right">
      <slot name="icon"></slot>
      <i class="more iconfont icon-gengduomore10" @click="showMore"></i>
    </div>
    <transition name="fade">
      <div class="subMenu" v-show="isMenu">
       
        <ul>
          <li v-for="(item,index) in subList" :key="index">
            <router-link :to="item.to">
              <i :class="['iconfont',item.icon]"></i>
              <span>{{item.name}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
     <!-- <div class="arrow"></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      subList: [
        {
          name: "商城首页",
          icon: "icon-shouye",
          to: "/home"
        },
        {
          name: "分类搜索",
          icon: "icon-search",
          to: "/classify"
        },
        {
          name: "个人中心",
          icon: "icon-yonghuming",
          to: "/mine"
        },
        {
          name: "体验馆",
          icon: "icon-dianpu",
          to: "/home"
        },
        {
          name: "咨询客服",
          icon: "icon-buoumaotubiao10",
          to: "/home"
        }
      ],
      isMenu: false
    };
  },
  methods: {
    //返回上一页
    goBack() {
      this.$router.back();
    },
    showMore() {
      this.isMenu = !this.isMenu;
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  background-color: #fff;
  height: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 9999;
  width: 100vw;
  .iconfont {
    font-size: 0.34rem !important;
  }

  .subMenu {
    position: absolute;
    right: 0;
    top: 1rem;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 0.1rem 0;
    z-index: 999999999;
    overflow: auto;
    a {
      display: block;
      padding: 0.18rem 0.23rem;
      display: flex;
      justify-content: flex-start;
      i {
        display: inline-block;

        color: #fff !important;
      }

      span {
        color: white;
        margin-left: 0.1rem;
        font-size: 0.3rem;
      }
    }
    
  }
}
.arrow {
      position: absolute;
      top: -0.4rem;
      right: 0.1rem;
      border: 0.2rem solid transparent;
      border-bottom-color: rgba(0, 0, 0, 0.8);
    }
/**
    * 定义进入动画和退出动画的过程
    * 代表关注的是height的变化，动画的时间是5
    */
.fade-enter-active,
.fade-leave-active {
  transition: height 0.3s;
}

/* 定义进入动画的初始状态*/
.fade-enter {
  height: 0;
}

/* 定义进入动画的结束状态*/
.fade-enter-to {
  height: 3.56rem;
}

/* 定义离开动画的初始状态*/
.fade-leave {
  height: 3.56rem;
}

// /* 定义离开动画的结束状态*/
.fade-leave-to {
  height: 0;
}
</style>