import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import api from '@/api'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    //双旦兑换码是否存在
    ishasjp: true,
    //进入初始页面时接收到的所有信息
    all: {},
    //收到的底部广告和地址
    advertisement: [{
        web: '',
        adv: ''
      },
      {
        web: 'https://mp.weixin.qq.com/mp/homepage?__biz=MzIwNzE0MDUyMw==&hid=4&sn=53c00ccf532c568472653f528f444de9',
        adv: './static/adv2.png'
      },
      {
        web: 'https://wx.hhl1916.com/opc/ms/wxForeign/r?fsr=toMe',
        adv: './static/adv1.png'
      },
    ],
    // code: 0,//接收到的验证码的结果
    isshow: false, //modal框是否显示
    isloading: false, //loading是否显示
    //modalnum:0,//显示第几条信息
    //显示什么样的modal
    ismodal: {
      isphone: "", //客户电话
      isuser: '1', //1第一次进入这个页面0非第一次
      isaddress: 'isphone', //modal是由哪里传来的
      errnum: 0, //输入错误次数
      follow: true //是否关注true没关注false关注了
    },
    // 烟的图片和背景图片
    smokeimg: '', //8d,dc,gezz,jxy,qj,xgqxz,xgqz,yy,zp,zy
    //提前存储的提示内容
    storagecont: [{
        img: true,
        text1: '您输入的验证码有误',
        text2: '请重新输入',
        isbutton: true,
        button: '重新输入'
      },
      {
        img: false,
        text1: '系统调试中,请稍后再试~',
        text2: '',
        isbutton: false,
        button: ''
      },
      {
        img: true,
        text1: '验证码输入错误',
        text2: '亲爱的楼主, 您输入的验证码有误若产品为新开封, 请注意鉴别真伪',
        isbutton: true,
        button: '好的'
      },
      {
        img: false,
        text1: '您要的页面走丢了,',
        text2: '试试重新加载找回正确的页面吧！',
        isbutton: false,
        button: ''
      },
      {
        img: true,
        text1: '此二维码查询有误',
        text2: '',
        isbutton: false,
        button: '重新扫码'
      }
    ],
    //以传过来的值确认现在的样式
    contentstyle: {
      img: true, //显示哪个图片
      text1: '您输入的验证码有误',
      text2: '请重新输入',
      isbutton: true,
      button: "重新输入"
    },
    //接口传过来的烟的信息
    QRcodeinfor: {
      name: '黄鹤楼·峡谷情中支',
      //首次扫码的时间
      firsttime: '2018-07-25 18:03:05',
      // 扫码次数
      num: 1,
      smoke: {
        img: 'smokexgqz',
        tar: '9mg',
        monoxide: '10mg',
        alkali: '0.9mg'
      },
      // 奖池是否有奖
      status: false,
      //中奖信息
      statusxx: '464654',
      //我的地址
      myaddress: [],
      //二维码界面的确认的地址
      cusaddress: 0,
    }
  },
  getter: {

  },
  actions: {
    subcode({
      commit,
      state
    }, mm) {
      commit('dosubcode', mm)
    },
    close({
      commit,
      state
    }, mm) {
      commit('doclose', mm)
    },
    Callback({
      commit,
      state
    }, mm) {
      commit('doCallback', mm)
    },
    isNewUser({
      commit,
      state
    }, mm) {
      commit('doisNewUser', mm)
    },
    subaddress({
      commit,
      state
    }, mm) {
      commit('doaddress', mm)
    },
    onresult({
      commit,
      state
    }, mm) {
      commit('onresults', mm)
    },
    goerr({
      commit,
      state
    }, mm) {
      commit('onerr', mm)
    },
    cusphones({
      commit,
      state
    }, mm) {
      commit('oncusphone', mm)
    },
    update({
      commit,
      state
    }, mm) {
      commit('onupdate', mm)
    },
    onmyadd({
      commit,
      state
    }, mm) {
      commit('goonisaddress', mm)
    },
    bjaddress({
      commit,
      state
    }, mm) {
      commit('gobjaddress', mm)
    },
    ccmyadd({
      commit,
      state
    }, mm) {
      commit('goccmyadd', mm)
    },
    changeloading({
      commit,
      state
    }, mm) {
      commit('onchangeloading', mm)
    },
    changetub({
      commit,
      state
    }, mm) {
      commit('onchangetub', mm)
    },
  },
  mutations: {
    // 改变双旦节图标样式
    onchangetub(house, mm) {
      house.ishasjp = mm
    },
    onchangeloading(house, mm) {
      house.isloading = mm
    },
    onupdate(house, mm) {
      house.statusxx = mm
    },
    //全局弹出错误
    onerr(house, mm) {
      house.ismodal.isaddress = 'isuser';
      house.contentstyle = house.storagecont[mm];
      house.isshow = true;
    },
    //接收开始传过来的值新老用户/验证码/wx需要的数据//底部的广告并作判断
    doisNewUser(house, mm) {
      let self = Vue
      axios.defaults.headers.common["Authorization"] = mm.sessionId;
      house.all = mm;
      localStorage.setItem('all', JSON.stringify(mm));
      house.isloading = true;
      //wx需要的数据
      let url = location.href.split('#')[0];
      api.jsSign(url).then((res) => {
        house.isloading = false;
        self.prototype.wx.config({
          debug: false,
          appId: res.data.data.appid,
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.data.signature, // 必填，签名
          jsApiList: ['scanQRCode', 'getLocation', 'startRecord', 'stopRecord'] // 必填，需要使用的JS接口列表
        })
        //获取经纬度存入local
        self.prototype.wx.ready(function() {
          self.prototype.wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function(res) {
              var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              var speed = res.speed; // 速度，以米/每秒计
              var accuracy = res.accuracy; // 位置精度
              let jwd = {
                wd: latitude,
                jd: longitude,
                sd: speed,
                weiz: accuracy
              }
              localStorage.setItem('jwdcode', JSON.stringify(jwd));
              //获取底部广告
              api.getAdvertisement(mm.productId, mm.scanId, latitude, longitude).then((res) => {
                house.smokeimg = res.data.data.bgImgUrl;
                house.advertisement[0].adv = res.data.data.imgUrl;
                house.advertisement[0].web = res.data.data.outUrl;
              }).catch((err) => {
                console.log(err)
              })
            }
          });
        });
      }).catch((err) => {
        console.log(err)
      })
      // 本体获取底部广告,正式服关闭
      /*  let jwd =JSON.parse(localStorage.getItem('jwdcode'));
       if(jwd){
         var latitude =jwd.wd;
         var longitude =jwd.jd;
       }else{
         var latitude =0;
         var longitude =0;
       }
        api.getAdvertisement(mm.productId, mm.scanId,latitude,longitude).then((res) => {
            house.smokeimg = res.data.data.bgImgUrl;
            house.advertisement[0].adv = res.data.data.imgUrl;
            house.advertisement[0].web = res.data.data.outUrl;
        }).catch((err) => {
          console.log(err)
        })*/
      //判断二维码进来时的状态
      let value = JSON.parse(sessionStorage.getItem('hhl_isphone'));
      if (value === null) {
        value = ''
      }
      if (mm.errorCode === '101' || value.errorCode === '101') {
        house.ismodal.isuser = '0'
        house.ismodal.isaddress = 'isuser';
        house.contentstyle = house.storagecont[4];
        house.isshow = true;
      } else if (mm.errorCode === '0' || value.errorCode === '0') {
        //判断是否是第一次进入
        if (value && !mm.isNewUser) {
          house.ismodal.isuser = value.isNewUser
        } else if (mm.isNewUser) {
          house.ismodal.isuser = mm.isNewUser;
          sessionStorage.setItem('hhl_isphone', JSON.stringify(mm));
        } else {
          house.ismodal.isuser = '0'
          house.ismodal.isaddress = 'isuser';
          house.contentstyle = house.storagecont[1];
          house.isshow = true;
        }
      } else {
        house.ismodal.isuser = '0'
        house.ismodal.isaddress = 'isuser';
        // house.modalnum=1;
        house.contentstyle = house.storagecont[1];
        house.isshow = true;
      }
    },
    //向后台接口提交验证码
    dosubcode(house, mm) {
      //确定弹出的modal为判断验证码
      house.ismodal.isaddress = 'isuser';
      let data = {
        scanId: house.all.scanId,
        code: mm
      }
      house.isloading = true;
      //调取验证码接口
      api.checkVerifyCode(data).then((res) => {
        let codes = res.data.code;
        house.isloading = false;
        if (!res.data.data.follow) {
          house.ismodal.follow = res.data.data.follow;
          if (codes == 200) {
            router.push("result")
          } else if (codes == 500) {
            house.ismodal.errnum++;
            if (house.ismodal.errnum >= 3) {
              house.contentstyle = house.storagecont[4];
              house.isshow = true;
            } else {
              house.contentstyle = house.storagecont[0];
              house.isshow = true;
            }
          }
        } else {
          house.ismodal.follow = res.data.data.follow;
          house.isshow = true;
          console.log(house.ismodal.follow)
        }
      }).catch((err) => {
        console.log("调取接口失败")
      })

    },
    //在结果页面获取信息
    onresults(house, mm) {
      let data = JSON.parse(localStorage.getItem('all'));
      axios.defaults.headers.common["Authorization"] = data.sessionId;
      let Qrc = JSON.parse(localStorage.getItem('QRcodeinfor'));
      house.isloading = true;
      api.real(data.scanId).then((res) => {
        house.isloading = false;
        let names = res.data.data;
        house.ishasjp = names.isPopup;
        house.ismodal.isphone = names.mobile;
        localStorage.setItem("QRcodeinfor", JSON.stringify(names));
        house.QRcodeinfor.name = names.productName;
        house.QRcodeinfor.firsttime = names.scanTime;
        house.QRcodeinfor.num = names.count;
        house.QRcodeinfor.smoke.tar = names.tar + 'mg';
        house.QRcodeinfor.smoke.monoxide = names.co + 'mg';
        house.QRcodeinfor.smoke.alkali = names.nicotine + 'mg';
        house.QRcodeinfor.smoke.img = names.productImgUrl;
      }).catch((err) => {
        console.log(err)
      })
      let jwd = JSON.parse(localStorage.getItem('jwdcode'));
      if (jwd) {
        var lotter = {
          scanId: data.scanId, //扫码Id
          latitude: jwd.wd, // 纬度
          longitude: jwd.jd // 经度
        }
      } else {
        var lotter = {
          scanId: data.scanId, //扫码Id
          latitude: 0, // 纬度
          longitude: 0 // 经度
        }
      }
      api.getLottery(lotter).then((res) => {
        house.QRcodeinfor.status = res.data.data.status;
        console.log(house.QRcodeinfor.status)
      }).catch((err) => {
        console.log(err)
      })
    },
    //关闭弹出框模板
    doclose(house, mm) {
      house.isshow = false
    },
    // 弹出输入电话
    doCallback(house, mm) {
      house.ismodal.isaddress = 'isphone';
      house.isshow = true
    },
    //添加客户电话
    oncusphone(house, mm) {
      house.ismodal.isphone = mm
    },
    //弹出填写收货地址
    doaddress(house, mm) {
      house.ismodal.isaddress = mm;
      house.isshow = true;
    },
    //弹出编辑地址
    gobjaddress(house, mm) {
      house.ismodal.isaddress = 'isadd';
      house.isshow = true;
    },
    //存储我的地址
    goonisaddress(house, mm) {
      house.myaddress = mm;
      console.log(house.myaddress)
    },
    //确认显示第几个地址
    goccmyadd(house, mm) {
      house.cusaddress = mm;
      console.log(house.cusaddress)
    }
  },
})

export default store;
