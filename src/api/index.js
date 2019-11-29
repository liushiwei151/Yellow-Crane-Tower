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
const real =(reals)=>{
  return axios.get('http://qrhhl.yunyutian.cn/huanghelou1916-h5/product/real',{
    params:{
      scanId:reals
    }
  })
}
//获取奖池还是是否有奖
const getLottery =(lotter)=>{
  return axios.post('http://qrhhl.yunyutian.cn/huanghelou1916-h5/luckyDraw/getLottery',qs.stringify(lotter))
}
//提交分数

export default {
  checkVerifyCode,
  jsSign,
  getBackground,
  getAdvertisement,
  real,
  getLottery
}
