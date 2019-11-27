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
      url:url
    }
  })
}
//获取背景图片
const getBackground=(bg)=>{
  return axios.get('http://qrhhl.yunyutian.cn/huanghelou1916-h5/common/getBackground',{
    params:{
      skuid:bg
    }
  })
}
export default {
  checkVerifyCode,
  jsSign,
  getBackground
}
