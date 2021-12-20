import request from '@/api/allRequest'
// import { setLocalStorage, removeLocalStorage } from '@/utils'
import router, {menuRoutes, baseRoutes} from '@/router'
import Vue from 'vue'
let _this = Vue.prototype

// 判断该route是否有roles
// function hasPermission (role, item) {
//   if (item.meta && item.meta.roles) {
//     return item.meta.roles.includes(role)
//   } else {
//     return true
//   }
// }

// 过滤同步路由
function filterAsyncRoutes(routes, role) {
  const res = []
  routes.forEach(route => {
    const hasPermission = route?.meta?.roles?.includes(role) || false
    if (hasPermission) {
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, role)
      }
      res.push(route)
    }
  })
  return res
}

// 根据role生成路由表
const generateRoutes = role => {
  let accessedRoutes
  if (parseInt(role) === 1) {
    // role=1代表是管理员，不用过滤
    accessedRoutes = menuRoutes || []
  } else {
    accessedRoutes = filterAsyncRoutes(menuRoutes, role)
  }
  return accessedRoutes
}

const state = {
  role: -1,
  info: {},
  routers: []
}
const mutations = {
  SET_ROLES: (state, role) => {
    state.role = role
  },
  SET_USER_INFO: (state, data) => {
    state.info = data
  },
  SET_ROUTES: (state, routes) => {
    state.routers = routes
  }
}
const actions = {
  // 登录请求(其实没有用到vuex)
  login({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      request
        .login({
          username: username.trim(),
          password: password
        })
        .then(model => {
          _this.$utils.setLocalStorage('loginToken', model.token, 1000 * 60 * 60 * +process.env.VUE_APP_LOGIN_TOKEN_EXPIRES)
          resolve()
        })
        .catch(error => {
          reject(error)
          // 调试用的！！！！！，别提交
          // _this.$utils.setLocalStorage('loginToken', username, 1000 * 60 * 60 * +process.env.VUE_APP_LOGIN_TOKEN_EXPIRES)
          // resolve()
        })
    })
  },

  // 注册
  register({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      request
        .register({
          username: username.trim(),
          password: password
        })
        .then(model => {
          // _this.$utils.setLocalStorage('loginToken', username, 1000 * 60 * 60 * +process.env.VUE_APP_LOGIN_TOKEN_EXPIRES)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 退出
  logout({commit}) {
    return new Promise((resolve, reject) => {
      request
        .logout()
        .then(model => {
          _this.$utils.removeLocalStorage('loginToken')
          _this.$utils.removeLocalStorage('userRole')
          commit('SET_ROLES', -1)
          commit('SET_USER_INFO', {})
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 拿到用户信息请求,放进vuex
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      request
        .getUserInfo()
        .then(res => {
          commit('SET_ROLES', res.role)
          commit('SET_USER_INFO', res.info)
          const accessedRoutes = generateRoutes(res.role)
          commit('SET_ROUTES', accessedRoutes)
          router.options.routes = accessedRoutes.concat(baseRoutes)
          router.addRoutes(accessedRoutes)
          console.log(router)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
