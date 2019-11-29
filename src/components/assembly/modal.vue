<template>
  <div class="modal" @touchmove.prevent :class="{ show: isshow }">
    <!-- 老用户跳转 -->
    <div class="modal-box" v-if="ismodal.isuser === '0' && ismodal.isaddress === 'isuser'">
      <div class="center"><div class="modal-box-img" :class="contentstyle.img ? 'modal-box-img1' : 'modal-box-img2'"></div></div>
      <div class="modal-box-text">
        <div>{{ contentstyle.text1 }}</div>
        <div>{{ contentstyle.text2 }}</div>
      </div>
      <div class="modal-box-button">
        <button @click="close" v-show="contentstyle.isbutton">{{ contentstyle.button }}</button>
        <button v-if="ismodal.errnum >= 3" @click="sweepcode">重新扫码</button>
      </div>
    </div>
    <!-- 新用户跳转 -->
    <div v-if="ismodal.isuser === '1' && ismodal.isaddress === 'isuser'" class="modal-new">
      <div class="modal-new-code"></div>
      <div class="modal-new-clause">
        <p>
          关注前请仔细阅读
          <a href="#">沙龙服务条款</a>
        </p>
        <p>一经关注则视为同意</p>
      </div>
      <div class="modal-new-sup">
        <p>本平台含有烟草内容18岁以下谢绝关注</p>
        <p>服务支持: 武汉黄鹤楼漫天游文化传播有限公司</p>
      </div>
    </div>
    <!-- 客户留电话跳转 -->
    <div v-if="ismodal.isaddress === 'isphone'" class="modal-phone">
      <div class="modal-phone-title">请输入手机号</div>
      <div class="modal-phone-tel">
        <label for="subtel"></label>
        <input id="subtel" type="tel" maxlength="11" placeholder="请输入手机号" />
      </div>
      <div class="modal-phone-QR">
        <label for="subQR"></label>
        <input id="subQR" type="text" maxlength="5" placeholder="请输入验证码" />
        <div @click.capture="subQR" :style="{ 'pointer-events': qrnum != '获取验证码' ? 'none' : '' }">{{ qrnum }}</div>
      </div>
      <div class="modal-box-button"><button @click.stop="close">确定</button></div>
      <div class="modal-phone-text">手机活动仅限本次活动领奖使用, 将严格保密, 请安心填写。</div>
    </div>
    <!-- 编辑地址 -->
    <div v-if="ismodal.isaddress === 'isadd'" class="modal-address">
      <p>编辑地址</p>
      <div class="modal-address-input">
        <label for="contacts">联系人:</label>
        <input type="text" id="contacts" />
      </div>
      <div class="modal-address-input">
        <label for="telp">手机号:</label>
        <input type="tel" id="telp" maxlength="11" />
      </div>
      <div class="modal-address-three">
        <div class="modal-address-text">联系地址:</div>
        <div>
          <select v-model="province" @change="onprovince(province)">
            <option v-for="(item, index) in cityjson" :key="index" @change="fn(item.p)">{{ item.p }}</option>
          </select>
          <select v-model="cityname" @change="oncityname(cityname)">
            <option v-for="(item, index) in cityjsons" :key="index">{{ item.n }}</option>
          </select>
          <select v-model="quyu">
            <option v-for="(item, index) in cityjsonq" :key="index">{{ item.s }}</option>
          </select>
        </div>
      </div>
      <div class="modal-address-texta">
        <div>联系地址:</div>
        <textarea name="address" rows="auto" v-model="texta"></textarea>
      </div>
      <div class="modal-address-button">
        <button @click="close">取消</button>
        <button @click="fn">确认</button>
      </div>
    </div>
    <!-- 我的地址 -->
    <div v-if="ismodal.isaddress === 'myadd'" class="modal-myadd">
      <p>我的地址</p>
      <div class="modal-myadd-box">
        <p class="box-title">注意：请填写真实姓名与详细地址, 否则订单会被取消。</p>
        <div class="box-cart" v-for='a in 5'>
          <div class="box-cart-add">
            <div class="box-cart-add1">
              <div class="box-name">
                <div>里脊</div>
                <div>13661237891</div>
              </div>
              <p>湖北省武汉市姜巷去泛海国际SHOH城1栋2510</p>
            </div>
            <div class='box-cart-add-radio' @click="dotrue" :style="{backgroundImage:'url(/static/modal/'+ontrue+'.png)'}"></div>
          </div>
          <div class="box-cart-bottom">
            <div class="box-cart-bbox" @click="ontrued">
              <div :style="{backgroundImage:'url(/static/modal/'+bgimg+'.png)'}"></div>
              <div>设为默认</div></div>
            <div class="box-cart-bottom-r">
              <div class="box-cart-bottom-bg" @click="subaddress('isadd')">
                <i></i>
                编辑</div>
              <div class="box-cart-bottom-del">
                <i ></i>
                删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import city from '@/api/city.data.js';
export default {
  name: 'modal',
  data() {
    return {
      qrnum: '获取验证码',
      cityjson: '',
      cityjsons: '',
      cityjsonq: '',
      province: '',
      cityname: '',
      quyu: '',
      texta: '',
      bgimg:'yuanx',
      ontrue:'radio'
    };
  },
  components: {
    city
  },
  mounted() {
    this.cityjson = city.citylist;
  },
  computed: {
    ...mapState({
      //模态框是否显示
      isshow: 'isshow',
      //显示第几条信息
      num: 'modalnum',
      // 现在的样式内容
      contentstyle: 'contentstyle',
      //显示什么样的modal
      ismodal: 'ismodal',
      //进入页面传过来的所有值
      all: 'all'
      //
    })
  },
  methods: {
    ...mapActions(['subaddress']),
    dotrue(){
      if(this.ontrue=='radio'){
        this.ontrue='ontrue';
      }else if( this.ontrue=='ontrue'){
         this.ontrue='radio';
      }
    },
    ontrued(){
    if(this.bgimg=='yuanx'){
      this.bgimg='diany'
    }else if(this.bgimg=='diany'){
      this.bgimg='yuanx'
    }
    },
    fn() {
      console.log(this.province, this.cityname, this.quyu, this.texta);
    },
    onprovince(e) {
      this.cityjsons = this.cityjson.find(item => item.p == e).c;
      this.cityjsonq = '';
    },
    oncityname(e) {
      this.cityjsonq = this.cityjsons.find(item => item.n == e).a;
    },
    //关闭modal
    ...mapActions(['close']),
    subQR() {
      let num = 60;
      this.qrnum = num + 's';
      let times = setInterval(() => {
        num--;
        this.qrnum = num + 's';
        if (num < 0) {
          clearInterval(times);
          this.qrnum = '获取验证码';
        }
      }, 1000);
    },
    sweepcode() {
      console.log(this.all.scanId);
      this.wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
@modal: {
  color: #fff;
  width: 700px;
  height: 744px;
  background: url(/static/popp.png) no-repeat;
  background-size: 100% 100%;
};
@label: {
  width: 100px;
  height: 100%;
  border-right: solid 1px rgb(211, 176, 34);
  background-position: 50% 50%;
  display: block;
};
@center:{
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  z-index: -100;
  position: fixed;
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
  .modal-address {
    @modal();
    padding: 47px 40px 33px;
    box-sizing: border-box;
    color: #955409;
    font-size: 30px;
    p {
      font-size: 36px;
      color: #552208;
      font-weight: 700;
      margin-bottom: 36px;
    }
    .modal-address-texta {
      display: flex;
      justify-content: space-between;
      div {
        width: 137px;
      }
      textarea {
        flex: 1;
        margin-left: 10px;
        height: 140px;
      }
    }
    .modal-address-three {
      display: flex;
      height: 64px;
      margin-bottom: 25px;
      .modal-address-text {
        width: 137px;
      }
      div:last-of-type {
        flex: 1;
        display: flex;
        justify-content: space-between;
        margin-left: 10px;
      }
      select {
        width: 150px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 30px;
      }
    }
    .modal-address-button {
      display: flex;
      justify-content: space-around;
      margin-top: 65px;
      button {
        background: url(/static/button2.png) no-repeat;
        background-size: 100% 100%;
        outline: none;
        border: none;
        cursor: pointer;
        color: #fff;
        height: 79px;
        font-size: 36px;
        border-radius: 50px;
        width: 238px;
        letter-spacing: 30px;
        text-indent: 30px;
      }
    }

    .modal-address-input {
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      label {
        width: 137px;
        letter-spacing: 5px;
      }
      input {
        flex: 1;
        margin-left: 10px;
        border: none;
        border: solid 1px #955409;
        border-radius: 5px;
        height: 64px;
        box-shadow: 0px 0px 8px #333333;
      }
    }
  }
  .modal-myadd {
    @modal();
    padding: 47px 40px 33px;
    box-sizing: border-box;
    color: #955409;
    font-size: 30px;
    // overflow: hidden;
    .modal-myadd-box {
      width: 100%;
      height: 500px;
      background-color: #fff;
      border-radius: 15px;
      overflow: auto;
      .box-title {
        background-color: #bf8440;
        font-size: 22px;
        color: #feefd8;
        height: 45px;
        padding: 10px 0;
        box-sizing: border-box;
      }
      .box-cart {
        padding: 15px 35px 0;
        .box-cart-bottom{
           color: #8c8c8c;
          display: flex;
          justify-content: space-between;
          border-top: solid 1px black;
          .box-cart-bbox{
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            div:first-of-type{
              margin-top:5px ;
              margin-right:10px;
              width: 23px;
              height: 23px;
              background-repeat: no-repeat;
              background-size:100% 100%;
            }
          }
          .box-cart-bottom-r{
            width: 50%;
            display: flex;
            justify-content: space-around;
            .box-cart-bottom-bg {
              @center();
              i{
                margin-top:5px;
                margin-right:10px;
                display: block;
                background: url(/static/modal/bj.png) no-repeat;
                 background-size:100% 100% ;
                width: 18px;
                height: 18px;
              }
            }
            .box-cart-bottom-del
            {
               @center();
              i{
                margin-top:5px;
                margin-right:10px;
                display: block;
                background: url(/static/modal/del.png) no-repeat;
                background-size:100% 100% ;
                width: 17px;
                height: 23px;
              }
            }
          }
        }
        p{
          color:#8c8c8c;
          font-size: 28px;
          text-align: left;
        }
        .box-cart-add{
          display: flex;
          justify-content: center;
          align-items: center;
          .box-cart-add1{
            flex: 1;
            .box-name {
              display: flex;
              justify-content: flex-start;
              div:first-of-type {
                margin-right: 124px;
              }
              div {
                font-size: 30px;
                color: black;
                font-weight: 600;
              }
            }
          }
          .box-cart-add-radio{
            background-repeat:no-repeat;
            width: 48px;
            height: 48px;
            background-size:100% 100% ;
          }
        }
      }
    }
    p {
      font-size: 36px;
      color: #552208;
      font-weight: 700;
    }
  }
  .modal-new {
    width: 703px;
    height: 874px;
    background: url(/static/modal02.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .modal-new-code {
      width: 290px;
      height: 290px;
      background: url(/static/QRcode.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 373px;
    }
    .modal-new-clause {
      color: rgb(85, 34, 8);
      font-size: 24px;
      font-weight: bold;
      a {
        color: rgb(212, 62, 62);
        text-decoration: none;
      }
    }
    .modal-new-sup {
      color: rgb(250, 152, 77);
      font-size: 18px;
      margin-bottom: 36px;
    }
  }
  // 留取资料样式
  .modal-phone {
    @modal();
    display: flex;
    align-items: center;
    flex-direction: column;
    .modal-phone-title {
      font-size: 36px;
      margin: 85px 0 61px;
      color: rgb(85, 34, 8);
      font-weight: bold;
    }
    .modal-phone-text {
      font-size: 20px;
      color: rgb(205, 154, 74);
      margin-top: 10px;
    }
    .modal-phone-tel {
      background-color: #fff;
      width: 635px;
      border-radius: 20px;
      border: none;
      border: solid 1px rgb(211, 176, 34);
      box-shadow: 0 0 2px rgba(250, 0, 0, 0.5);
      height: 108px;
      display: flex;
      margin-bottom: 37px;
      box-sizing: border-box;
      label {
        background: url(/static/phone.png) no-repeat;
        background-size: 30px 43px;
        @label();
      }
      input {
        height: 100%;
        box-sizing: border-box;
        border: none;
        font-size: 28px;
        text-indent: 15px;
        width: 500px;
        outline: none;
      }
    }
    .modal-phone-QR {
      box-sizing: border-box;
      background-color: #fff;
      width: 635px;
      border-radius: 20px;
      border: none;
      border: solid 1px rgb(211, 176, 34);
      box-shadow: 0 0 2px rgba(250, 0, 0, 0.5);
      height: 108px;
      display: flex;
      margin-bottom: 145px;
      position: relative;
      label {
        background: url(/static/clock.png) no-repeat;
        background-size: 28px 37px;
        @label();
      }
      input {
        border: none;
        text-indent: 15px;
        outline: none;
        font-size: 28px;
        width: 340px;
      }
      div {
        color: rgb(217, 48, 53);
        font-size: 31px;
        width: 191px;
        font-weight: bold;
        border-left: solid 1px rgb(211, 176, 34);
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  // 问题模态框样式
  .modal-box {
    @modal();
    .modal-box-img {
      width: 269px;
      height: 269px;
      margin-top: 96px;
    }
    .modal-box-img1 {
      background: url(/static/img1.png) no-repeat;
      background-size: 100% 100%;
    }
    .modal-box-img2 {
      background: url(/static/img2.png) no-repeat;
      background-size: 100% 100%;
    }
    .modal-box-text {
      font-size: 30px;
      color: #955409;
      height: 100px;
      margin: 60px 0 65px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      div:first-of-type {
        margin-bottom: 10px;
      }
      div:last-of-type {
        padding: 0 130px;
      }
    }
  }
}
.modal-box-button {
  button {
    background: url(/static/button2.png) no-repeat;
    background-size: 100% 100%;
    outline: none;
    border: none;
    color: #fff;
    width: 313px;
    height: 79px;
    font-size: 36px;
  }
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
</style>
