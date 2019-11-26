<template>
  <div>
    <div @click="fn">test</div>
    <input type="text" :value="verificationCode.value">
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
  }
};
</script>

<style export></style>
