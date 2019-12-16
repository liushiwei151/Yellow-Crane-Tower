<template>
  <div>
    <div class="verification-img"></div>
    <div class="verification-input">
      <input @blur="onblur"  type="tel" maxlength="4" placeholder="请输入验证码" v-model="verificationCode" />
      <button @click.stop="subcode(verificationCode);empty();">
        提交
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'verification',
  data() {
    return {
      //输入的验证码
      verificationCode: '',
      startheight:'',
    };
  },
  mounted() {
    this.changetub(false);
     localStorage.clear('QRcode');
     //判断是否通过二维码扫描进入此页面，是直接把传来的值存储，不是就读取在local中是否存在之前存的数据
     if(this.$route.query.errorCode){
       this.isNewUser(this.$route.query);
     }else{
        this.isNewUser(JSON.parse(localStorage.getItem('all')))
     }
      // this.$router.go(0);
    // console.log(this.$ajaks.yyys)
  },
  methods: {
    ...mapActions(['subcode','isNewUser','changetub']),
    onblur(){
      window.scrollTo(0,0);
    },
    // 清空输入框
    empty() {
      this.verificationCode = '';
    },
    scrollToTop() {
    　　var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    }
  }
};
</script>

<style scoped lang="less">
@verification: {
  outline: none;
  height: 90px;
  border-radius: 50px;
  border: none;
  box-sizing: border-box;
};
.verification-input {
  position: relative;
  padding: 0 60px;
  input {
    width: 584px;
    padding: 27px 0 27px 35px;
    border: solid 3px #f1d2ad;
    color: #a6a6a6;
    @verification();
    font-size: 32px;
  }
  input::-webkit-input-placeholder {
    color: #a6a6a6;
  }
  input::-moz-input-placeholder {
    color: #a6a6a6;
  }
  input::-ms-input-placeholder {
    color: #a6a6a6;
  }
  button {
    @verification();
    border: solid 3px #fff;
    color: #fff;
    font-size: 30px;
    letter-spacing: 7px;
    text-indent: 7px;
    background: url(../../static/button.png) no-repeat;
    background-size: 100% 100%;
    width: 150px;
    position: absolute;
    right: 59px;
    top: 0;
  }
}
.verification-img {
  background: url(../../static/hint.png) no-repeat;
  background-size: 100% 100%;
  width: 306px;
  height: 306px;
  margin: 75px auto 80px;
}
</style>
