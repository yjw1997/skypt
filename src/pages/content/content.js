import Vue from 'vue'
import content from './content.vue'
import iView from 'iview'
import router from './router'
import 'iview/dist/styles/iview.css'
import VueCodemirror from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'
Vue.use(iView)
Vue.use(
  VueCodemirror /* { 
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */
)

// 兼容ie
import promise from 'es6-promise'
promise.polyfill()

Vue.config.productionTip = false

new Vue({
  el: '#app', // 这里参考content.html和content.vue的根节点id，保持三者一致
  render: h => h(content),
  router
})
