<template>
 <div class="modal" :class="{ show: iserr }">
   <div class="modal-box">
     <div class="center"><div class="modal-box-img modal-box-img2" ></div></div>
     <div class="modal-box-text">
       <div>您要的页面走丢啦,</div>
       <div>试试重新加载找回正确页面吧！</div>
     </div>
     <div class="modal-box-button">
       <button @click="goerr(false)">取消</button>
     </div>
   </div>
 </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'err',
  data(){
    return{
    }
  },
  computed:{
    ...mapState({iserr:'iserr'})
  },
  methods: {
    ...mapActions(['goerr'])
  }
};
</script>

<style scoped lang="less">
  @modal: {
    color: #fff;
    width: 700px;
    height: 744px;
    background: url(https://pic.cwyyt.cn//upload/img/20191203/1732133213_popp.png) no-repeat;
    background-size: 100% 100%;
  };
.modal {
  z-index: -100;
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
  .modal-box {
    @modal();
    .modal-box-img {
      width: 269px;
      height: 269px;
      margin-top: 96px;
    }
    .modal-box-img1 {
      background: url(../../../static/img1.png) no-repeat;
      background-size: 100% 100%;
    }
    .modal-box-img2 {
      background: url(../../../static/img2.png) no-repeat;
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
    background: url(https://pic.cwyyt.cn/upload/img/20191203/1736453645_button2.png) no-repeat;
    background-size: 100% 100%;
    outline: none;
    border: none;
    color: #fff;
    width: 313px;
    height: 79px;
    font-size: 36px;
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
  z-index: 100;
}
</style>
