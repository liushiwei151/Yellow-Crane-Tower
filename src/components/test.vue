<template>
  <div>
    <!-- <div @click="fn">test</div>
    <input type="text" :value="verificationCode.value">
    <div ref="num">999</div> -->
     <v-distpicker :province="select.province" :city="select.city" :area="select.area"></v-distpicker>
    <div @click="dj(1)">点击1</div>
    <div @click="dj(2)">点击2</div>
    <div @click="dj(3)">点击3</div>
    <div @click="dj(4)">点击4</div>
    <div @click="dj(5)">点击5</div>
  </div>
</template>

<script>
  import VDistpicker from 'v-distpicker'
 import city from '@/api/city.data.js';
export default {
  name: 'test',
  data() {
    return {
      //输入的验证码
      verificationCode:{
        value:"123"
      },
      select:{ province: '广东省', city: '广州市', area: '海珠区' }
    };
  },
  components: { VDistpicker ,city},
  methods: {
    fn() {
      this.$ck.set('name','123456')
      console.log(this.$ck.get('name'))
      this.$ck.del('name')
      console.log(this.$ck.get('name'))
    },
    dj(e){
      alert(e)
    }
  },
  created() {
    console.log(1);
    console.log(this.$refs['num']);
    this.$nextTick(()=>{
      console.log(2);
      console.log(this.$refs['num']);
    })
  },
  mounted() {
console.log(3);
    console.log(this.$refs['num']);
    this.$nextTick(()=>{
      console.log(4);
      console.log(this.$refs['num']);
    })
  },

};
</script>

<style export></style>
