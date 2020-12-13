// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

// Vue插件的使用
// ElementUI其实Vue组件，和VueRouter用法一样 Vue.use(名字)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: {组件名: 组件选项所在对象},
  // components: { App:App },
  components: { App },
  template: '<App/>'
})