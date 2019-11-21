import axios from 'axios'
import qs from 'qs'
import vue from 'vue'

console.log(vue.prototype)

function get(name){
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  }
 // console.log(get('Authorization'))
axios.defaults.headers.common["Authorization"] =get('Authorization');
const yyys = (abc) => {
  return axios.post("/liu/api/services/app/GK10/GetShareInfo", qs.stringify(abc)).then((res) =>{console.log(res.data)})
}

export default {
  yyys
}
