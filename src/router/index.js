import Vue from 'vue'
import Router from 'vue-router'
import verification from '@/components/verification'
import result from '@/components/result'
import scratch from '@/components/scratch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'verification',
      component: verification
    },
    {
      path:'/result',
      name:'result',
      component:result
    },
    {
      path:'/scratch',
      name:'scratch',
      component:scratch
    }
  ]
})
