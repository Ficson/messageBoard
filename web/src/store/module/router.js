import { menuRoutes, baseRoutes } from '@/router'

// 判断该route是否有roles
function hasPermission (role, item) {
  if (item.meta && item.meta.roles) {
    return item.meta.roles.includes(role)
  } else {
    return true
  }
}

// 过滤同步路由
 function filterAsyncRoutes (routes, role) {
  const res = []
  routes.forEach(route => {
    let tmp = route
    if (hasPermission(role, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, role)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  hasGetRules: false,
  routers: []
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.hasGetRules = true
    state.routers = baseRoutes.concat(routes)
  }
}
const actions = {
  // 根据role生成路由表
  generateRoutes ({ commit, state }, role) {
    return new Promise((resolve) => {
      let accessedRoutes
      if (parseInt(role) === 1) { // role=1代表是管理员，不用过滤
        accessedRoutes = menuRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(menuRoutes, role)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
