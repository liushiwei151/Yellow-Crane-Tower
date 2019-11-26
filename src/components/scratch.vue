<template>
  <div>
    <div class="textBox">
      <transition name="slide" v-if="result == ''">
        <p class="text" :key="text.id">{{ text.val }}</p>
      </transition>
      <div v-show="result != ''">恭喜您获得福卡一份</div>
    </div>
    <div class="scratchBG">
      <vue-scratch-card
        :start-callback="startCallback"
        :clear-callback="clearCallback"
        element-id="scratchWrap"
        coverImg="/static/cover.png"
        :ratio="0.4"
        :move-radius="25"
        :resultText="resultText[0].prize"
      />
    </div>
    <div class="scratch-text">
      <p v-if="result == ''">
        涂抹刮奖区域,
        <br />
        超多奖品等您来拿！！！
      </p>
      <p v-if="result != ''">感谢您对诚信系统的支持,</p>
      <p v-if="result != ''">{{ result.prize }}, {{ result.address }}</p>
    </div>
    <div class="scratch-a" v-if="result"><a href="#">点击查看</a></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'scratch',
  data() {
    return {
      //轮播内容
      textArr: ['恭喜******获得马克杯一个', '恭喜******获得iphone11一部', '恭喜******获得别墅一栋', '恭喜******获得航母一艘', '恭喜******获得核弹一枚'],
      //轮播第几个
      number: 0,
      // 当前结果
      result: '',
      resultText: [{ prize: '恭喜您获得福卡一份', address: '赶紧去您的订单页面确认吧!' }]
    };
  },
  computed: {
    text() {
      return {
        id: this.number,
        val: this.textArr[this.number]
      };
    },
    ...mapState({
      isphone: 'isphone'
    })
  },
  mounted() {
    this.startMove();
    if (this.number === this.textArr.length - 1) {
      this.number = 0;
    } else {
      this.number += 1;
    }
  },
  methods: {
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
    //清除遮罩层后
    clearCallback() {
      this.result = this.resultText[0];
    },
    ...mapActions(['startCallback'])
    //点击遮罩层时判断
    // startCallback(){
    //   if(!this.isphone){

    //   }
    // }
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
//刮奖样式
.scratchBG {
  width: 520px;
  height: 320px;
  background: url(/static/gjbg.png) no-repeat;
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
    margin-bottom: 15px;
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
