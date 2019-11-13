<template>
  <div class="modal" @touchmove.prevent @click.stop="close" :class="{ show: isshow }">
    <div class="modal-box">
      <div class="center"><div class="modal-box-img" :class="contentstyle.img ? 'modal-box-img1' : 'modal-box-img2'"></div></div>
      <div class="modal-box-text">
        <div>{{ contentstyle.text1 }}</div>
        <div>{{ contentstyle.text2 }}</div>
      </div>
      <div class="modal-box-button">
        <button @click.stop="close" v-show="contentstyle.isbutton">{{ contentstyle.button }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  data() {
    return {
      //模态框是否显示
      isshow: false,
      //提前存储的提示内容
      storagecont:[
        {img: true, text1: '您输入的验证码有误',text2: '请重新输入',isbutton:true,button:'重新输入'},
        {img: false, text1: '系统调试中,请稍后再试~',text2: '',isbutton:false,button:''},
        {img:true,text1:'验证码输入错误',text2:'亲爱的楼主, 您输入的验证码有误若产品为新开封, 请注意鉴别真伪',isbutton:true,button:'好的'},
        {img: false,text1:'您要的页面走丢了,',text2: '试试重新加载找回正确的页面吧！',isbutton:false,button:''},
        {img: true, text1: '此二维码查询有误',text2: '',isbutton:true,button:'重新扫码'}
      ],
      num:4,//显示第几条信息
      //以传过来的值确认现在的样式
      contentstyle: {
        img: true, //显示哪个图片
        text1: '您输入的验证码有误',
        text2: '请重新输入',
        isbutton:true,
        button:"重新输入"
      }
    };
  },
  mounted(){
    this.showcont(this.num);
  },
  methods: {
    //关闭modal
    close() {
      this.isshow = false;
    },
    //根据传过来的值显示第几条信息
    showcont(e){
      this.contentstyle=this.storagecont[e];
    }
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
        margin-bottom:10px;
      }
      div:last-of-type{
        padding:0 130px;
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
