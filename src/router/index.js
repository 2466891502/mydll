import Vue from 'vue'
import VueRouter from 'vue-router'
import cesium from '@/views/cesium.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'cesium',
    component: cesium
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
