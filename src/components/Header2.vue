<template>
  <div>
    <header>
      <i class="iconfont icon-2fanhui" @click="goBack"></i>
      <slot name="content">
        <span>确认订单</span>
      </slot>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    //返回上一页
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 9999;
  span {
    font-size: 0.32rem;
    align-self: flex-end;
    margin-bottom: 0.2rem;
  }
  .iconfont {
    font-size: 0.34rem !important;
    display: inline-block;
    margin-left: 0.1rem;
    position: absolute;
    left: 0.1rem;
  }
}
</style>