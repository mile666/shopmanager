// 让axios变成Vue插件
// 把axios相关代码封装成Vue的插件
// 结果 在mian.js可以Vue.use(axios)

import axios from 'axios'

// Vue插件
const HttpServer = {}

HttpServer.install = function (Vue, options) {
  // 插件要封装的功能
  // 独立功能 -> js -> 模块
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // ?设置头部
  const AUTH_TOKEN = localStorage.getItem('token')
  // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  Vue.prototype.$http = axios

  // // 添加实例方法
  // Vue.prototype.$myMethod = function (methodOptions) {
  //   // 逻辑...
  // }

}
// MyPlugin
export default HttpServer