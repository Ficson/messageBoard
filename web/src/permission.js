import router from './router'
import store from './store'
// 进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { getLocalStorage } from '@/utils'
import Vue from 'vue'
let _this = Vue.prototype

// 路由白名单
const whiteList = ['/login', '/404', '/home']

// 路由跳转
router.beforeEach((to, from, next) => {

  NProgress.start()
  const hasToken = _this.$utils.getLocalStorage('adminToken')
  // 判断storage里是否有 'adminToken'
  if (whiteList.indexOf(to.path) !== -1) {
    next()
    NProgress.done()
  } else if (hasToken) {
      // 判断是否已经拿到权限，没拿到就去vuex中调用方法拿
      const hasRoles = store.state.router.hasGetRules
      if (hasRoles) {
        next()
      } else {
        try {
          // getInfo 方法：请求后端拿到用户信息，拿到该用户的权限role：1/2
          store.dispatch('getInfo').then(res => {
            // 将拿到的用户权限role作为参数调用 generateRoutes 方法，该方法会返回一张路由表
            store.dispatch('generateRoutes', res.role).then(routers => {
              router.addRoutes(routers)
              next({ ...to, replace: true })
            })
          }).catch(() => {
            next('/login')
            NProgress.done()
          })
        } catch (error) {
          next('/login')
          NProgress.done()
        }
      }
  } else {
    next('/login')
    NProgress.done()
  }

})

router.afterEach(() => {
  NProgress.done()
})
