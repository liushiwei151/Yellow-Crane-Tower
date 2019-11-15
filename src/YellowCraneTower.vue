<template>
  <div id="app" :class="ismodal.isuser ? 'pages-old' : 'pages-new'">
      <div class="card" ><router-view /></div>
    <div class="bottom-new" v-if="!ismodal.isuser"></div>
    <div class="bottom-old" v-if="ismodal.isuser">
      <ul class="bottom-old-a">
        <li v-for="(item, index) in website" :key="index"><a :href="item"></a></li>
      </ul>
    </div>
    <div class="bottom-d" :class="ismodal.isuser ? 'bottomImgold' : 'bottomImgnew'"></div>
    <!-- 弹出的提示model -->
    <modal></modal>
  </div>
</template>

<script>
import modal from '@/components/assembly/modal';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'YellowCraneTower',
  data() {
    return {
      //模拟传进来的值
      website: ['https://www.baidu.com', 'https://www.taobao.com', 'https://www.jd.com'], //老用户页面跳转的三个链接
    };
  },
  components:{
    modal
  },
  computed:{
    ...mapState({
      ismodal:'ismodal'
    })
  },
  mounted() {
    this.ismove = true;
  },
  methods: {}
};
</script>

<style lang="less">
@backgrounds: {
  background-position: 100% 100%;
  background-size: cover;
};
@pages: {
  z-index: 0;
  width: 100%;
  box-sizing: border-box;
  position: relative;
};
//*样式
body,ul,p {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.center {
  display: flex;
  justify-content: center;
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
  background: url(/static/smokegqzBG2.png) no-repeat;
  width: 700px;
  height: 744px;
  @backgrounds();
  position: absolute;
  left: 25px;
  // top:800px;
  top: 235px;
  z-index: 5;
}
// .move{
//   top:235px;
// }
// //卡片的开局动画
// .move-enter{
//   top:900px;
// }
// .move-enter-active,.move-leave-active{
//     transition: all 3s;
// }
// .move-leave{
//   top:235px;
// }
// 新用户样式
.pages-new {
  background: url(../static/page.png) no-repeat;
  @pages();
  background-position: 100% 100%;
  background-size: cover;
  height: 1933px;
  .bottom-new {
    position: absolute;
    bottom: 10px;
    left: 0;
    pointer-events: none;
    background: url(../static/bottom-new.png) no-repeat;
    @backgrounds();
    z-index: 100;
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
  height: 1593px;
  .bottomImgold {
    bottom: 205px;
  }
  .bottom-old {
    background: url(../static/bottom-old.png) no-repeat;
    @backgrounds();
    z-index: 10;
    width: 750px;
    height: 769px;
    position: absolute;
    bottom: 10px;
    left: 0;
    pointer-events: none;
    .bottom-old-a {
      padding: 245px 75px 0px;
      li {
        height: 139px;
        margin-bottom: 25px;
        a {
          border-radius: 100px;
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
// 包裹层
.bottom-d {
  background: url(../static/bottom-d.png) no-repeat;
  @backgrounds();
  position: absolute;
  width: 727px;
  height: 646px;
  left: 11.5px;
  z-index: 1;
}
</style>
