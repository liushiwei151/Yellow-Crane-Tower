<template>
  <div class="modal" :class="{ show: iswait }">
    
  </div>
</template>

<script>
export default {
  name: 'wait',
  data() {
    return {
      iswait: false
    };
  }
};
</script>

<style scoped lang="less">
.modal {
  z-index: -100;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  outline: 0;
  text-align: center;
  -ms-transform: scale(1.185);
  -webkit-transform: scale(1.185);
  transform: scale(1.185);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1096px;
  perspective: 1096px;
  background: rgba(0, 0, 0, 0.6);
  -webkit-transition: all 0.3s ease-in-out 0s;
  -o-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
  pointer-events: none;
  box-sizing: border-box;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
