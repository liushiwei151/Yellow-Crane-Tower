import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    code: 0,//接收到的验证码的结果
    isshow:false,//modal框是否显示
    modalnum:0,//显示第几条信息
    //显示什么样的modal
    ismodal:{
       isphone:"123",//客户电话
       isuser:true,//新老用户
       isaddress:'isphone'//modal是由哪里传来的
    },
    //提前存储的提示内容
    storagecont:[
      {img: true, text1: '您输入的验证码有误',text2: '请重新输入',isbutton:true,button:'重新输入'},
      {img: false, text1: '系统调试中,请稍后再试~',text2: '',isbutton:false,button:''},
      {img:true,text1:'验证码输入错误',text2:'亲爱的楼主, 您输入的验证码有误若产品为新开封, 请注意鉴别真伪',isbutton:true,button:'好的'},
      {img: false,text1:'您要的页面走丢了,',text2: '试试重新加载找回正确的页面吧！',isbutton:false,button:''},
      {img: true, text1: '此二维码查询有误',text2: '',isbutton:true,button:'重新扫码'}
    ],
    //以传过来的值确认现在的样式
    contentstyle: {
      img: true, //显示哪个图片
      text1: '您输入的验证码有误',
      text2: '请重新输入',
      isbutton:true,
      button:"重新输入"
    },
    //二维码传过来的信息
    QRcodeinfor:{
      name:'黄鹤楼·峡谷情中支',
      //首次扫码的时间
      firsttime:'2018-07-25 18:03:05',
      // 扫码次数
      num:1,
      smoke:{img:'smokexgqz',tar:'9mg',monoxide:'10mg',alkali:'0.9mg'}
    }
  },
  getter:{

  },
  actions:{
    subcode({commit,state},mm){
    	commit('dosubcode',mm)
    },
    close({commit,state},mm){
    	commit('doclose',mm)
    },
    startCallback({commit,state},mm){
      commit('dostartCallback',mm)
    },
    },
  mutations: {
    //向后台接口提交验证码
    dosubcode(house,mm){
      house.ismodal.isaddress='isuser';
      if(mm.length<4&&house.ismodal.isuser===true){
        return;
      }else if(mm.length==4&&house.ismodal.isuser===true){
        if(mm==='0000'){
          house.modalnum=0;
          house.contentstyle=house.storagecont[house.modalnum];
          house.isshow=true;
        }else if(mm==='1000'){
          house.modalnum=1;
           house.contentstyle=house.storagecont[house.modalnum];
          house.isshow=true
        }else if(mm==='2000'){
          house.modalnum=2;
           house.contentstyle=house.storagecont[house.modalnum];
          house.isshow=true
        }else if(mm==='3000'){
          house.modalnum=3;
           house.contentstyle=house.storagecont[house.modalnum];
          house.isshow=true
        }else if(mm==='4000'){
          house.modalnum=4;
           house.contentstyle=house.storagecont[house.modalnum];
          house.isshow=true
        }else if(mm=='9999'){
          router.push("result")
        }
      }else if(house.ismodal.isuser===false){
        house.isshow=true
      }
      house.code=mm
    },
    //关闭弹出框模板
    doclose(house,mm){
      house.isshow=false
    },
    // 开始刮奖
    dostartCallback(house,mm){
       house.ismodal.isaddress='isphone';
       console.log(house.ismodal.isaddress)
      house.isshow=true
    }
  },


})

export default store;
