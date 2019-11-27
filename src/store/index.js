import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import api from '@/api'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    //进入初始页面接收到的所有信息
    all: {},
    // code: 0,//接收到的验证码的结果
    isshow: false, //modal框是否显示
    //modalnum:0,//显示第几条信息
    //显示什么样的modal
    ismodal: {
      isphone: "1234567891", //客户电话
      isuser: '1', //0老客户1新客户
      isaddress: 'isphone', //modal是由哪里传来的
      errnum: 0 //输入错误次数
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
      }
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
    startCallback({
      commit,
      state
    }, mm) {
      commit('dostartCallback', mm)
    },
    isNewUser({
      commit,
      state
    }, mm) {
      commit('doisNewUser', mm)
    }
  },
  mutations: {
    //接收开始传过来的值新老用户/验证码/wx需要的数据并作判断
    doisNewUser(house, mm) {
      //
     /* $protocol = (!empty($_SERVER[HTTPS]) && $_SERVER[HTTPS] !== off || $_SERVER[SERVER_PORT] == 443) ? "https://" : "http://";
        $url = $protocol.$_SERVER[HTTP_HOST].$_SERVER[REQUEST_URI];
        console.log($url)*/
      //
      let self = Vue
      axios.defaults.headers.common["Authorization"] = mm.sessionId;
      house.all = mm;
      localStorage.setItem('all',JSON.stringify(mm))
      console.log(mm)
      //获取背景图片
      console.log(house.all.skuid)
      api.getBackground(house.all.skuid).then((res)=>{
        house.smokeimg=res.data.data
      }).catch((err)=>{

      })
      //wx需要的数据
      let url =location.href.split('#')[0];
      api.jsSign(url).then((res) => {
        console.log(res.data.data)
        self.prototype.wx.config({
          debug: false,
          appId: res.data.data.appid,
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.data.signature, // 必填，签名
          jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
        })
      }).catch((err) => {
        console.log(err)
      })
      //判断二维码进来时的状态
      let value = JSON.parse(sessionStorage.getItem('hhl_isphone'));
      if (value === null) {
        value = ''
      }
      if (mm.errorCode === '101' || value.errorCode === '101') {
        house.ismodal.isuser = '0'
        house.ismodal.isaddress = 'isuser';
        // house.modalnum=4;
        house.contentstyle = house.storagecont[4];
        house.isshow = true;
      } else if (mm.errorCode === '0' || value.errorCode === '0') {
        //判断新老客户
        if (value && !mm.isNewUser) {
          house.ismodal.isuser = value.isNewUser
        } else if (mm.isNewUser) {
          house.ismodal.isuser = mm.isNewUser;
          sessionStorage.setItem('hhl_isphone', JSON.stringify(mm));
        } else {
          house.ismodal.isuser = '0'
          house.ismodal.isaddress = 'isuser';
          // house.modalnum=1;
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
      //调取验证码接口
      api.checkVerifyCode(data).then((res) => {
        console.log(res.data)
        let codes = res.data.code;
        if (codes == 200) {
          router.push("result")
        } else if (codes == 500) {
          console.log(house.ismodal.errnum)
          house.ismodal.errnum++;
          if (house.ismodal.errnum >= 3) {
            house.contentstyle = house.storagecont[4];
            house.isshow = true;
          } else {
            house.contentstyle = house.storagecont[0];
            house.isshow = true;
          }
        }
      }).catch((err) => {
        console.log("调取接口失败")
      })

      /*
        else if(mm=='9999'){
          router.push("result")
        }
      }else if(house.ismodal.isuser==='1'){
        house.isshow=true
      }*/
    },
    //关闭弹出框模板
    doclose(house, mm) {
      house.isshow = false
    },
    // 开始刮奖
    dostartCallback(house, mm) {
      house.ismodal.isaddress = 'isphone';
      if (house.ismodal.isphone.length != 11) {
        // house.isshow=true
      }
    }
  },


})

export default store;
