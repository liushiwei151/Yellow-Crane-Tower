import axios from 'axios'
import qs from 'qs'

 // axios.defaults.headers.common["Authorization"] = mm.sessionId;
const yyys = (abc) => {
  console.log(abc);
  return axios.post("http://qrhhl.yunyutian.cn/huanghelou1916-h5/code/checkVerifyCode", qs.stringify(abc)).then((res) => {
    console.log(res.data)
  }).catch((err)=>{
    console.log(err)
  })
}

export default {
  yyys
}
