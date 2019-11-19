let cookie;
export default cookie = {
  //获取cookie、
  get: (name) => {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  },
  // 设置cookie
  set: (c_name, value, expiredays) => {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  },
  //删除cookie
  del: (name) => {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = cookie.get(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
}
