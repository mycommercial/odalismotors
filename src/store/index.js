import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appbarExt: true,
    logged: false,
    logo: {
      O: "MY",
      M: "COMMERCIAL"
    },
    userInfo: {
      username: '',
      email: '',
      photo: ''
    },
    popup: {
      active: false,
      component: "<template> <div> Clear </div> </template>"
    },
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
    },
    changePop (state, component) {
      state.popup.component = component;
    },
    activePop (state) {
      state.popup.active = true;
    },
    deactivePop(state) {
      state.popup.active = true;
    },
    clearPop (state){
      state.popup = {
        active: false,
        component: "<template> <div> Clear </div> </template>"
      };
    },
    populatePop (state, popup) {
      state.popup = popup;
    }
  },
  actions: {
  },
  modules: {
  }
})
