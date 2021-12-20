import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './module/user'
import global from './module/global'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: getters,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    global
  }
})
