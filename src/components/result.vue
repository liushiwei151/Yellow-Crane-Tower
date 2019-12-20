<template>
  <div class="result">
    <div class="result-title">
      <span>首次扫码时间: {{ QRcodeinfor.firsttime }}</span>
      <span>扫码次数: {{ QRcodeinfor.num }}</span>
    </div>
    <div class="result-content">
      <div class="result-content-img" :style="{ backgroundImage: 'url(' + QRcodeinfor.smoke.img+ ')' }"></div>
      <div class="result-content-text">
        <div class="result-content-text1">
          <div v-if="QRcodeinfor.num != 1">
            <span>此二维码已被扫描{{ QRcodeinfor.num }}次</span>
            <span>若商品为新开封, 请鉴别真伪</span>
          </div>
          <div class="result-really" v-if="QRcodeinfor.num === 1">
            验证结果:
            <span>真品</span>
          </div>
        </div>
        <p>{{ QRcodeinfor.name }}</p>
        <p>
          焦油量:
          <span class="result-value">{{ QRcodeinfor.smoke.tar }}</span>
        </p>
        <p>
          烟气一氧化碳量:
          <span class="result-value">{{ QRcodeinfor.smoke.monoxide }}</span>
        </p>
        <p>
          烟气烟碱量:
          <span class="result-value">{{ QRcodeinfor.smoke.alkali }}</span>
        </p>
      </div>
    </div>
    <div class="result-rating" v-if="QRcodeinfor.status">
      产品鉴赏:
      <div class="result-rstar"><div v-for="(item, index) in star" :key="index" :class="item ? 'result-choose' : ''" @click="score(index)"></div></div>
    </div>
    <!-- 刮奖按钮 -->
    <div class="result-scratch" v-if="QRcodeinfor.status" @click="goscratch"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import api from '@/api'
export default {
  name: 'result',
  data() {
    return {
      star: [false, false, false, false, false]
    };
  },
  computed: {
    ...mapState({
      QRcodeinfor: 'QRcodeinfor',
      smokeimg: 'smokeimg',
      all:'all',
    })
  },
  created(){
    this.onresult();
  },
  mounted() {
    window.scrollTo(0,0);
    let hasjp =setInterval((res)=>{
      if(localStorage.getItem('QRcodeinfor')){
        if(JSON.parse(localStorage.getItem('QRcodeinfor')).isPopup&&!localStorage.getItem('hasjp')){
          localStorage.setItem('hasjp',1);
          this.gofudai(true);
        }else{
          return
        }
        clearInterval(hasjp);
      }else{
        console.log('继续')
      }
    },500)
  },
  methods: {
    ...mapActions(['onresult','goerr','changetub','gofudai']),
    //打分
    score(e) {
      let stars = [false, false, false, false, false];
      for (let i = 0; i <= e; i++) {
        stars[i] = true;
      }
      this.star = stars;
    },
    //跳转入刮卡页面
    goscratch() {
      let self =this
      let scores =0;
      for(let i =0;i<=self.star.length;i++){
        if(this.star[i]){
          scores++
        }
      }
      if(scores==0){
        scores=5
      }
      let data={
        scanId:self.all.scanId,
        score:scores
      }
      api.saveScore(data).then((res)=>{
        if(res.data.code=='200'){
           this.$router.push('scratch')
        }else{
          self.goerr(true);
        }
      }).catch((err)=>{
        self.goerr(true);
      })
      // this.$router.push('scratch');
    }
  }
};
</script>

<style scoped lang="less">
.result {
  .result-title {
    font-size: 21px;
    color: rgb(165, 133, 78);
    display: flex;
    justify-content: space-between;
    margin: 28px 31px 0 31px;
  }
  .result-content {
    display: flex;
    // justify-content: space-between;
    margin: 48px 40px 0 126px;
    .result-content-img {
      width: 190px;
      height: 343px;
      background: url(../../static/smoke/xgqz.png) no-repeat;
      background-size: 100% 100%;
    }
    .result-content-text {
      font-size: 21px;
      width: 280px;
      margin-left: 62px;
      .result-content-text1 {
        height: 90px;
        text-align: left;
        span {
          color: rgb(206, 15, 15);
          font-size: 22px;
          font-weight: 500;
        }
      }
      p {
        margin-bottom: 20px;
        text-align: left;
        font-weight: 600;
      }
      .result-value {
        color: rgb(195, 161, 120);
        font-weight: 500;
      }
      .result-really {
        font-size: 30px;
        span {
          font-size: 45px;
          color: rgb(206, 15, 15);
        }
      }
    }
  }
  .result-rating {
    font-size: 31.2px;
    color: black;
    font-weight: bold;
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    .result-rstar {
      display: flex;
      div {
        margin-left: 10px;
        width: 42px;
        height: 39px;
        background: url(../../static/star2.png) no-repeat;
        background-size: 100% 100%;
      }
      .result-choose {
        background: url(../../static/star.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .result-scratch {
    background: url(../../static/button3.png) no-repeat;
    background-size: 100% 100%;
    width: 314px;
    height: 96px;
    margin: 0 auto;
  }
}
</style>
