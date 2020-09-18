import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './icons'

// 重置css
import 'normalize.css/normalize.css'
// 全局css
import '@/styles/index.scss'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import prototype from '@/utils/prototype' // 挂载在原型上的方法
Vue.use(prototype)
import './permission'
import component from '@/utils/component'
Vue.use(component)

// 全局过滤器
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(Element, {
  size: 'medium'
})

Vue.config.productionTip = false
console.log('环境是： ' + process.env.NODE_ENV)
// if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'proxy') require('./mock')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
