import Vue from 'vue'
import info from './info.vue'
import iView from 'iview'
import router from '../../router'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'
import VueDND from 'awe-dnd'
Vue.prototype.$echarts = echarts
Vue.use(iView, VueDND)
// 通信
import '../../utils/postMessageUtil'
import { eventBus } from '../../assets/eventBus'
import global_ from '../../static/global' //定义全局变量

// 兼容ie
import promise from 'es6-promise'
promise.polyfill()
//  定义全局函数
import { changeKey } from '../../utils/function'

Vue.prototype.$changeKey = changeKey
// window._https = https;

//定义全局拦截器
import { post, fetch, patch, put } from '../../https/request'

Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.prototype.$post = post

Vue.config.productionTip = false // 阻止 vue 在启动时生成生产提示。

// Vue.use(Button); // 按需引入
/* eslint-disable no-new */
if (window.parent == window && window.opener == null) {
  //  挂载全局变量文件

  Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面
  Vue.prototype.check = 'check'
  createVue()
  console.log(1)
} else if (window.parent != window && window.opener == null) {
  //  挂载全局变量文件
  Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面
  Vue.prototype.check = 'check'
  eventBus.bus.$on(eventBus.CHANGE_TABS, createVue)
  console.log(2)
} else {
  //  挂载全局变量文件
  Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面
  Vue.prototype.check = 'check'
  eventBus.bus.$on(eventBus.CHANGE_OPENER, createVue)
  console.log(3)
}

// router.push('infor')
/* eslint-disable no-new */
function createVue() {
  new Vue({
    el: '#info', // 这里参考info.html和info.vue的根节点id，保持三者一致
    render: h => h(info),
    router
    // components: { App },
    // template: '<App/>'
  })
}
createVue()
