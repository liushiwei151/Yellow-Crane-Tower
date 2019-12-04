<template>
  <div>
    <!-- 初始 -->
    <div class="original" v-if="result == '0'">
      <p>涂抹刮奖区域,</p>
      <p>超多奖品等您来拿！！！</p>
    </div>
    <!-- 获取实物奖品前？ -->
    <div class="Material" v-if="result == '1'">
      <p>感谢您对诚信系统的支持,</p>
      <p>恭喜您获得楼币,赶紧去您的订单页面确认吧！</p>
      <div class="scratch-a"><a href="#">点击查看</a></div>
    </div>
    <!-- 获取虚拟奖品 手机流量 -->
    <div class="traffic" v-if="result == '4'">
      <div>
        <label for="tel">手机号码:</label>
        <input type="tel" id="tel" maxlength="11" :placeholder="teltext" v-model="telphone" />
      </div>
      <button @click="complete">确定</button>
    </div>
    <!-- 获取实物奖品，填写地址 -->
    <div class="MaterialAddress" v-if="result == '3'">
      <!-- 有收获地址 -->
      <div >
        <div class="hasMaterialAddress" v-if="iscusadd!=undefined&&iscusadd[0]&&!cusaddress" :style="{opacity:(isaddress.isDefault?1:0)}">
          <div class="hasMaterialAddress-title" >
            <p>{{isaddress.province}}</p>
            <p>{{isaddress.contactPhone}}</p>
          </div>
          <div class="hasMaterialAddress-add">{{isaddress.province}}{{isaddress.city}}{{isaddress.area}}{{isaddress.street}}</div>
        </div>
        <div class="hasMaterialAddress" v-if="cusaddress" >
          <div class="hasMaterialAddress-title" >
            <p>{{cusaddress.province}}</p>
            <p>{{cusaddress.contactPhone}}</p>
          </div>
          <div class="hasMaterialAddress-add">{{cusaddress.province}}{{cusaddress.city}}{{cusaddress.area}}{{cusaddress.street}}</div>
        </div>
        <div class='hasMaterialAddressbutton'>
          <button @click="subaddress('myadd')">修改</button>
          <button @click="gocOrder()">确定</button>
        </div>
      </div>
      <!-- 没有收货地址 -->
      <button @click="subaddress('isadd')" v-if="iscusadd!=undefined&&!iscusadd[0]" >填写收货信息</button>
    </div>
    <!-- 虚拟奖品滴滴快车代金卷 -->
    <div class="fictitious" v-if="result=='5'">
      <div class='fictitious-card'>
        <div class='fictitious-card-img'></div>
        <div class='fictitious-card-text'>
          <div>
            <p>滴滴快车代金卷--10元</p>
            <p>合计:1200楼币</p>
          </div>
        </div>
      </div>
      <button @click="gocomplete">确定</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import api from '@/api'
export default {
  name: 'scratchText',
  data() {
    return {
      teltext: '',//电话文本
      telphone: '',//电话号码
      //假数据 是否有地址
      // isaddress:false,
      city:''
    };
  },
  computed:{
    ...mapState({
      cusaddress:'cusaddress'
    }),
    iscusadd(){
      return JSON.parse(localStorage.getItem('cusaddress'))[0]
    }
  },
  props: {
    result: {
       // type: String,
      default: function() {
        return '2';
      }
      },
      isaddress:{
        // type:Array,
        default:function(){
          return []
        }
      }
  },
  methods: {
    ...mapActions(['subaddress','onmyadd','ccmyadd']),
    //提交地址跳转页面
    gocOrder(){
      let self =this;
      let qrc =JSON.parse(localStorage.getItem('QRcode'))
      if(this.cusaddress){
        var data={
          addressId:this.cusaddress.addressId,
          orderId:qrc.orderId
        }
      }else{
        var data ={
          addressId:this.isaddress.addressId,
          orderId:qrc.orderId
        }
      }
      console.log(data)
      api.cOrder(data).then((res)=>{
        if(res.data.code==200){
          self.$router.push('completes')
        }
      })
    },
    // 电话确认
    complete() {
      let self =this;
      if (!/^1[3456789]\d{9}$/.test(this.telphone)) {
        this.telphone = '';
        this.teltext = '请输入正确的电话号码!';
      }else{
         let qrc =JSON.parse(localStorage.getItem('QRcode'));
         let data={
           orderId:qrc.orderId,
           rechargeMobile:this.telphone
         }
         console.log(data)
        api.cOrder(data).then((res)=>{
          console.log(res.data)
          if(res.data.code==200){

             self.$router.push('/completes')
          }
        })
      }
    },
    //去往完成页面
    gocomplete(){
     this.$router.push('completes')
    },
    //获取我的地址
    getmyadd(){
      let self =this;
      let QRcode =JSON.parse(localStorage.getItem('QRcode'));
     api.getAddress(QRcode.memberId).then((res)=>{
       if(res.data.code==200){
         console.log(res.data.data)
         localStorage.setItem('cusaddress',JSON.stringify(res.data.data))
       }
       // self.onmyadd(res.data.data);
       // self.cusaddress=res.data.data;
       // localStorage.setItem('QRcode',JSON.stringify(res.data.data));
     }).catch((err)=>{
       console.log(err)
     })
    }
  }
};
</script>

<style scoped lang="less">
@pp: {
  font-weight: 500;
  color: rgb(85, 34, 8);
  margin-top: 30px;
  font-size: 28px;
};
@button:{
  background: url(https://pic.cwyyt.cn/upload/img/20191203/1736453645_button2.png) no-repeat;
  background-size: 100% 100%;
  outline: none;
  border: none;
  cursor: pointer;
  color: #fff;
  height: 79px;
  font-size: 36px;
}
// 默认情况
.original {
  @pp();
  p {
    margin-bottom: 5px;
  }
  p:first-of-type {
    font-size: 32px;
  }
}
// 实物中奖
.Material {
  @pp();
  p {
    margin-bottom: 5px;
  }
  p:first-of-type {
    font-size: 32px;
  }
  a {
    color: rgb(210, 47, 47);
    font-size: 32px;
    font-weight: 600;
  }
}
//虚拟中奖
.traffic {
  font-size: 30px;
  color: #955409;
  margin-top: 25px;
  input {
    border: none;
    border: solid 2px #955409;
    border-radius: 5px;
    width: 330px;
    text-indent: 5px;
    height:50px;
  }
  input::-webkit-input-placeholder {
    color: red;
    font-size: 25px;
  }
  button {
   @button();
    font-size: 36px;
    width: 227px;
    border-radius: 50px;
    letter-spacing: 30px;
    text-indent: 30px;
    margin-top: 22px;
  }
}
// 实物中奖新
.MaterialAddress {
  width: 520px;
  margin:0 89px;
  button {
   @button();
    width: 315px;
    border-radius: 50px;
    margin-top: 70px;
    letter-spacing: 2px;
    text-indent: 2px;
  }
  .hasMaterialAddress{
    height:103px;
    width: 520px;
    background-color: #fff;
    border-radius: 20px;
    box-sizing: border-box;
    border:solid 2px #955409;
    margin:15px 0;
    font-size: 24px;
    padding:5px 0;
    .hasMaterialAddress-title{
      width: 416px;
      display: flex;
      justify-content: space-between;
      margin-left: 48px;
      align-items: center;
      color:black;
    }
    .hasMaterialAddress-add{
      width: 368px;
      text-align: left;
      margin-left: 48px;
      font-size: 22.4px;
    }
  }
  .hasMaterialAddressbutton{
    display: flex;
    justify-content: space-between;
    button{
      margin: 0;
     width: 225px;
    }
  }
}
//虚拟中奖 滴滴卷
.fictitious{
  margin: 0 autp;
  margin:0 89px;
  width: 520px;
  .fictitious-card{
    width: 520px;
    height: 103px;
    background-color: #fff;
    border-radius: 20px;
    box-sizing: border-box;
    border: solid 2px #955409;
    overflow: hidden;
    display: flex;
    justify-content: center;
    margin: 12px 0;
    .fictitious-card-img{
      width: 124px;
      height: 102px;
      background: url(../../../static/card.png) no-repeat;
      background-size:100% 100%;
      border-right: solid 1px #955409;
    }
    .fictitious-card-text{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 22.55px;
      flex: 1;
      p{
        text-align: left;
      }
      p:first-of-type{
        margin-bottom:5px ;
        font-weight: 600;
        font-size: 24.17px;
        color:black;
      }
    }
  }
  button {
    @button();
    border-radius: 50px;
    letter-spacing: 25px;
    text-indent: 25px;
    width: 226px;
  }
  }
</style>
