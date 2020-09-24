import request from '@/api/allRequest'
// import { setLocalStorage, removeLocalStorage } from '@/utils'
import Vue from 'vue'
let _this = Vue.prototype

const state = {
  roles: 0,
  info: {}
}
const mutations = {
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER_INFO: (state, data) => {
    state.info = data
  }
}
const actions = {
  // 登录请求(其实没有用到vuex)
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      request.login({
        username: username.trim(),
        password: password
      }).then(model => {
        _this.$utils.setLocalStorage('loginToken', model.token, 1000 * 60 * 60 * +process.env.VUE_APP_LOGIN_TOKEN_EXPIRES)
        resolve()
      }).catch(error => {
        reject(error)
        // 调试用的！！！！！，别提交
        // _this.$utils.setLocalStorage('loginToken', username, 1000 * 60 * 60 * +process.env.VUE_APP_LOGIN_TOKEN_EXPIRES)
        // resolve()
      })
    })
  },

  // 注册
  register ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      request.register({
        username: username.trim(),
        password: password
      }).then(model => {
        // _this.$utils.setLocalStorage('loginToken', username, 1000 * 60 * 60 * +process.env.VUE_APP_LOGIN_TOKEN_EXPIRES)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      request.logout().then(model => {
        _this.$utils.removeLocalStorage('loginToken')
        _this.$utils.removeLocalStorage('userRole')
        commit('SET_ROLES', "")
        commit("SET_USER_INFO", {})
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 拿到用户信息请求,放进vuex
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      request.getUserInfo().then(model => {
        commit('SET_ROLES', model.role)
        commit("SET_USER_INFO", model.info)
        resolve(model)
      }).catch(error => {
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
