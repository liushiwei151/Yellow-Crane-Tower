import Vue from 'vue'
import Router from 'vue-router'
import QRcode from '@/components/QRcode'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QRcode',
      component: QRcode
    }
  ]
})
