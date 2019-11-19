<template>
  <div @click="fn">test</div>
</template>

<script>
export default {
  name: 'test',
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
