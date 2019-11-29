<template>
  <div id="app" :class="ismodal.isuser==='0' ? 'pages-old' : 'pages-new'">
    <div class="cards" :class="card ? 'card1' : 'card2'" :style="{backgroundImage:'url('+smokeimg+')'}" key="0">
     <router-view />
    </div>
    <div class="bottom-new" v-if="ismodal.isuser==='1'"></div>
    <div class="bottom-old" v-if="ismodal.isuser==='0'">
      <ul class="bottom-old-a">
        <li v-for="(item, index) in advertisement" :key="index"><a :href="item.web" class="webadv" :style="{backgroundImage:'url('+item.adv+')'}"></a></li>
      </ul>
    </div>
    <div class="bottom-d" :class="ismodal.isuser==='0' ? 'bottomImgold' : 'bottomImgnew'"></div>
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
      // website: advertisement, //老用户页面跳转的三个链接
      card: true,
      transitionName: '',
    };
  },
  components: {
    modal
  },
  computed: {
    ...mapState({
      ismodal: 'ismodal',
      smokeimg:'smokeimg',
      all:'all',
      advertisement:'advertisement'
    })
  },
  mounted() {
    //判断是否通过二维码扫描进入此页面，是直接把传来的值存储，不是就读取在local中是否存在之前存的数据
    if(this.$route.query.errorCode){
      this.isNewUser(this.$route.query);
    }else{
       this.isNewUser(JSON.parse(localStorage.getItem('all')))
    }
    // this.$router.push('/');
    this.move();
  },
  methods: {
     ...mapActions(['isNewUser']),
    //移动动画切换
    move() {
      setTimeout(() => {
        this.card = false;
      }, 0);
    }
  },
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
body,
ul,
p {
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
.cards{
   // background: url(/static/smoke/xgqzBG.png) no-repeat;
   width: 700px;
   height: 744px;
   @backgrounds();
   overflow: hidden;
   position: absolute;
   left: 25px;
   z-index: 5;
}
.card1 {
  transform: translate(0, 565px);

}
.card2 {
  transition: transform 2s ease-out;
  top: 235px;
}
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
      padding: 160px 75px 0px;
      .webadv{
        background-size:100% 100% ;
      }
      li {
        height: 139px;
        margin-bottom: 25px;
        pointer-events: auto;
        a {
          border-radius: 100px;
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      li:first-of-type{
        height:225px;
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
