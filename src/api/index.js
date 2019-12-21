import axios from 'axios'
import qs from 'qs'

//允许cookie跨域
// axios.defaults.withCredentials = true;
//测试
// let httpurl=" http://qrhhl.yunyutian.cn"
//正式
let httpurl ="https://qr.hhl1916.com"
// 提交验证码
const checkVerifyCode = (code) => {
  return axios.post(httpurl+"/huanghelou1916-h5/code/checkVerifyCode", qs.stringify(code))
}
/***
返回 "scanId": "",//后续配置需要的用户id
    "verifyTimes": 1,
    "count": 1,
    "isTest": 1,
    "follow": false关注/true没关注
***/
//接收wx必要数据
const jsSign = (url) => {
  return axios.get(httpurl+'/huanghelou1916-h5/common/jsSign', {
    params: {
      url: url
    }
  })
}

//获取背景图片
const getBackground = (bg) => {
  return axios.get(httpurl+'/huanghelou1916-h5/common/getBackground', {
    params: {
      skuid: bg
    }
  })
}
//获取底部的广告
const getAdvertisement = (prod, adv,wd,jd) => {
  return axios.get(httpurl+'/huanghelou1916-h5/common/getAdvertisement', {
    params: {
      productId: prod,
      scanId: adv, //(扫码ID)
      tp: 1, //(广告位置，就传1)
      latitude: wd, //(纬度，调试传0)
      longitude: jd //(经度，调试传0)
    }
  })
}
//获取烟包的基础信息
const real = (reals) => {
  return axios.get(httpurl+'/huanghelou1916-h5/product/real', {
    params: {
      scanId: reals
    }
  })
}
//获取奖池还是是否有奖
const getLottery = (lotter) => {
  return axios.post(httpurl+'/huanghelou1916-h5/luckyDraw/getLottery', qs.stringify(lotter))
}
//提交分数
const saveScore = (score) => {
  return axios.post(httpurl+'/huanghelou1916-h5/product/saveScore', qs.stringify(score))
}
//获取中奖信息
const doLuckyDraw = (draw) => {
  return axios.post(httpurl+'/huanghelou1916-h5/luckyDraw/doLuckyDraw', qs.stringify(draw))
}
//获取手机号验证码
const getMobileValidate = (lidate) => {
  return axios.post(httpurl+'/huanghelou1916-h5/user/getMobileValidate', qs.stringify(lidate))
}
//验证手机号和验证码
const checkMobileValidate = (date) => {
  return axios.post(httpurl+'/huanghelou1916-h5/user/checkMobileValidate', qs.stringify(date))
}
//获取客户的地址信息
const getAddress = (add) => {
  return axios.get(httpurl+'/huanghelou1916-h5/luckyDraw/getAddress', {
    params: {
      memberId: add
    }
  })
}
//新增地址
const addAddress =(addr)=>{
  axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded; charset=UTF-8';
  return axios.post(httpurl+'/huanghelou1916-h5/luckyDraw/addAddress',addr)
}
//获取客户的地址是否默认
const oneAddress = (one) => {
  return axios.get(httpurl+'/huanghelou1916-h5/luckyDraw/oneAddress', {
    params: {
      addressId: one
    }
  })
}
//确认编辑地址
const editAddress =(edit)=>{
  axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded; charset=UTF-8';
  return axios.post(httpurl+'/huanghelou1916-h5/luckyDraw/editAddress',edit)
}
//充值订单
const cOrder =(rder)=>{
  return axios.post(httpurl+'/huanghelou1916-h5/luckyDraw/cOrder',qs.stringify(rder))
}
const deleteAddress =(address)=>{
  return axios.post(httpurl+'/huanghelou1916-h5/luckyDraw/deleteAddress',qs.stringify(address))
}
const getTop20Record =()=>{
  return axios.get(httpurl+'/huanghelou1916-h5/luckyDraw/getTop20Record ')
}
export default {
  checkVerifyCode,
  jsSign,
  getBackground,
  getAdvertisement,
  real,
  getLottery,
  saveScore,
  doLuckyDraw,
  getMobileValidate,
  checkMobileValidate,
  getAddress,
  addAddress,
  oneAddress,
  editAddress,
  cOrder,
  deleteAddress,
  getTop20Record
}
