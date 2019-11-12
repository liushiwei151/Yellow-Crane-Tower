<template>
  <div id="app" :class="useinfo ? 'pages-old' : 'pages-new'">
    <div class="card"><router-view /></div>
    <div class="bottom-new" v-if="!useinfo"></div>
    <div class="bottom-old" v-if="useinfo"></div>
    <div class="bottom-d" :class="useinfo ? 'bottomImgold' : 'bottomImgnew'"></div>
  </div>
</template>

<script>
export default {
  name: 'YellowCraneTower',
  data() {
    return {
      useinfo: true //判断是新客户还是老客户
    };
  }
};
</script>

<style lang="less">
@backgrounds: {
  background-position: 100% 100%;
  background-size: cover;
};
@pages: {
  z-index: -100;
  position: relative;
  width: 100%;
  box-sizing: border-box;
};
//*样式
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
//香烟的卡片样式
.card {
  background: url(../static/smokeBG1.png) no-repeat;
  width: 700px;
  height: 744px;
  @backgrounds();
  position: absolute;
  left: 25px;
  top: 350px;
  z-index: -6;
}
// 新用户样式
.pages-new {
  background: url(../static/page.png) no-repeat;
  @pages();
  @backgrounds();
  height: 2061px;
  .bottom-new {
    position: absolute;
    bottom: 10px;
    left: 0;
    background: url(../static/bottom-new.png) no-repeat;
    @backgrounds();
    z-index: -5;
    width: 750px;
    height: 1171px;
  }
  .bottomImgnew {
    bottom: 555px;
  }
}
// 老用户样式
.pages-old {
  background: url(../static/pages-old.png) no-repeat;
  @pages();
  @backgrounds();
  height: 1720px;
  .bottomImgold {
    bottom: 0;
  }
  .bottom-old {
    background: url(../static/bottom-old.png) no-repeat;
    @backgrounds();
    z-index: -5;
    width: 750px;
    height: 769px;
    position: absolute;
    bottom: 10px;
    left: 0;
  }
}
// 包裹层
.bottom-d {
  background: url(../static/bottom-d.png) no-repeat;
  @backgrounds();
  position: absolute;
  width: 727px;
  height: 646px;
  left: 14px;
  z-index: -10;
}
</style>
