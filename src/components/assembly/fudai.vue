<template>
  <div class="modal" :class="{show:isfudai}">
    <div class="fudai">
      <div>恭喜您获得财神签</div>
      <div>
        签号：
        <span>{{ QRcodeinfor.statusxx }}</span>
        财运积分：
        <span>+{{ QRcodeinfor.istest }}</span>
      </div>
      <div class="caigod"></div>
      <div class="godbutton">
        <button @click="goout()"></button>
        <button @click="gofudai(false)"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'fudai',
  data() {
    return {};
  },
  mounted() {
    console.log(this.QRcodeinfor);
  },
  computed: {
    ...mapState({
      QRcodeinfor: 'QRcodeinfor',
      isfudai:'isfudai'
    })
  },
  methods: {
    ...mapActions(['gofudai']),
    goout(){
      window.location.href='http://qrhhl.yunyutian.cn/huanghelou1916-center/wx/gCode?name=toYq'
    }
  }
};
</script>

<style scoped lang="less">
.modal {
  z-index: -100;
  position: fixed;
  color: #fff;
  font-size: 38px;
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
.godbutton{
  button{
    width: 301px;
    height: 93px;
    border:none;
  }
  button:first-of-type{
    background: url(../../../static/godbutton1.png) no-repeat;
    background-size:100% 100%;
  }
  button:last-of-type{
    background: url(../../../static/godbutton2.png) no-repeat;
    background-size:100% 100%;
  }
}
.fudai{
  div{
    margin-bottom: 20px;
  }
  .caigod {
    background: url(../../../static/caigod.png) no-repeat;
    background-size: 100% 100%;
    width: 546px;
    height: 551px;
    margin-right: 70px;
    margin-bottom:50px ;
  }
}


span {
  color: rgb(220, 68, 60);
}
</style>
