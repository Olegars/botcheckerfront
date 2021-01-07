import { createStore } from 'vuex'

export default createStore({
  state: {
    AT: '',
    menuState: false,
    screenSize: 0,
    scroll: 0,
    waiting: false,
    alertMessage: '',
    infoMessage: ''
  },
  mutations: {
    saveScreenSize (state, size) {
      state.screenSize = size
    },
    scroll (state, payload) {
      state.scroll = payload
    },
    waiting (state, payload) {
      state.waiting = payload
    }
  },
  actions: {
    scroll (context, payload) {
      context.commit('scroll', payload)
    },
    saveScreenSize (context) {
      const size = screen.width
      context.commit('saveScreenSize', size)
    },
    waiting (context, payload) {
      context.commit('waiting', payload)
    }
  },
  getters: {
    GetUserAt: state => {
      return state.AT
    },
    GetMenuState: state => {
      return state.menuState
    },
    waiting: state => {
      return state.waiting
    },
    GetScreenSize: state => {
      return state.screenSize
    },
    GetScroll: state => {
      return state.scroll
    }
  },
  modules: {
  }
})
