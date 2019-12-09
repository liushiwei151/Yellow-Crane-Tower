<template>
  <div>
    <div class="textBox" v-show="result == ''">
      <transition name="slide">
        <p class="text" :key="text.id">{{ text.val }}</p>
      </transition>
    </div>
    <div v-show="result != ''" class="textScratch"><p>感谢您的诚信消费！</p></div>
    <div class="scratchBG">
      <vue-scratch-card
        :start-callback="startCallback"
        :clear-callback="clearCallback"
        element-id="scratchWrap"
        coverImg="./static/cover.png"
        :ratio="0.4"
        :move-radius="25"
        :resultText="resultTexts[0].prize"
        :showup="isshowup"
      />
    </div>
    <scratch-text :result="QRcodetype" :isaddress="cusaddress"></scratch-text>
    <!-- <div class="scratch-text">
      <p v-if="result == ''">
        涂抹刮奖区域,
        <br />
        超多奖品等您来拿！！！
      </p>
      <p v-if="result != ''">感谢您对诚信系统的支持,</p>
      <p v-if="result != ''">{{ result.prize }}, {{ result.address }}</p>
    </div>
    <div class="scratch-a" v-if="result"><a href="#">点击查看</a></div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import scratchText from '@/components/assembly/scratchText';
import api from '@/api';
import axios from 'axios';
export default {
  name: 'scratch',
  data() {
    return {
      //轮播内容
      textArr: ['恭喜03****8获得18楼币', '恭喜00****9获得18楼币', '恭喜07****6获得10元话费', '恭喜02***1获得拼手气福卡', '恭喜01****1获得10元话费'],
      //轮播第几个
      number: 0,
      // 当前结果
      result: '',
      resultTexts: [{ prize: '正在抽取中~', address: '赶紧去您的订单页面确认吧!' }],
      //接口传来的值
      QRcode: '',
      //清除屏障后显示的值
      QRcodetype: 0,
      //客户地址
      cusaddress: [],
      //刮奖的图片是否显示
      isshowup:true
    };
  },
  components: {
    scratchText
  },
  computed: {
    ...mapState({
      isphone: 'isphone',
    }),
    text() {
      return {
        id: this.number,
        val: this.textArr[this.number]
      };
    }
  },
  created() {
    let self =this;
    let data = JSON.parse(localStorage.getItem('all'));
    axios.defaults.headers.common["Authorization"] = data.sessionId;
    api.getTop20Record().then(res => {
      self.textArr=res.data.data
    });
  },
  mounted() {
   if(JSON.parse(localStorage.getItem('QRcode'))){
     this.isshowup=false;
     console.log(this.isshowup)
     this.resultTexts[0].prize = JSON.parse(localStorage.getItem('QRcode')).tip;
     this.QRcodetype = JSON.parse(localStorage.getItem('QRcode')).type;
     this.result = this.resultTexts[0];
     let cusadd = JSON.parse(localStorage.getItem('cusaddress'));
     if (cusadd) {
       for (let i = 0; i < cusadd.length; i++) {
         if (cusadd[i].isDefault == '1') {
           this.cusaddress = cusadd[i];
         }
       }
     }
   }
    // this.resultTexts[0].prize=this.statusxx.tip;
    this.startMove();
    if (this.number === this.textArr.length - 1) {
      this.number = 0;
    } else {
      this.number += 1;
    }
  },
  methods: {
    ...mapActions(['Callback']),
    //调取奖品接口
    startupdate() {
      let QRc = JSON.parse(localStorage.getItem('QRcodeinfor'));
      let all = JSON.parse(localStorage.getItem('all'));
      let self = this;
      if (QRc.mobile != undefined && QRc.mobile.length == 11) {
        let draw = {
          scanId: all.scanId,
          latitude: 0,
          longitude: 0
        };
        axios.defaults.headers.common['Authorization'] = all.sessionId;
        api.doLuckyDraw(draw).then(res => {
          self.resultTexts[0].prize = res.data.data.tip;
          //假数据中了什么奖
          // res.data.data.type='2';
          self.QRcode = res.data.data;
          localStorage.setItem('QRcode', JSON.stringify(self.QRcode));
          if (self.QRcode.type == '3') {
            api.getAddress(self.QRcode.memberId).then(res => {
                localStorage.setItem('cusaddress', JSON.stringify(res.data.data));
                for (let i = 0; i < res.data.data.length; i++) {
                  if (res.data.data[i].isDefault == '1') {
                    self.cusaddress = res.data.data[i];
                  }
                }
                // localStorage.setItem('QRcode',JSON.stringify(self.cusaddress));
              })
              .catch(err => {
                console.log(err);
              });
          } else if (self.QRcode.type == '5') {
            self.cusaddress = JSON.parse(localStorage.getItem('QRcode'));
          }
        });
      } else {
        return;
      }
    },
    //获取地址
    getaddress() {},
    //文字轮播
    startMove() {
      let timer = setTimeout(() => {
        if (this.number === this.textArr.length - 1) {
          this.number = 0;
        } else {
          this.number += 1;
        }
        this.startMove();
      }, 3000);
    },
    //清除遮罩层后Callback
    clearCallback() {
      this.result = this.resultTexts[0];
      // let data =this.$store.state.statusxx;
      // this.resultTexts[0].prize=data.tip;
      this.QRcodetype = JSON.parse(localStorage.getItem('QRcode')).type;
      // this.QRcodetype='2';
    },
    //点击遮罩层时判断
     startCallback(){
       let cusphone =JSON.parse(localStorage.getItem('QRcodeinfor')).mobile
       if(cusphone&&cusphone.length==11){
         if (!JSON.parse(localStorage.getItem('QRcode'))) {
           this.startupdate();
         } else {
           this.resultTexts[0].prize = JSON.parse(localStorage.getItem('QRcode')).tip;
           this.QRcodetype = JSON.parse(localStorage.getItem('QRcode')).type;
           this.result = this.resultTexts[0];
           let cusadd = JSON.parse(localStorage.getItem('cusaddress'));
           if (cusadd) {
             for (let i = 0; i < cusadd.length; i++) {
               if (cusadd[i].isDefault == '1') {
                 this.cusaddress = cusadd[i];
               }
             }
           }
         }
       }else{
         this.Callback();
       }

     }
  }
};
</script>

<style scoped lang="less">
//轮播文字
.textBox {
  width: 100%;
  height: 100px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  text-align: center;
  .text {
    width: 100%;
    position: absolute;
    bottom: 0;
    margin-top: 10px;
    color: rgb(200, 130, 45);
    font-size: 30px;
  }
}
//刮奖头部结果
.textScratch {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin-top: 50px;
    color: rgb(200, 130, 45);
    font-size: 36px;
  }
}
//刮奖样式
.scratchBG {
  width: 520px;
  height: 320px;
  background: url(../../static/gjbg.png) no-repeat;
  background-size: 100% 100%;
  margin: 35px 89px 0;
  box-sizing: border-box;
  overflow: hidden;
}
// 奖品文本样式
.scratch-text {
  font-size: 28px;
  font-weight: 500;
  color: rgb(85, 34, 8);
  margin-top: 15px;
  p {
  }
  p:first-of-type {
    font-size: 32px;
  }
}
// 点击的样式
.scratch-a {
  a {
    color: rgb(210, 47, 47);
    font-size: 32px;
  }
}
//文字滚动效果
.slide-enter-active,
.slide-leave-active {
  transition: all 3s linear;
}
.slide-enter {
  transform: translateY(40px) scale(1);
  opacity: 0.5;
}
.slide-enter-to {
  opacity: 1;
}
.slide-leave-to {
  transform: translateY(-40px) scale(0.8);
  opacity: 0;
}
</style>
