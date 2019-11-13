import Vue from 'vue'
import Router from 'vue-router'
import verification from '@/components/verification'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'verification',
      component: verification
    }
  ]
})
