import router from './router'
import store from './store'
// 进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { getLocalStorage } from '@/utils'
import Vue from 'vue'
let _this = Vue.prototype

// 路由白名单
const whiteList = ['/login', '/404', '/home', '/403']
const frontList = ['/front/home', '/front/message', '/front/article', '/front/activity']



// 路由跳转
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const hasToken = _this.$utils.getLocalStorage('loginToken')
  const hasGetUserInfo = store.state.user.role !== -1
  // 判断storage里是否有 'loginToken'
  if (whiteList.includes(to.path)) {
    next()
    // NProgress.done()
  } else if (frontList.includes(to.path)) {
    hasToken && await store.dispatch('getInfo')
    next()
  } else if (!hasToken) {
    next('/login')
  } else if (!hasGetUserInfo) {
    // try {
      await store.dispatch('getInfo')
      console.log("下一步")
      next({ ...to, replace: true })
  }
  else if (to.matched.length === 0) {
      next('/404')
    }
    next()
})

router.afterEach(() => {
  NProgress.done()
})
