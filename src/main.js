import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'
import Print from 'vue-print-nb'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import './css/common.less' /* 引入公共样式 */

// 兼容ie
import promise from 'es6-promise'
promise.polyfill()
import { post, fetch, patch, put } from './https/request'
//定义全局变量
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put

Vue.prototype.$echarts = echarts
Vue.use(iView, Print)
Vue.config.productionTip = false

复制代码
// 通信
import './utils/postMessageUtil'
import { eventBus } from './assets/eventBus'

// window._https = https;

Vue.config.productionTip = false // 阻止 vue 在启动时生成生产提示。

// Vue.use(Button); // 按需引入
/* eslint-disable no-new */
if (window.parent == window && window.opener == null) {
  createVue()
  console.log(1)
} else if (window.parent != window && window.opener == null) {
  eventBus.bus.$on(eventBus.CHANGE_TABS, createVue)
  console.log(2)
} else {
  eventBus.bus.$on(eventBus.CHANGE_OPENER, createVue)
  console.log(3)
}

// router.push('infor')
/* eslint-disable no-new */
function createVue() {
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
}
createVue()
//  挂载全局变量文件
import global_ from './static/global' //引用文件
Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面
Vue.prototype.check = 'check'
