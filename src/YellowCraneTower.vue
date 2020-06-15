<template>
  <div id="app" :class="ismodal.isuser === '0' ? 'pages-old' : 'pages-new'">
    <div class="cards" :class="card ? 'card1' : 'card2'" :style="{ backgroundImage: 'url(' + smokeimg + ')' }" key="0">
      <router-view v-if="routeractive"></router-view>
    </div>
    <div class="bottom-new" v-if="ismodal.isuser === '1'">
      <li>
        本平台含有烟草内容18岁以下谢绝关注
        <br />
        服务支持：武汉黄鹤楼漫天游文化传播有限公司
      </li>
    </div>
    <div class="bottom-old" v-if="ismodal.isuser === '0'">
      <ul class="bottom-old-a">
        <li v-for="(item, index) in advertisement" @click="record(item, index)" :key="index">
          <a href="javascript:void(0)" class="webadv" :style="{ backgroundImage: 'url(' + item.adv + ')' }"></a>
        </li>
        <li>
          本平台含有烟草内容18岁以下谢绝关注
          <br />
          服务支持：武汉黄鹤楼漫天游文化传播有限公司
        </li>
      </ul>
    </div>
    <div class="bottom-d" :class="ismodal.isuser === '0' ? 'bottomImgold' : 'bottomImgnew'"></div>
    <!-- 弹出的提示model -->
    <modal></modal>
    <!-- 等待框 -->
    <wait></wait>
    <!-- 活动图标 -->
    <div class="activity" @click="goActivityWeb" v-if="istwod"></div>
    <!-- 弹出错误 -->
    <err></err>
    <!-- 弹出框 -->
    <transition name="fade"><div v-if="isfudai" class="alertBox" @click="gofudai(false)"></div></transition>
    <transition name="fade">
      <div v-if="isfudai" class="alertBoxImg">
        <div class="alertClose" @click="gotoWeb"></div>
        <div class="alertClose2" @click="gofudai(false)"></div>
      </div>
    </transition>
    <!-- 新增次数弹框 -->
    <transiton name="fade">
      <div class="alertMask" v-show="isMask">
        <div class="imgBG">
          <div class="icon"></div>
          <div class="text">
            <span>{{ maskText1 }}</span>
            <span>{{ maskText2 }}</span>
            <span>{{ maskText3 }}</span>
          </div>
          <div class="button" @click="alertMask(false)">关闭</div>
        </div>
      </div>
    </transiton>
  </div>
</template>

<script>
import modal from "@/components/assembly/modal";
import wait from "@/components/assembly/wait";
import err from "@/components/assembly/err";
import fudai from "@/components/assembly/fudai";
import { mapState, mapActions } from "vuex";
import api from "@/api";
export default {
  name: "YellowCraneTower",
  provide() {
    return {
      reload: this.reload,
      alertMask: this.alertMask
    };
  },
  data() {
    return {
      //模拟传进来的值
      // website: advertisement, //老用户页面跳转的三个链接
      card: true,
      transitionName: "",
      routeractive: true,
      istwod: false,
      isMask: false,
      maskText1: "",
      maskText2: "",
      maskText3: ""
    };
  },
  components: {
    modal,
    wait,
    err,
    fudai
  },
  computed: {
    ...mapState({
      ismodal: "ismodal",
      smokeimg: "smokeimg",
      all: "all",
      advertisement: "advertisement",
      ishasjp: "ishasjp",
      openid: "openid",
      isfudai: "isfudai"
    })
  },
  mounted() {
    this.startheight = window.innerHeight;
    let that = this;
    window.onresize = function() {
      let nowheight = window.innerHeight;
      if (that.startheight == nowheight) {
        window.scrollTo(0, 0);
      }
    };
    // console.log(this.$route.query.timestamp-1581645600000);
    // if(this.$route.query.timestamp){
    //   if(this.$route.query.timestamp<1581645600000){
    //     this.istwod=false
    //   }
    // }else{
    //   if(JSON.parse(localStorage.getItem('all')).timestamp<1581645600000){
    //     this.istwod=false
    //   }
    // }

    //判断是否通过二维码扫描进入此页面，是直接把传来的值存储，不是就读取在local中是否存在之前存的数据
    if (this.$route.path != "/") {
      this.isNewUser(JSON.parse(localStorage.getItem("all")));
    }

    // this.$router.push('/');
    this.move();
  },
  methods: {
    ...mapActions(["isNewUser", "gofudai"]),
    gotoWeb() {
      window.location.href = "http://qrhhl.yunyutian.cn/huanghelou1916-center/wx/gCode?name=toBoat";
    },
    alertMask(e) {
      if (e === false) {
        this.isMask = false;
      } else {
        this.maskText1 = e.text1;
        this.maskText2 = e.text2;
        this.maskText3 = e.text3;
        this.isMask = true;
      }
    },
    //跳转活动页面
    goActivityWeb() {
      window.location.href = "https://w.url.cn/s/A93zZhD";
    },
    //记录点击底部跳转的次数
    record(e, f) {
      let data = {
        openid: this.openid,
        type: f - -3
      };
      if (this.openid == null || this.openid == undefined || this.openid == "") {
        window.location.href = e.web;
      } else {
        api
          .uStatistics(data)
          .then(res => {
            window.location.href = e.web;
          })
          .catch(err => {
            window.location.href = e.web;
          });
      }

      /* setTimeout(()=>{
        if(e.web==undefined||e.web==""||e.web==null){
          return
        }
        window.location.href=e.web;
      },500)*/
    },
    //跳往双旦活动
    /* goout(){
        window.location.href='https://wx.hhl1916.com/huanghelou1916-center/wx/gCode?name=toYq'
     },*/
    //移动动画切换
    move() {
      let self = this;
      var getimgmove = setInterval(() => {
        if (self.smokeimg != "") {
          setTimeout(() => {
            self.card = false;
          }, 300);
          clearInterval(getimgmove);
        }
      }, 100);
    },
    //刷新页面
    reload() {
      this.routeractive = false;
      this.$nextTick(function() {
        this.routeractive = true;
      });
    }
  }
};
</script>

<style lang="less">
// 新增的弹框
.alertMask {
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  .imgBG {
    background: url(../static/cardBG.png) no-repeat;
    background-size: 100% 100%;
    width: 700px;
    height: 744px;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    padding-top: 100px;
    .text {
      font-size: 32px;
      color: #955409;
      margin: 30px 0;
      span {
        display: block;
        margin-bottom: 10px;
        white-space: nowrap;
      }
    }
    .button {
      background: linear-gradient(90deg, rgba(255, 144, 82, 1) 0%, rgba(248, 59, 65, 1) 100%);
      background-size: 100% 100%;
      border-radius: 90px;
      width: 300px;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 40px;
      letter-spacing: 5px;
      text-align: 5px;
      white-space: nowrap;
    }
    .icon {
      background: url(../static/img1.png) no-repeat;
      background-size: 100% 100%;
      width: 269px;
      height: 269px;
    }
  }
}
//新增弹窗的样式
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.alertBoxImg {
  background: url(../static/modal/alertBoxbg.png) no-repeat;
  background-size: 100% 100%;
  width: 655px;
  height: 54.8vh;
  position: relative;
  left: 100px;
  top: 5vh;
  z-index: 100;
  .alertClose2 {
    background: url(../static/modal/alertClose.png) no-repeat;
    background-size: 100% 100%;
    width: 69px;
    height: 65px;
    top: 18vh;
    right: 16vw;
    position: absolute;
  }
  .alertClose {
    background: url(../static/modal/alertBoxClose.png) no-repeat;
    background-size: 100% 100%;
    width: 462px;
    height: 10.35vh;
    position: absolute;
    bottom: -12vh;
    left: 6vw;
  }
}
.alertBox {
  background: rgba(0, 0, 0, 0.6);
  z-index: 98;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
//新增图标跳转样式
.activity {
  background: url(../static/activity.png) no-repeat;
  width: 150px;
  height: 150px;
  background-size: 100% 100%;
  position: fixed;
  right: 10px;
  bottom: 250px;
  z-index: 95;
}
// 双旦分数样式
// .twod{
//   background: url(../static/twod.png) no-repeat;
//   width: 167px;
//   height: 191px;
//   background-size:100% 100% ;
//   position: fixed;
//   right: 0px;
//   bottom:100px ;
//   z-index: 95;
//   animation: fight 1s ease infinite both;
//   }
@keyframes fight {
  0% {
    transform: none;
  }
  50% {
    transform: scale3d(0.95, 0.95, 0.95);
  }
  100% {
    transform: none;
  }
}
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
//香烟的卡片样式
.cards {
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
    z-index: 95;
    width: 750px;
    height: 1171px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 40px;
    box-sizing: border-box;
    li {
      font-size: 20px;
      color: #fff;
      height: 30px;
    }
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
      .webadv {
        background-size: 100% 100%;
      }
      li {
        height: 139px;
        margin-bottom: 15px;
        pointer-events: auto;
        a {
          border-radius: 100px;
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      li:first-of-type {
        height: 225px;
      }
      li:last-of-type {
        font-size: 20px;
        color: #fff;
        height: 20px;
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
