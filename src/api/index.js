import axios from 'axios'
import qs from 'qs'

// 提交验证码
const checkVerifyCode = (code) => {
  return axios.post("http://qrhhl.yunyutian.cn/huanghelou1916-h5/code/checkVerifyCode", qs.stringify(code))
}
//接收wx必要数据
const jsSign = (url) => {
  return axios.get('http://qrhhl.yunyutian.cn/huanghelou1916-h5/common/jsSign', {
    params: {
      url: url
    }
  })
}
//获取背景图片
const getBackground = (bg) => {
  return axios.get('http://qrhhl.yunyutian.cn/huanghelou1916-h5/common/getBackground', {
    params: {
      skuid: bg
    }
  })
}
//获取底部的广告
const getAdvertisement = (prod, adv) => {
  return axios.get('http://qrhhl.yunyutian.cn/huanghelou1916-h5/common/getAdvertisement', {
    params: {
      productId: prod,
      scanId: adv, //(扫码ID)
      tp: 1, //(广告位置，就传1)
      latitude: 0, //(纬度，调试传0)
      longitude: 0 //(经度，调试传0)
    }
  })
}
//获取烟包的基础信息
const real = (reals) => {
  return axios.get('http://qrhhl.yunyutian.cn/huanghelou1916-h5/product/real', {
    params: {
      scanId: reals
    }
  })
}
//获取奖池还是是否有奖
const getLottery = (lotter) => {
  return axios.post('http://qrhhl.yunyutian.cn/huanghelou1916-h5/luckyDraw/getLottery', qs.stringify(lotter))
}
//提交分数
const saveScore = (score) => {
  return axios.post('http://qrhhl.yunyutian.cn/huanghelou1916-h5/product/saveScore', qs.stringify(score))
}
//获取中奖信息
const doLuckyDraw = (draw) => {
  return axios.post('http://qrhhl.yunyutian.cn/huanghelou1916-h5/luckyDraw/doLuckyDraw', qs.stringify(draw))
}
//获取手机号验证码
const getMobileValidate = (lidate) => {
  return axios.post('http://qrhhl.yunyutian.cn/huanghelou1916-h5/user/getMobileValidate', qs.stringify(lidate))
}
//验证手机号和验证码
const checkMobileValidate = (date) => {
  return axios.post('http://qrhhl.yunyutian.cn/huanghelou1916-h5/user/checkMobileValidate', qs.stringify(date))
}
//获取客户的地址信息
const getAddress = (add) => {
  return axios.get('http://qrhhl.yunyutian.cn/huanghelou1916-h/user/getAddress', {
    params: {
      memberId: add
    }
  })
}
//新增地址
const addAddress =(addr)=>{
  return axios.post('http://qrhhl.yunyutian.cn/huanghelou1916-h/user/addAddress',qs.stringify(addr))
}
//获取客户的地址是否默认
const oneAddress = (one) => {
  return axios.get('http://qrhhl.yunyutian.cn/huanghelou1916-h/user/oneAddress', {
    params: {
      addressId: one
    }
  })
}
//???
const editAddress =(edit)=>{
  return axios.post('http://qrhhl.yunyutian.cn/huanghelou1916-h/user/editAddress',qs.stringify(edit))
}
//充值订单
const cOrder =(rder)=>{
  return axios.post('http://qrhhl.yunyutian.cn/huanghelou1916-h/lottery/cOrder',qs.stringify(rder))
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
  cOrder
}
