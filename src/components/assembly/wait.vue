<template>
  <div class="modal show" v-if="isloading">
    <div id="Loading">
      <div class="loader-inner ball-beat">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
 import { mapState} from 'vuex';
export default {
  name: 'wait',
  data() {
    return {
    }
  },
  computed:{
    ...mapState({
     isloading:'isloading'
    })
  }
};
</script>

<style scoped lang="less">
#Loading {
  top: 50%;
  left: 50%;
  position: absolute;
  -webkit-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  z-index: 100;
}
@-webkit-keyframes ball-beat {
  50% {
    opacity: 0.2;
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes ball-beat {
  50% {
    opacity: 0.2;
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.ball-beat > div {
  background-color: #279fcf;
  width: 30px;
  height: 30px;
  border-radius: 100% !important;
  margin: 5px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
  -webkit-animation: ball-beat 0.7s 0s infinite linear;
  animation: ball-beat 0.7s 0s infinite linear;
}
.ball-beat > div:nth-child(2n-1) {
  -webkit-animation-delay: 0.35s !important;
  animation-delay: 0.35s !important;
}

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
  background: rgba(0, 0, 0, 0.2);
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
.show {
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -ms-transform: scale(1);
  -webkit-transform: scale(1);
  transform: scale(1);
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: auto;
  opacity: 1;
  z-index: 100;
}
</style>
