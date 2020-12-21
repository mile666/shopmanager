// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'
import App from './App'
import CusBread from './components/cusBread.vue'
import router from './router'
import moment from 'moment'

import HttpServer from './components/http'

// Vue插件的使用
// ElementUI其实Vue组件，和VueRouter用法一样 Vue.use(名字)
Vue.use(ElementUI)
Vue.use(HttpServer)

Vue.config.productionTip = false

// 全局过滤器 - 处理日期
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

// 全局自定义组件
Vue.component(CusBread.name, CusBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: {组件名: 组件选项所在对象},
  // components: { App:App },
  components: { App },
  template: '<App/>'
})
