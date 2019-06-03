const postMessageUtil = {}
import { eventBus } from '../assets/eventBus'

window.addEventListener('message', res => {
  console.log('我是postManage', res)
  let obj = res.data
  if (typeof obj == 'string') {
    if (obj.indexOf('webpack') != -1) return
    obj = JSON.parse(obj)
  }
  console.log('obj', obj)
  let action = obj.action //收到的action指令
  let data = obj.data //收到的消息数据
  if (!action) {
    return
  }

  switch (action) {
    case 'token':
      window.sessionStorage.setItem('userData', JSON.stringify(data))
      eventBus.bus.$emit(eventBus.CHANGE_TABS)
      break
    case 'accesstoken':
      window.sessionStorage.setItem('userData', JSON.stringify(data))
      eventBus.bus.$emit(eventBus.CHANGE_OPENER)
  }
})

postMessageUtil.postMessage = function(action, data) {
  if (window.parent == window) {
    console.warn('当前不存在父级页面,将不发送消息1')
    return
  }
  window.parent.postMessage(JSON.stringify({ action, data }), '*')
}

postMessageUtil.postMessageSelf = function(action, data) {
  console.log('window.opener', window.opener)
  if (window.opener == null) {
    console.warn('当前不存在父级页面,将不发送消息2')
    return
  }
  window.opener.postMessage(JSON.stringify({ action, data }), '*')
}

postMessageUtil.postMessage('token', {})
postMessageUtil.postMessageSelf('accesstoken', {})
