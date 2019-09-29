<template>
  <div class="register">
    <div class="header">
      <span class="back iconfont icon-2fanhui" @click="goBack"></span>
    </div>
    <div class="logo">
      <img src="https://img004.mll3321.com/images/user/mll_logo.png" alt />
    </div>

    <template>
      <cube-tab-bar v-model="selectedLabel" show-slider>
        <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index"></cube-tab>
      </cube-tab-bar>
      <cube-tab-panels v-model="selectedLabel">
        <cube-tab-panel label="用户登录">
          <ul class="userIpt">
            <!-- 用户名 -->
            <li>
              <div class="icon">
                <i class="iconfont icon-yonghuming"></i>
              </div>
              <div class="row">
                <input
                  class="ipt"
                  type="text"
                  id="username2"
                  v-model="username2"
                  placeholder="请输入用户名或手机"
                />
              </div>
            </li>
            <!-- 密码 -->
            <li>
              <div class="icon">
                <i class="iconfont icon-mima"></i>
              </div>

              <div class="row">
                <input
                  class="ipt"
                  type="password"
                  id="password2"
                  v-model="password2"
                  placeholder="请输入密码"
                />
              </div>
            </li>
          </ul>
          <!-- 用户名和密码 -->

          <!-- 底部操作按钮 -->
          <div class="btns">
            <mt-button
              :disabled="!(username2 && password2)"
              class="btn"
              type="primary"
              @click="onLogin"
            >登录</mt-button>
          </div>
        </cube-tab-panel>
        <cube-tab-panel label="账号注册">
          <ul class="userIpt">
            <!-- 用户名 -->
            <li>
              <div class="icon">
                <i class="iconfont icon-yonghuming"></i>
              </div>
              <div class="row">
                <input
                  class="ipt"
                  type="text"
                  id="username"
                  v-model="username"
                  placeholder="请输入用户名"
                />
              </div>
            </li>
            <!-- 密码 -->
            <li>
              <div class="icon">
                <i class="iconfont icon-mima"></i>
              </div>

              <div class="row">
                <input class="ipt" type="text" id="password" v-model="password" placeholder="请输入密码" />
              </div>
            </li>
            <!-- 手机号 -->
            <li>
              <div class="icon">
                <i class="iconfont icon-shouji"></i>
              </div>

              <div class="row">
                <input
                  class="ipt"
                  type="number"
                  id="tel"
                  maxlength="11"
                  v-model="tel"
                  placeholder="请输入手机号"
                />
              </div>
            </li>

            <li>
              <div class="icon">
                <i class="iconfont icon-ecurityCode"></i>
              </div>

              <div class="row">
                <input class="ipt" type="number" id="code" v-model="code" placeholder="请输入验证码" />
                <button
                  class="btn"
                  type="primary"
                  :disabled="btnText != '获取验证码'"
                  @click="getCode"
                >{{btnText}}</button>
              </div>
            </li>
          </ul>
          <!-- 用户名和密码 -->

          <!-- 底部操作按钮 -->
          <div class="btns">
            <mt-button
              :disabled="!(username && password && tel && code)"
              class="btn"
              type="primary"
              @click="onRegister"
            >注册账号</mt-button>
          </div>
        </cube-tab-panel>
      </cube-tab-panels>
    </template>
  </div>
</template>
      
      
     
    


  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      username: "",
      password: "",
      username2: "",
      password2: "",
      tel: "",
      code: "",
      btnText: "获取验证码",
      selectedLabel: "账号注册",
      tabs: [
        {
          label: "账号注册"
        },
        {
          label: "用户登录"
        }
      ]
    };
  },
  components: {},
  methods: {
    goBack() {
      this.$router.back();
    },
    // 获取手机验证码
    getCode() {
      const tel = this.tel;

      // 校验手机号
      if (
        !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
          tel
        )
      ) {
        Toast("请填写正确的手机号码");
        return false;
      }

      // 开始60秒倒计时
      let num = 60;
      let timer = setInterval(() => {
        num--;

        if (num != 0) {
          this.btnText = `重新获取(${num})`;
        } else {
          this.btnText = `获取验证码`;
          clearInterval(timer);
        }
      }, 1000);

      // 请求获取验证码
      this.$axios
        .post("/xiaohu/api/register/getCode", {
          tel
        })
        .then(res => {
          const { code, msg } = res;

          Toast(msg);
        });
    },
     showToastCallbak(msg) {
      const toast = this.$createToast({
        txt: msg,
        time: 800,
        onTimeout: () => {
          this.selectedLabel = "用户登录";
        }
      })
      toast.show()
    },
    // 点击提交
    onRegister() {
      // //获取当前组件中用户信息
      const { username, password, tel, code } = this;

      // 检验参数
      if (!(username && password && tel && code)) {
        Toast("请确保信息填写完整");
        return false;
      }

      // 发送请求
      this.$axios
        .post("/xiaohu/api/register/useCode", {
          username,
          password,
          tel,
          code
        })
        .then(res => {
          const { code, msg } = res;

          if (code == 1) {
             this.showToastCallbak('sss')
          } else {
            Toast(msg);
          }
        });
    },
    onLogin() {
      const { username2, password2 } = this;

      // 检验参数
      if (!(username2 && password2)) {
        Toast("请确保信息填写完整");
        return false;
      }

      // 发出请求
      this.$axios
        .post("/xiaohu/api/login/t", {
          username: username2,
          tel: username2,
          password: password2
        })
        .then(res => {
          const { code, msg, token } = res;

          if (code == 1) {
            Toast({
              message: msg,
              duration: 1000
            });

            // 将token存到localStorage
            localStorage.setItem("token", token);

            setTimeout(() => {
              this.$router.back();
            }, 1000);
          } else {
            Toast(msg);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  height: 100vh;
  background: #f5f5f5;
}
.header {
  display: flex;
  justify-content: flex-start;
  padding: 0.2rem;
}
.logo {
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 40%;
  }
}
.userNav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    padding-bottom: 0.15rem;
    font-size: 0.3rem;
    border: 2px solid transparent;
  }
  .active {
    border-bottom: 2px solid #da0000;
  }
}

.userIpt {
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  li {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 0.2rem;
    background-color: #fff;
    height: 1rem;

    .icon {
      width: 8%;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 0.4rem;
      }
    }
    .row {
      flex: 1;
      height: 100%;
      text-align: left;
      border-bottom: 1px solid #d8d8d8;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 0.1rem;
    }
    &:last-child .row {
      border: 0;
    }
    .ipt {
      width: 70%;
      outline: none;
      border: 0;
      height: 0.7rem;
    }
    .btn {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
      background-color: #fff;
      outline: none;
      border-left: 1px solid #d8d8d8;
    }
    .icon-ecurityCode {
      font-size: 0.34rem !important;
    }
  }
}
.btns {
  .btn {
    width: 90%;
    background: #da0000;
    margin-top: 0.2rem;
  }
}

/deep/.cube-tab-bar {
  justify-content: space-around;
}
/deep/.cube-tab {
  flex: 0.21;
  font-size: 0.3rem;
  margin-bottom: 0.1rem;
}
.cube-tab_active {
  color: #333;
}
/deep/.cube-tab-bar-slider {
  border: 0.02rem solid #da0000;
}
</style>