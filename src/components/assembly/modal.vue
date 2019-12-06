<template>
  <div class="modal" :class="{ show: isshow }">
    <!-- @touchmove.prevent -->
    <!-- 老用户跳转 -->
    <div class="modal-box" v-if="ismodal.isaddress === 'isuser'&&!ismodal.follow">
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
    <div v-if="ismodal.isaddress === 'isuser'&&ismodal.follow" class="modal-new">
      <img src="../../../static/QRcode.png" class="modal-new-code">
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
        <input id="subtel" type="tel" maxlength="11" placeholder="请输入手机号" v-model="cusphone" />
      </div>
      <div class="modal-phone-QR">
        <label for="subQR"></label>
        <input id="subQR" type="text" maxlength="6" placeholder="请输入验证码" v-model="cusQR" />
        <div @click.capture="subQR" :style="{ 'pointer-events': qrnum != '获取验证码' ? 'none' : '' }">{{ qrnum }}</div>
      </div>
      <div class="modal-box-button"><button @click.stop="checkmob">确定</button></div>
      <div class="modal-phone-text">手机号仅限本次活动领奖使用, 将严格保密, 请安心填写。</div>
    </div>
    <!-- 新增地址 -->
    <div v-if="ismodal.isaddress === 'isadd'" class="modal-address">
      <p>新增地址</p>
      <div class="modal-address-input">
        <label for="contacts">联系人:</label>
        <input type="text" id="contacts" v-model="cusadd.name" />
      </div>
      <div class="modal-address-input">
        <label for="telp">手机号:</label>
        <input type="tel" id="telp" maxlength="11" v-model="cusadd.phone" />
      </div>
      <div class="modal-address-three">
        <div class="modal-address-text">联系地址:</div>
        <div>
          <select v-model="province" @change="onprovince(province)">
            <option v-for="(item, index) in cityjson" :key="index">{{ item.p }}</option>
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
        <textarea name="address" rows="auto" v-model="cusadd.texta"></textarea>
      </div>
      <div class="modal-address-button">
        <button @click="close">取消</button>
        <button @click="apiaddadress()">确认</button>
      </div>
    </div>
    <!-- 编辑地址 -->
    <div v-if="ismodal.isaddress === 'bjadd'" class="modal-address">
      <p>编辑地址</p>
      <div class="modal-address-input">
        <label for="contacts">联系人:</label>
        <input type="text" id="contacts" v-model="cusadd.name" />
      </div>
      <div class="modal-address-input">
        <label for="telp">手机号:</label>
        <input type="tel" id="telp" maxlength="11" v-model="cusadd.phone" />
      </div>
      <div class="modal-address-three">
        <div class="modal-address-text">联系地址:</div>
        <div>
          <select v-model="province" @change="onprovince(province)">
            <option v-for="(item, index) in cityjson" :key="index">{{ item.p }}</option>
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
        <textarea name="address" rows="auto" v-model="cusadd.texta"></textarea>
      </div>
      <div class="modal-address-button">
        <button @click="close">取消</button>
        <button @click="bjaddadress()">确认</button>
      </div>
    </div>
    <!-- 我的地址 -->
    <div v-if="ismodal.isaddress === 'myadd'" class="modal-myadd">
      <p>我的地址</p>
      <div class="modal-myadd-box">
        <p class="box-title">注意：请填写真实姓名与详细地址, 否则订单会被取消。</p>
        <div class="modal-myadd-cart">
          <div class="box-cart" v-for="(item, index) in myaddress" :key="index">
            <div class="box-cart-add">
              <div class="box-cart-add1">
                <div class="box-name">
                  <div>{{ item.contactName }}</div>
                  <div>{{ item.contactPhone }}</div>
                </div>
                <p>{{ item.province }}{{ item.city }}{{ item.area }}{{ item.street }}</p>
              </div>
              <div
                class="box-cart-add-radio"
                @click="dotrue(index)"
                :style="{ backgroundImage: 'url(./static/modal/' + (turenum == index ? 'ontrue' : 'radio') + '.png)' }"
              ></div>
            </div>
            <div class="box-cart-bottom">
              <div class="box-cart-bbox" @click="ontrued(index)">
                <div :style="{ backgroundImage: 'url(./static/modal/' + (item.isDefault == 1 ? 'diany' : 'yuanx') + '.png)' }"></div>
                <div>设为默认</div>
              </div>
              <div class="box-cart-bottom-r">
                <div class="box-cart-bottom-bg" @click="bjaddress(index)">
                  <i></i>
                  编辑
                </div>
                <div class="box-cart-bottom-del" @click="deladd(index)">
                  <i></i>
                  删除
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-myadd-button">
        <button @click="subaddress('isadd')">新增地址</button>
        <button @click="trueaddress">确定</button>
      </div>
    </div>
    <!-- 转圈圈 -->
    <div v-if="ismodal.isaddress === 'zqq'"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import city from '@/api/city.data.js';
import api from '@/api';

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
      // 验证手机号
      cusphone: '',
      //手机号验证码
      cusQR: '',
      //用户编辑的地址信息
      cusadd: {
        name: '',
        phone: '',
        add: '',
        texta: ''
      },
      myaddress: '',
      //编辑的第几个
      bjaddnum: '',
      //第几个选择
      turenum: 0,
      //选择第几个默认
      bgimg: 0
    };
  },
  inject: ['reload'],
  components: {
    city
  },
  mounted() {
    this.cityjson = city.citylist;
    this.myaddress = JSON.parse(localStorage.getItem('cusaddress'));
  },
  watch: {
    isshow() {
      if (this.isshow) {
        if (this.ismodal.isaddress == 'myadd') {
          this.getmyadd();
        }
        document.querySelector('#app').setAttribute('style', 'position: fixed;');
      } else {
        document.querySelector('#app').removeAttribute('style');
      }
    }
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
      //进入初始页面传过来的所有值
      all: 'all'
      //进入我的地址页面接收到的地址
      // myaddress:'myaddress'
    })
  },
  methods: {
    ...mapActions(['subaddress', 'update', 'ccmyadd']),
    //确认地址
    trueaddress() {
      let QRcode = JSON.parse(localStorage.getItem('QRcode'));
      console.log(this.myaddress)
      if (this.myaddress[this.bgimg]!=undefined&&this.myaddress[this.bgimg].isDefault == 1) {
        let data = {
          addressId: this.myaddress[this.bgimg].addressId,
          contactName: this.myaddress[this.bgimg].contactName,
          contactPhone: this.myaddress[this.bgimg].contactPhone,
          province: this.myaddress[this.bgimg].province,
          city: this.myaddress[this.bgimg].city,
          area: this.myaddress[this.bgimg].area,
          street: this.myaddress[this.bgimg].street,
          isDefault: 1,
          memberId: QRcode.memberId
        };
        api.editAddress(data).then(res => {
          if (res.data.code == 500) {
            alert('确认默认失败');
          }
        });
      }
      this.ccmyadd(this.myaddress[this.turenum]);
      this.close();
      this.reload();
    },
    //编辑选中地址
    bjaddress(e) {
      let self = this;
      let data = JSON.parse(localStorage.getItem('cusaddress'))[e].addressId;
      api.oneAddress(data).then(res => {
        self.cusadd.name = res.data.data.contactName;
        self.cusadd.phone = res.data.data.contactPhone;
        self.cusadd.texta = res.data.data.contactName;
        self.province = res.data.data.province.street;
        self.cityname = res.data.data.province.city;
        self.quyu = res.data.data.province.area;
        self.bjaddnum = e;
        self.subaddress('bjadd');
        console.log(res.data.data);
      });
    },
    //确定编辑选中地址
    bjaddadress() {
      let self = this;
      let QRcode = JSON.parse(localStorage.getItem('QRcode'));
      let addid = JSON.parse(localStorage.getItem('cusaddress'))[this.bjaddnum].addressId;
      let data = {
        addressId: addid,
        contactName: this.cusadd.name,
        contactPhone: this.cusadd.phone,
        province: this.province,
        city: this.cityname,
        area: this.quyu,
        street: this.cusadd.texta,
        isDefault: -1,
        memberId: QRcode.memberId
      };
      api.editAddress(data).then(res => {
        if (res.data.code == 200) {
          self.getmyadd();
          self.close();
        }else{
          alert('编辑接口报错')
        }
      });
    },
    //更新数组我的地址
    gxmyadd() {
      this.myaddress = JSON.parse(localStorage.getItem('cusaddress'));
      console.log(this.myaddress);
    },
    //删除所选地址
    deladd(e) {
      let self = this;
      let data = {
        addressId: this.myaddress[e].addressId
      };
      api.deleteAddress(data).then(res => {
        self.getmyadd();
      });
    },
    //获取我的地址
    getmyadd() {
      let self = this;
      let QRcode = JSON.parse(localStorage.getItem('QRcode'));
      api.getAddress(QRcode.memberId).then(res => {
          // self.onmyadd(res.data.data);
          // self.cusaddress=res.data.data;
          localStorage.setItem('cusaddress', JSON.stringify(res.data.data));
          self.gxmyadd();
        }).catch(err => {
          console.log(err);
        });
    },
    //新增地址
    apiaddadress() {
      let self = this;
      let QRcode = JSON.parse(localStorage.getItem('QRcode'));
      let cusaddress = {
        contactName: this.cusadd.name,
        contactPhone: this.cusadd.phone,
        province: this.province,
        city: this.cityname,
        area: this.quyu,
        street: this.cusadd.texta,
        isDefault: 1,
        memberId: QRcode.memberId
      };
      api.addAddress(cusaddress).then(res => {
          console.log(999)
          let self = this;
          let QRcode = JSON.parse(localStorage.getItem('QRcode'));
          api.getAddress(QRcode.memberId).then(res => {
            console.log(666)
              localStorage.setItem('cusaddress', JSON.stringify(res.data.data));
              self.gxmyadd();
              self.reload();
              self.close();
            }).catch(err => {
              console.log(err);
            });

        })
        .catch(err => {
          console.log(err);
        });
    },
    dotrue(e) {
      this.turenum = e;
    },
    ontrued(e) {
      if (this.myaddress[e].isDefault == -1) {
        for (let i = 0; i < this.myaddress.length; i++) {
          this.myaddress[i].isDefault = -1;
        }
        this.myaddress[e].isDefault = 1;
      } else {
        this.myaddress[e].isDefault = -1;
      }
      this.bgimg = e;
    },
    onprovince(e) {
      this.cityjsons = this.cityjson.find(item => item.p == e).c;
      this.cityjsonq = '';
    },
    oncityname(e) {
      this.cityjsonq = this.cityjsons.find(item => item.n == e).a;
    },
    //关闭modal
    ...mapActions(['close', 'cusphones']),
    subQR() {
      if (/^1[3456789]\d{9}$/.test(this.cusphone)) {
        let data = {
          mobile: this.cusphone
        };
        api
          .getMobileValidate(data)
          .then(res => {
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
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert('请输入正确的手机号');
      }
    },
    //确定手机号和验证码
    checkmob() {
      let self = this;
      let data = {
        mobile: self.cusphone,
        code: self.cusQR
      };
      api
        .checkMobileValidate(data)
        .then(res => {
          if (res.data.code == '200') {
            let Qr = JSON.parse(localStorage.getItem('QRcodeinfor'));
            Qr.mobile = self.cusphone;
            localStorage.setItem('QRcodeinfor', JSON.stringify(Qr));
            self.cusphones(Qr.mobile);
            // this.$router.go(0);
            this.reload();
            let all = JSON.parse(localStorage.getItem('all'));
            /*wx.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function(res) {
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度

              }
            });*/
            let draw = {
              scanId: all.scanId,
              latitude: 0, // 纬度，浮点数，范围为90 ~ -90
              longitude: 0 // 经度，浮点数，范围为180 ~ -180
            };
            //调取奖品接口
            api.doLuckyDraw(draw).then(res => {
              this.update(res.data.data);
              this.close();
            });
          } else alert('验证失败');
        })
        .catch(err => {
          console.log(err);
        });
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
  background: url(https://pic.cwyyt.cn//upload/img/20191203/1732133213_popp.png) no-repeat;
  background-size: 100% 100%;
};
@label: {
  width: 100px;
  height: 100%;
  border-right: solid 1px rgb(211, 176, 34);
  background-position: 50% 50%;
  display: block;
};
@center: {
  display: flex;
  justify-content: center;
  align-items: center;
};
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
        background: url(https://pic.cwyyt.cn/upload/img/20191203/1736453645_button2.png) no-repeat;
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
    .modal-myadd-button {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      button {
        background: url(https://pic.cwyyt.cn/upload/img/20191203/1736453645_button2.png) no-repeat;
        background-size: 100% 100%;
        outline: none;
        border: none;
        cursor: pointer;
        color: #fff;
        height: 79px;
        font-size: 36px;
        border-radius: 50px;
        width: 210px;
      }
      button:last-of-type {
        letter-spacing: 30px;
        text-indent: 30px;
      }
    }
    // overflow: hidden;
    .modal-myadd-box {
      width: 100%;
      height: 490px;
      margin-top: 20px;
      border-radius: 15px;
      overflow: hidden;
      .box-title {
        background-color: #bf8440;
        font-size: 22px;
        color: #feefd8;
        height: 45px;
        padding: 10px 0;
        box-sizing: border-box;
      }
      .modal-myadd-cart {
        overflow: auto;
        height: 445px;
        .box-cart:first-of-type {
          border: none;
        }
        .box-cart {
          padding: 20px 35px 0;
          border-top: 10px solid rgb(229, 206, 179);
          background-color: #fff;
          .box-cart-bottom {
            color: #8c8c8c;
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
            border-top: solid 1px black;
            .box-cart-bbox {
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              div:first-of-type {
                margin-top: 5px;
                margin-right: 10px;
                width: 23px;
                height: 23px;
                background-repeat: no-repeat;
                background-size: 100% 100%;
              }
            }
            .box-cart-bottom-r {
              width: 50%;
              display: flex;
              justify-content: space-around;
              .box-cart-bottom-bg {
                @center();
                i {
                  margin-top: 5px;
                  margin-right: 10px;
                  display: block;
                  background: url(../../../static/modal/bj.png) no-repeat;
                  background-size: 100% 100%;
                  width: 18px;
                  height: 18px;
                }
              }
              .box-cart-bottom-del {
                @center();
                i {
                  margin-top: 5px;
                  margin-right: 10px;
                  display: block;
                  background: url(../../../static/modal/del.png) no-repeat;
                  background-size: 100% 100%;
                  width: 17px;
                  height: 23px;
                }
              }
            }
          }
          p {
            color: #8c8c8c;
            font-size: 28px;
            text-align: left;
            font-weight: 500;
            margin: 12px 0;
          }
          .box-cart-add {
            display: flex;
            justify-content: center;
            align-items: center;
            .box-cart-add1 {
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
            .box-cart-add-radio {
              background-repeat: no-repeat;
              width: 48px;
              height: 48px;
              background-size: 100% 100%;
            }
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
    background: url(../../../static/modal02.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .modal-new-code{
      width: 290px;
      height: 290px;
      // background: url(../../../static/QRcode.png) no-repeat;
      // background-size: 100% 100%;
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
        background: url(https://pic.cwyyt.cn/upload/img/20191203/173506356_phone.png) no-repeat;
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
        background: url(https://pic.cwyyt.cn/upload/img/20191203/1739353935_clock.png) no-repeat;
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
      background: url(../../../static/img1.png) no-repeat;
      background-size: 100% 100%;
    }
    .modal-box-img2 {
      background: url(../../../static/img2.png) no-repeat;
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
    background: url(https://pic.cwyyt.cn/upload/img/20191203/1736453645_button2.png) no-repeat;
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
