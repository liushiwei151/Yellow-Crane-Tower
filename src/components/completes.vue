<template>
  <div class="completes">
    <div class="completes-box">
      <p>您已确认完成</p>
      <p>请您留意1916沙龙消息</p>
      <p>
        更多福利
        <span class="text">{{ threetime }}s</span>
        后为您呈现！
      </p>
      <button>直接前往</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'completes',
  data() {
    return {
      threetime: 3
    };
  },
  mounted() {
    this.times();
  },
  methods: {
    times() {
      let self = this;
      setTimeout(() => {
        self.threetime--;
        if (self.threetime <= 0) {
          this.goout()
          return;
        } else {
          this.times();
        }
      }, 1000);
    },
    goout(){
      // this.$router.push('')
      localStorage.clear('QRcode');
    }
  }
};
</script>

<style scoped lang="less">
.completes {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .completes-box {
    height: 282px;
    p {
      font-size: 30px;
      font-weight: 600;
      margin-top: 10px;
      color: #552208;
    }
    span {
      font-size: 36px;
      color: #f83d41;
    }
    button {
      background: url(/static/button2.png) no-repeat;
      background-size: 100% 100%;
      outline: none;
      border: none;
      cursor: pointer;
      color: #fff;
      height: 79px;
      font-size: 36px;
      width: 315px;
      border-radius: 50px;
      letter-spacing: 5px;
      text-indent: 5px;
      margin-top: 74px;
    }
  }
}
</style>
