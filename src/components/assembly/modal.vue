<template>
  <div class="modal" @touchmove.prevent :class="{ show: isshow }">
    <!-- 老用户跳转 -->
    <div class="modal-box" v-if="isuser">
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
    <div v-if="!isuser" class="modal-new">
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
      //新老用户
      isuser: 'isuser'
    })
  },
  mounted() {},
  methods: {
    //关闭modal
    ...mapActions(['close'])
  }
};
</script>

<style scoped lang="less">
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
      margin-top:373px;
    }
    .modal-new-clause {
      color: rgb(85, 34, 8);
      font-size: 24px;
      font-weight: bold;
      a{
        color:rgb(212,62,62);
        text-decoration: none;
      }
    }
    .modal-new-sup {
      color: rgb(250, 152, 77);
      font-size: 18px;
      margin-bottom: 36px;
    }
  }
  .modal-box {
    color: #fff;
    width: 700px;
    height: 744px;
    background: url(/static/popp.png) no-repeat;
    background-size: 100% 100%;
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
    }
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
