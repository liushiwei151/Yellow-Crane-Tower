// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import YellowCraneTower from './YellowCraneTower'
import router from './router'
import store from './store'
import ScratchCard from '@/components/scratch-card/index.js'
import ck from '@/components/cookie/index.js'
import wx from 'weixin-js-sdk'
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css'



Vue.prototype.$ck = ck;
Vue.prototype.wx=wx;
Vue.prototype.$layer = layer(Vue);
Vue.use(ScratchCard);
Vue.use(wx);

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#YellowCraneTower',
  router,
  store,
  components: { YellowCraneTower },
  template: '<YellowCraneTower/>'
})
