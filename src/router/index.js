import Vue from 'vue'
import Router from 'vue-router'
import verification from '@/components/verification'
import result from '@/components/result'
import scratch from '@/components/scratch'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'verification',
      meta:{index:0},
      component: verification
    },
    /*{
      path: '/',
      name: 'test',
      meta:{index:0},
      component: test
    },*/
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
    }
  ]
})
