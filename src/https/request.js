//  此文件为拦截器
import axios from 'axios'
const userData =
  window.sessionStorage.getItem('userData') ||
  'c29bb254-85af-4fb1-81bd-af0a196114fa'
//  发送url之前拦截
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    // config.data = JSON.stringify(config.data)
    config.headers = {
      access_token: userData
    }
    // console.log('config1111111', config)
    // if(token){
    //   config.params = {'token':token}
    // }
    return config
  },
  error => {
    return Promise.reject(err)
  }
)

//http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response)
    //  如果不存在id字段分页中给他加一个id  防止后台发id1是乱码的情况
    //  如果是分页

    if (response.data !== undefined) {
      if (response.data.size !== undefined) {
        let num = 0
        for (var value of response.data.list) {
          value.id =
            (response.data.pageNum - 1) * response.data.pageSize + 1 + num
          num++
        }
      }
    }
    if (response.data !== undefined && response.data !== null) {
      if (response.data.data !== undefined && response.data.data !== null) {
        console.log(response.data.data)
        if (
          response.data.data.size !== undefined &&
          response.data.data.size !== null
        ) {
          let num = 0
          for (var value of response.data.data.list) {
            value.id =
              (response.data.data.pageNum - 1) * response.data.data.pageSize +
              1 +
              num
            num++
          }
        }
      }
    }
    if (Array.isArray(response.data))
      changeKey(response.data, 'catalogName', 'title')
    else if (Array.isArray(response.data.data))
      changeKey(response.data.data, 'catalogName', 'title')
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}
//  递归修改对象数组的key
// arr=>传入对象数组 ,
// oldKey=>原来key名,
// newKey=>新的key名
function changeKey(arr, oldKey, newKey) {
  if (arr == null || arr == undefined) {
    return arr
  }
  for (var treeData of arr) {
    if (treeData[oldKey] == undefined || treeData[oldKey] == null) return arr
    treeData[newKey] = treeData[oldKey]
    treeData.show = true
    delete treeData[oldKey]
    // if (treeData.children == null || treeData.children == undefined) {
    //   treeData.disabled = true
    // }
    changeKey(treeData.children, oldKey, newKey)
  }
}
