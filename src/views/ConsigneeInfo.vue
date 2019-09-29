 <template>
  <div class="ConsigneeInfo">
    <Header2>
      <template v-slot:content>
        <span>收货人信息</span>
      </template>
    </Header2>

    <div class="main">
      <ul class="ipt">
        <li>
          <span>收货人姓名:</span>
          <input type="text" placeholder="请输入至少两个中文字符" v-model="name" />
        </li>
        <li>
          <span>收货人手机号:</span>
          <input type="number" placeholder="请输入11位手机号码" v-model="telephone" />
        </li>
        <li @click="showCascadePicker">
          <span>省、市、区:</span>
          <p>{{selectedText}}</p>
        </li>
        <li>
          <span>详细信息:</span>
          <input type="text" placeholder="请输入至少五个字符" v-model="address" />
        </li>
      </ul>
    </div>

    <div class="bottom" @click="submit">
      <cube-button class="button">保存</cube-button>
    </div>
  </div>
</template>
 
<script>
import Header2 from "@/components/Header2.vue";
import { addressList } from "@/assets/js/area.js";

export default {
  data() {
    return {
      selectedText: "",
      name: "",
      telephone: "",
      address: "",
      token: "",
      changeId: "",
      changeInfo: ""
    };
  },
  components: {
    Header2
  },
  mounted() {
    this.cascadePicker = this.$createCascadePicker({
      title: "Cascade Picker",
      data: addressList,
      selectedIndex: [0, 1, 0],
      onSelect: this.selectHandle,
      onCancel: this.cancelHandle
    });
    this.token = localStorage.getItem("token");
    this.changeId = localStorage.getItem("changeId");

    if (this.changeId) {
      this.reqChangeAddressInfo().then(res => {
        const { msg, list, code } = res;
        if (code == -2) {
          this.$router.push("/register");
        }
        if (code == 1) {
          this.changeInfo = list;
          const { address, name, telephone } = list[0];
          this.name = name;
          this.telephone = telephone;
          const city = address.split("&");
          this.address = city[1];
          this.selectedText = city[0];
        }
      });
    }
  },
  methods: {
    submit() {
      const { name, telephone, address, selectedText, token } = this;
      if (!(name && telephone && address && selectedText)) {
        this.$createToast({
          type: "warn",
          txt: "请填写完整的地址信息",
          time: 2000
        }).show();
        return;
      }

      if (!/[\u4e00-\u9fa5]{2,8}/gm.test(name)) {
        this.showAlert("姓名不符合规范");
        return;
      } else if (
        !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
          telephone
        )
      ) {
        this.showAlert("请输入正确的手机号");
        return;
      } else if (address.length < 5) {
        this.showAlert("地址信息不符合规范");
        return;
      }

      const addressInfo = selectedText + "&" + address;
      const { changeId } = this;
      if (changeId) {
        this.$axios
          .post("/xiaohu/api/address/t/update", {
            name,
            telephone,
            address: addressInfo,
            addressId: changeId,
            token
          })
          .then(res => {
            const { code, msg } = res;
            if (code == -2) {
              this.showToastCallbak("身份信息已过期");
            } else if (code == 1) {
              this.showAlert(msg);
              this.$router.back();
            } else {
              this.showAlert(msg);
            }
          });
      } else {
        this.$axios
          .post("/xiaohu/api/address/t/add", {
            name,
            telephone,
            address: addressInfo,
            token
          })
          .then(res => {
            const { code, msg } = res;
            if (code == -2) {
              this.showToastCallbak("身份信息已过期");
            } else if (code == 1) {
              this.showAlert(msg);
              this.$router.back();
            } else {
              this.showAlert(msg);
            }
          });
      }
    },

    //获取要修改的地址信息
    reqChangeAddressInfo() {
      const { changeId, token } = this;
      return this.$axios.post("/xiaohu/api/address/t/oneInfo", {
        token,
        addressId: changeId
      });
    },
    showCascadePicker() {
      this.cascadePicker.show();
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.selectedText = selectedVal.join(", ");

      this.$createDialog({
        type: "alert",
        content: `Address: <br>${selectedVal.join(", ")}`,
        icon: "cubeic-alert"
      }).show();
    },
    showAlert(msg) {
      this.$createDialog({
        type: "alert",
        title: "提示",
        content: msg,
        icon: "cubeic-alert"
      }).show();
    },
    showToastCallbak(msg) {
      const toast = this.$createToast({
        txt: msg,
        time: 1200,
        onTimeout: () => {
          this.$router.push("/register");
        }
      });
      toast.show();
    }
  }
};
</script>
 
 <style lang="scss" scoped>

.ConsigneeInfo {
  background: #f5f5f5;
  height: calc(100vh-1rem);
  width: 100vw;
}
.main {
  border-top: .2rem solid #f5f5f5;
  margin-top: 1.2rem;
  li {
    background-color: #fff;
    span {
      //   width:1.6rem;
      text-align: left;
      color: #333;
      padding: 0 0.2rem;
    }
    input {
      height: 0.7rem;
      padding-left: 0.1rem;
      flex: 1;
    }
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
.bottom {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.2rem;
  .button {
    background-color: #da0000;
    width: 90%;
    border-radius: 0.1rem;
    padding: 0.2rem 0;
  }
}
</style>