import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appbarExt: true,
    logged: false
  },
  mutations: {
    appbarExtReverse (state) {
      state.appbarExt = !state.appbarExt
    },
    appbarExtShow (state) {
      state.appbarExt = true
    },
    appbarExtHide (state) {
      state.appbarExt = false
    }
  },
  actions: {
  },
  modules: {
  }
})
