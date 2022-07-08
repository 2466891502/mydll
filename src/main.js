import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/common.css'
import axios from 'axios'
import echarts from 'echarts'
import vcolorpicker from 'vcolorpicker'
import CesiumNavigation from 'cesium-navigation-es6'

Vue.use(vcolorpicker)
Vue.prototype.$CesiumNavigation = CesiumNavigation;
Vue.prototype.$echarts = echarts;
Vue.prototype.$Cesium = Cesium
Vue.prototype.$axios = axios

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
