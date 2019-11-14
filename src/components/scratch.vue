 <template>
   <div>
     <div class="textBox">
       <transition name="slide">
         <p class="text" :key="text.id">{{text.val}}</p>
       </transition>
     </div>
   </div>
 </template>

 <script>
 export default {
   name: 'scratch',
   data () {
     return {
       textArr: [
         '恭喜******获得马克杯一个',
         '恭喜******获得iphone11一部',
         '恭喜******获得别墅一栋'
       ],
       number: 0
     }
   },
   computed: {
     text () {
       return {
         id: this.number,
         val: this.textArr[this.number]
       }
     }
   },
   mounted () {
     this.startMove()
   },
   methods: {
     startMove () {
       let timer = setTimeout(() => {
         if (this.number === 2) {
           this.number = 0;
         } else {
           this.number += 1;
         }
         this.startMove();
       }, 3000); // 滚动不需要停顿则将2000改成动画持续时间
     }
   }
 }
 </script>

 <style scoped lang="less">
   .textBox {
     width: 100%;
     height: 100px;
     margin: 30px auto 0;
     overflow: hidden;
     position: relative;
     text-align: center;
   }
   .text {
     width: 100%;
     position: absolute;
     bottom: 0;
     margin-top:10px;
     color:rgb(200,130,45)
   }
   //文字滚动效果
   .slide-enter-active, .slide-leave-active {
     transition: all 3s linear;
   }
   .slide-enter{
     transform: translateY(40px) scale(1);
     opacity: 0.5;
   }
   .slide-enter-to{
     opacity: 1;
   }
   .slide-leave-to {
     transform: translateY(-40px) scale(0.8);
     opacity: 0;
   }
 </style>
