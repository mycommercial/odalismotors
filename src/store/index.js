import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appbarExt: true
  },
  mutations: {
    appbarExt (state) {
      state.appbarExt = !state.appbarExt
    }
  },
  actions: {
  },
  modules: {
  }
})
