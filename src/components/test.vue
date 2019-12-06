<template>
  <div>
    <div @click="fn">test</div>
    <input type="text" :value="verificationCode.value">
    <div ref="num">999</div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      //输入的验证码
      verificationCode:{
        value:"123"
      }
    };
  },
  methods: {
    fn() {
      this.$ck.set('name','123456')
      console.log(this.$ck.get('name'))
      this.$ck.del('name')
      console.log(this.$ck.get('name'))
    },
    dj(){

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
