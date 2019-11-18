<template>
  <div class="modal" @touchmove.prevent :class="{ show: isshow }">
    <!-- 老用户跳转 -->
    <div class="modal-box" v-if="ismodal.isuser && ismodal.isaddress === 'isuser'">
      <div class="center"><div class="modal-box-img" :class="contentstyle.img ? 'modal-box-img1' : 'modal-box-img2'"></div></div>
      <div class="modal-box-text">
        <div>{{ contentstyle.text1 }}</div>
        <div>{{ contentstyle.text2 }}</div>
      </div>
      <div class="modal-box-button">
        <button @click="close" v-show="contentstyle.isbutton">{{ contentstyle.button }}</button>
      </div>
    </div>
    <!-- 新用户跳转 -->
    <div v-if="!ismodal.isuser && ismodal.isaddress === 'isuser'" class="modal-new">
      <div class="modal-new-code"></div>
      <div class="modal-new-clause">
        <p>
          关注前请仔细阅读
          <a href="#">沙龙服务条款</a>
        </p>
        <p>一经关注则视为同意</p>
      </div>
      <div class="modal-new-sup">
        <p>本平台含有烟草内容18岁以下谢绝关注</p>
        <p>服务支持: 武汉黄鹤楼漫天游文化传播有限公司</p>
      </div>
    </div>
    <!-- 客户留电话跳转 -->
    <div v-if="ismodal.isaddress === 'isphone'" class="modal-phone">
      <div class="modal-phone-title">请输入手机号</div>
      <div class="modal-phone-tel">
        <label for="subtel"></label>
        <input id="subtel" type="tel" maxlength="11" placeholder="请输入手机号" />
      </div>
      <div class="modal-phone-QR">
        <label for="subQR"></label>
        <input id="subQR" type="text" maxlength="5" placeholder="请输入验证码" />
        <div>获取验证码</div>
      </div>
      <div class="modal-box-button"><button @click.stop="close" >确定</button></div>
      <div class="modal-phone-text">手机活动仅限本次活动领奖使用, 将严格保密, 请安心填写。</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'modal',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      //模态框是否显示
      isshow: 'isshow',
      //显示第几条信息
      num: 'modalnum',
      // 现在的样式内容
      contentstyle: 'contentstyle',
      //显示什么样的modal
      ismodal: 'ismodal'
    })
  },
  methods: {
    //关闭modal
    ...mapActions(['close']),
    bcphone() {

    }
  }
};
</script>

<style scoped lang="less">
@modal: {
  color: #fff;
  width: 700px;
  height: 744px;
  background: url(/static/popp.png) no-repeat;
  background-size: 100% 100%;
};
@label:{
  width: 100px;
  height: 100%;
  border-right: solid 1px rgb(211, 176, 34);
  background-position: 50% 50%;
  display: block;
}
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  outline: 0;
  text-align: center;
  -ms-transform: scale(1.185);
  -webkit-transform: scale(1.185);
  transform: scale(1.185);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1096px;
  perspective: 1096px;
  background: rgba(0, 0, 0, 0.6);
  -webkit-transition: all 0.3s ease-in-out 0s;
  -o-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
  pointer-events: none;
  box-sizing: border-box;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-new {
    width: 703px;
    height: 874px;
    background: url(/static/modal02.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .modal-new-code {
      width: 290px;
      height: 290px;
      background: url(/static/QRcode.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 373px;
    }
    .modal-new-clause {
      color: rgb(85, 34, 8);
      font-size: 24px;
      font-weight: bold;
      a {
        color: rgb(212, 62, 62);
        text-decoration: none;
      }
    }
    .modal-new-sup {
      color: rgb(250, 152, 77);
      font-size: 18px;
      margin-bottom: 36px;
    }
  }
  // 留取资料样式
  .modal-phone {
    @modal();
    display: flex;
    align-items: center;
    flex-direction: column;
    .modal-phone-title {
      font-size: 36px;
      margin: 85px 0 61px;
      color: rgb(85, 34, 8);
      font-weight: bold;
    }
    .modal-phone-text {
      font-size: 20px;
      color: rgb(205, 154, 74);
      margin-top:10px;
    }
    .modal-phone-tel {
      background-color: #fff;
      width: 635px;
      border-radius: 20px;
      border: none;
      border: solid 1px rgb(211, 176, 34);
      box-shadow: 0 0 2px rgba(250, 0, 0, 0.5);
      height: 108px;
      display: flex;
      margin-bottom: 37px;
      box-sizing: border-box;
      label {
        background: url(/static/phone.png) no-repeat;
        background-size: 30px 43px;
           @label();
      }
      input {
        height: 100%;
        box-sizing: border-box;
        border: none;
        font-size: 28px;
        text-indent: 15px;
        width: 500px;
        outline: none;
      }
    }
    .modal-phone-QR {
      box-sizing: border-box;
      background-color: #fff;
      width: 635px;
      border-radius: 20px;
      border: none;
      border: solid 1px rgb(211, 176, 34);
      box-shadow: 0 0 2px rgba(250, 0, 0, 0.5);
      height: 108px;
      display: flex;
      margin-bottom: 145px;
      position: relative;
      label {
        background: url(/static/clock.png) no-repeat;
        background-size: 28px 37px;
          @label();
      }
      input {
        border: none;
        text-indent: 15px;
        outline: none;
        font-size: 28px;
        width: 340px;
      }
      div {
        color: rgb(217, 48, 53);
        font-size: 31px;
        width: 191px;
        font-weight: bold;
        border-left: solid 1px rgb(211, 176, 34);
        position: absolute;
        top:0;
        right:0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  // 问题模态框样式
  .modal-box {
    @modal();
    .modal-box-img {
      width: 269px;
      height: 269px;
      margin-top: 96px;
    }
    .modal-box-img1 {
      background: url(/static/img1.png) no-repeat;
      background-size: 100% 100%;
    }
    .modal-box-img2 {
      background: url(/static/img2.png) no-repeat;
      background-size: 100% 100%;
    }
    .modal-box-text {
      font-size: 30px;
      color: #955409;
      height: 100px;
      margin: 60px 0 65px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      div:first-of-type {
        margin-bottom: 10px;
      }
      div:last-of-type {
        padding: 0 130px;
      }
    }
  }
}
.modal-box-button {
  button {
    background: url(/static/button2.png) no-repeat;
    background-size: 100% 100%;
    outline: none;
    border: none;
    color: #fff;
    width: 313px;
    height: 79px;
    font-size: 36px;
  }
  .bcphone {
    letter-spacing: 30px;
    text-indent: 30px;
  }
}
.show {
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -ms-transform: scale(1);
  -webkit-transform: scale(1);
  transform: scale(1);
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: auto;
  opacity: 1;
}
</style>
