import Vue from 'vue'
import Router from 'vue-router'
import verification from '@/components/verification'
import result from '@/components/result'
import scratch from '@/components/scratch'
import completes from '@/components/completes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'verification',
      meta:{index:0},
      component: verification
    },
    {
      path:'/result',
      name:'result',
      meta:{index:1},
      component:result
    },
    {
      path:'/scratch',
      name:'scratch',
      meta:{index:2},
      component:scratch
    },
    {
      path:'/completes',
      name:'completes',
      meta:{index:3},
      component:completes
    }
  ]
})
